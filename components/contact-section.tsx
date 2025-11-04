"use client"

import { useState } from "react"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"

export default function ContactSection() {
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess("")
    setError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(data.message)
        setName("")
        setEmail("")
        setMessage("")
      } else {
        setError(data.error || "Failed to send message.")
      }
    } catch (err) {
      console.error(err)
      setError("Failed to send message.")
    }

    setLoading(false)
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("contact")}</h2>

          <div className="grid w-full max-w-5xl gap-6 md:grid-cols-2 mt-8">
            {/* Form Card */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Message"
                    className="min-h-[120px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />

                  {success && <p className="text-green-600 text-sm">{success}</p>}
                  {error && <p className="text-red-600 text-sm">{error}</p>}

                  <Button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Find us using the information below.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium leading-none">Address</p>
                    <p className="text-sm text-muted-foreground">
                      Yeka, Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium leading-none">Phone</p>
                    <p className="text-sm text-muted-foreground">0911234578</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium leading-none">Email</p>
                    <p className="text-sm text-muted-foreground">info@brana.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
