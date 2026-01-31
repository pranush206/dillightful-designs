import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/store/cart";
import { Separator } from "@/components/ui/separator";

const WHATSAPP_NUMBER = "919059582419";

export function CartSheet() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToOrder = () => {
    setShowAddressForm(true);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build order details message
    const itemsList = items
      .map((item) => `• ${item.pickle.name} (${item.pickle.weight}) × ${item.quantity} = ₹${item.pickle.price * item.quantity}`)
      .join("\n");

    const message = `🛒 *New Order from Maa's Pickles*

*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}

*Order Items:*
${itemsList}

*Total Amount: ₹${totalPrice}*

Please confirm this order. Thank you! 🙏`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Reset form and clear cart
    setFormData({ name: "", phone: "", address: "" });
    setShowAddressForm(false);
    clearCart();
    closeCart();
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={closeCart}>
        <SheetContent className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 font-display">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Your Cart
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
              <div className="text-6xl">🫙</div>
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button onClick={closeCart} variant="outline">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.pickle.id} className="flex gap-4 p-3 rounded-lg bg-muted/50">
                    <img
                      src={item.pickle.image}
                      alt={item.pickle.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.pickle.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.pickle.weight}</p>
                      <p className="text-sm font-semibold text-primary mt-1">
                        ₹{item.pickle.price}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.pickle.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.pickle.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.pickle.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{totalPrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-primary">₹{totalPrice}</span>
                </div>
                <Separator />
                <div className="grid gap-2">
                  <Button size="lg" onClick={handleProceedToOrder}>
                    Proceed to Order
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Address Form Dialog */}
      <Dialog open={showAddressForm} onOpenChange={setShowAddressForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Delivery Details</DialogTitle>
            <DialogDescription>
              Enter your details to complete the order via WhatsApp.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendWhatsApp} className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter your complete delivery address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>

            {/* Order Summary */}
            <div className="p-3 bg-muted/50 rounded-lg space-y-2 text-sm">
              <h4 className="font-semibold">Order Summary</h4>
              {items.map((item) => (
                <div key={item.pickle.id} className="flex justify-between">
                  <span>{item.pickle.name} × {item.quantity}</span>
                  <span>₹{item.pickle.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">₹{totalPrice}</span>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Send Order via WhatsApp
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
