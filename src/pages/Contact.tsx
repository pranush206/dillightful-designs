import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useCart } from "@/store/cart";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppSendUrl } from "@/lib/whatsapp";

const Contact = () => {
  const location = useLocation();
  const fromCart = location.state?.fromCart;
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build WhatsApp message
    let message = `📬 *New Contact Message*\n\n`;
    message += `👤 *Name:* ${formData.name}\n`;
    message += `📞 *Phone:* ${formData.phone}\n`;
    if (formData.email) {
      message += `📧 *Email:* ${formData.email}\n`;
    }
    
    if (fromCart && items.length > 0) {
      message += `\n🏠 *Delivery Address:*\n${formData.address}\n`;
      message += `\n🛒 *Order Details:*\n`;
      items.forEach((item) => {
        message += `• ${item.pickle.name} × ${item.quantity} = ₹${item.pickle.price * item.quantity}\n`;
      });
      message += `\n💰 *Total: ₹${getTotalPrice()}*\n`;
      if (formData.message) {
        message += `\n📝 *Special Instructions:*\n${formData.message}`;
      }
      clearCart();
    } else {
      message += `\n💬 *Message:*\n${formData.message}`;
    }
    
    // Open WhatsApp with the message
    const whatsappUrl = buildWhatsAppSendUrl({
      phoneE164Digits: "+919059582419",
      message: message,
    });
    window.open(whatsappUrl, "_blank");
    
    setIsSubmitted(true);
    toast({
      title: fromCart ? "Order Sent! 🎉" : "Message Sent! 🎉",
      description: "Your message has been sent via WhatsApp.",
    });
  };

  if (isSubmitted) {
    return (
      <main className="py-20">
        <div className="container-custom">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-4">Thank You!</h1>
            <p className="text-muted-foreground mb-6">
              Your {fromCart ? "order" : "message"} has been received. We'll get back to you shortly.
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Send Another Message
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            {fromCart ? "Complete Your Order" : "Get in Touch"}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-4">
            {fromCart ? "Order Details" : "Contact For Bulk Orders"}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {fromCart
              ? "Fill in your details and we'll process your order right away."
              : "Have questions or want to place a bulk order? We'd love to hear from you!"}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <Card variant="elevated" className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="font-display">
                {fromCart ? "Delivery Information" : "Send us a Message"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {fromCart && (
                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Enter your complete delivery address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="message">
                    {fromCart ? "Special Instructions (Optional)" : "Message"}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={
                      fromCart
                        ? "Any special requests or delivery instructions..."
                        : "Your message..."
                    }
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                {/* Order Summary (if from cart) */}
                {fromCart && items.length > 0 && (
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <h4 className="font-semibold">Order Summary</h4>
                    {items.map((item) => (
                      <div key={item.pickle.id} className="flex justify-between text-sm">
                        <span>
                          {item.pickle.name} × {item.quantity}
                        </span>
                        <span>₹{item.pickle.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-primary">₹{getTotalPrice()}</span>
                    </div>
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  {fromCart ? "Place Order" : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card variant="elevated">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-display text-xl font-semibold">Contact Information</h3>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground text-sm">+91 9000872418</p>
                    <p className="text-muted-foreground text-sm">+91 9059582419</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground text-sm">support206@gmail.com</p>
                    <p className="text-muted-foreground text-sm">pranush206@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground text-sm">
                      445-26 Lela Mahal
                      <br />
                      Tirupati 517501
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-muted-foreground text-sm">
                      Mon - Sat: 9:00 AM - 7:00 PM
                      <br />
                      Sunday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
