// app/api/cart/add/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Cart from '@/models/Cart'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const item = await request.json()
    // Helpful debug: log incoming payload (avoid logging sensitive info)
    try {
      console.debug('Cart add request body:', item)
    } catch (e) {
      // ignore logging issues
    }

    // Basic validation
    if (!item || !item.productId || !item.name || typeof item.price === 'undefined') {
      return NextResponse.json({ error: 'Invalid item data' }, { status: 400 })
    }

    // Normalize incoming item so Mongoose schema requirements are satisfied
    const normalizedItem = {
      productId: String(item.productId),
      name: String(item.name),
      price: Number(item.price),
      quantity: Number(item.quantity || 1),
      image: item.image || ''
    }

    await connectDB()
    // Log which user is performing the add (helps diagnose missing/incorrect session values)
    try {
      console.debug('Cart add requested by user:', session?.user?.email)
    } catch (e) {
      // ignore
    }

    const userId = session.user.email

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      // Use normalized item to satisfy schema (quantity required etc)
      cart = new Cart({ userId, items: [normalizedItem] })
    } else {
      const existing = cart.items.find((i: any) => i.productId === normalizedItem.productId)
      if (existing) {
        existing.quantity += normalizedItem.quantity
      } else {
        cart.items.push(normalizedItem)
      }
    }

    try {
      await cart.save()
    } catch (saveError: any) {
      // Handle duplicate-key race where another request inserted the cart concurrently
      if (saveError?.code === 11000) {
        console.warn('Duplicate key on cart.save(), attempting to recover by refetching and merging:', saveError.keyValue)
        // Try to re-fetch the authoritative cart using multiple possible identifier fields
        // (some older data/indexes may use `userEmail` instead of `userId`)
        const queryAlternatives: any[] = [{ userId }]
        if (session?.user?.email) queryAlternatives.push({ userEmail: session.user.email })
        // Also try to find any cart with null userEmail (index conflict showed userEmail: null)
        queryAlternatives.push({ userEmail: null })

        const existingCart = await Cart.findOne({ $or: queryAlternatives })
        if (existingCart) {
          // Sanitize recovered cart before merging: ensure userId is set and items are normalized
          if (!existingCart.userId) {
            console.warn('Recovered cart missing userId — setting to current user:', userId)
            existingCart.userId = userId
          }

          // Normalize existing items and filter out any garbage entries
          const sanitizedItems: any[] = []
          for (const it of existingCart.items || []) {
            try {
              if (!it) continue
              const pid = it.productId || it.product_id || it.id || null
              if (!pid) continue
              sanitizedItems.push({
                productId: String(pid),
                name: String(it.name || it.title || 'Product'),
                price: Number(it.price) || 0,
                quantity: Number(it.quantity) || 1,
                image: it.image || ''
              })
            } catch (e) {
              // skip malformed item
            }
          }
          existingCart.items = sanitizedItems

          const existing = existingCart.items.find((i: any) => i.productId === normalizedItem.productId)
          if (existing) {
            existing.quantity += normalizedItem.quantity
          } else {
            existingCart.items.push(normalizedItem)
          }
          await existingCart.save()
          cart = existingCart
        } else {
          // If for some reason refetch didn't find it, attempt an atomic update as a final recovery
          try {
            const updated = await Cart.findOneAndUpdate(
              { userId },
              { $push: { items: normalizedItem }, $setOnInsert: { userId } },
              { new: true, upsert: true }
            )
            if (updated) cart = updated
            else throw saveError
          } catch (finalErr) {
            // If final attempt fails, rethrow original saveError for outer handler
            console.error('Final recovery attempt failed for cart.save() duplicate-key:', finalErr)
            throw saveError
          }
        }
      } else {
        throw saveError
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Item added to cart',
      items: cart.items
    })

  } catch (error: any) {
    // Log full error server-side for debugging
    console.error('Cart add error:', error)

    // Include message in response during development to aid debugging (remove in prod)
    const message = error?.message || 'Internal server error'
    return NextResponse.json({ error: 'Internal server error', message }, { status: 500 })
  }
}