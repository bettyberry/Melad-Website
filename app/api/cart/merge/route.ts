// app/api/cart/merge/route.ts
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

    const body = await request.json()
    const { userId, items } = body || {}

    console.log('Cart merge request body:', { body })

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid items data' },
        { status: 400 }
      )
    }

    await connectDB()

    const uid = session.user.email
    console.log('Cart merge requested by user:', uid)

    let cart = await Cart.findOne({ userId: uid })

    if (!cart) {
      cart = new Cart({ userId: uid, items: [] })
    }

    // Merge incoming items into cart (sum quantities)
    for (const incoming of items) {
      const productId = String(incoming.productId)
      const existing = cart.items.find((i: any) => String(i.productId) === productId)
      if (existing) {
        existing.quantity = (existing.quantity || 0) + (Number(incoming.quantity) || 1)
      } else {
        cart.items.push({
          productId,
          name: incoming.name || incoming.title || 'Product',
          price: Number(incoming.price) || 0,
          quantity: Number(incoming.quantity) || 1,
          image: incoming.image || ''
        })
      }
    }

    try {
      await cart.save()
    } catch (saveErr: any) {
      console.error('Cart save failed, attempting recovery:', saveErr)

      // Handle duplicate-key (E11000) which may come from legacy/other indexes
      if (saveErr?.code === 11000) {
        console.warn('E11000 detected during merge. Running recovery lookup...')

        // Try to find an existing cart using several alternate keys to recover
        const alternatives = [
          { userId: uid },
          { userEmail: session.user.email },
          { userEmail: null }
        ]

        let recovered = null
        for (const q of alternatives) {
          try {
            const found = await Cart.findOne(q)
            if (found) {
              recovered = found
              break
            }
          } catch (e) {
            console.warn('Recovery query failed for', q, e)
          }
        }

        if (recovered) {
          console.log('Merging into recovered cart:', recovered._id)

          // Sanitize recovered cart: ensure userId and normalize/filter items
          if (!recovered.userId) {
            console.warn('Recovered cart missing userId — setting to current user:', uid)
            recovered.userId = uid
          }

          const sanitizedItems: any[] = []
          for (const it of recovered.items || []) {
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
          recovered.items = sanitizedItems

          // merge cart.items into recovered
          for (const incoming of cart.items) {
            const pid = String(incoming.productId)
            const existing = recovered.items.find((i: any) => String(i.productId) === pid)
            if (existing) existing.quantity = (existing.quantity || 0) + (incoming.quantity || 0)
            else recovered.items.push({
              productId: pid,
              name: incoming.name || incoming.title || 'Product',
              price: Number(incoming.price) || 0,
              quantity: Number(incoming.quantity) || 1,
              image: incoming.image || ''
            })
          }
          await recovered.save()
          cart = recovered
        } else {
          // Final fallback: atomic upsert to create-or-push items
          console.log('No recovered cart found — attempting atomic upsert fallback')
          const upserted = await Cart.findOneAndUpdate(
            { userId: uid },
            { $setOnInsert: { userId: uid }, $push: { items: { $each: cart.items } } },
            { new: true, upsert: true }
          )
          if (!upserted) throw saveErr
          cart = upserted
        }
      } else {
        throw saveErr
      }
    }

    const mergedItemsCount = cart.items.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)

    console.log('🔄 Cart merge completed:', {
      user: uid,
      mergedItems: mergedItemsCount
    })

    return NextResponse.json({
      success: true,
      mergedItemsCount,
      items: cart.items,
      message: 'Cart merged successfully'
    })

  } catch (error: any) {
    console.error('Cart merge error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error?.message || String(error) },
      { status: 500 }
    )
  }
}