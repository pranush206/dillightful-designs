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
import { buildWhatsAppSendUrl } from "@/lib/whatsapp";
import { toast } from "@/components/ui/use-toast";
import logoImage from "@/assets/logo.png";

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

  const itemsListForMessage = items
    .map((item) => `• ${item.pickle.name} (${item.pickle.weight}) × ${item.quantity} = ₹${item.pickle.price * item.quantity}`)
    .join("\n");

  const orderMessage = items.length
    ? `🛒 *New Order from 7 Hills Natu Ruchulu*

*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}

*Order Items:*
${itemsListForMessage}

*Total Amount: ₹${totalPrice}*

Please confirm this order. Thank you! 🙏`
    : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToOrder = () => {
    setShowAddressForm(true);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    // Many networks/browsers block WhatsApp domains (ERR_BLOCKED_BY_RESPONSE).
    // So we ALWAYS copy the message to clipboard as a reliable fallback.
    (async () => {
      try {
        await navigator.clipboard.writeText(orderMessage);
        toast({
          title: "Order message copied",
          description: "If WhatsApp is blocked, open WhatsApp and paste the message to send it.",
        });
      } catch {
        toast({
          title: "Copy failed",
          description: "Please manually select and copy the message shown in the dialog.",
          variant: "destructive",
        });
      }
    })();

    const whatsappUrl = buildWhatsAppSendUrl({
      phoneE164Digits: WHATSAPP_NUMBER,
      message: orderMessage,
    });

    // Try opening WhatsApp; if blocked, user can still paste the copied message.
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

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
              <img src={logoImage} alt="Empty cart" className="h-16 w-16 rounded-full object-cover" />
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
        <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden bg-gradient-to-b from-background to-muted/30">
          {/* Header with gradient accent */}
          <div className="bg-primary/5 border-b px-6 py-5">
            <DialogHeader className="space-y-1">
              <DialogTitle className="font-display text-xl text-foreground">
                Delivery Details
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Complete your order via WhatsApp
              </DialogDescription>
            </DialogHeader>
          </div>
          
          <form onSubmit={handleSendWhatsApp} className="flex flex-col flex-1 overflow-y-auto">
            <div className="px-6 py-5 space-y-5">
              {/* Full Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-1">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-11 bg-background border-muted-foreground/20 focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>
              
              {/* Phone Number Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-1">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-11 bg-background border-muted-foreground/20 focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>
              
              {/* Address Field */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium flex items-center gap-1">
                  Delivery Address <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="House/Flat No., Street, Landmark, City, PIN Code"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="bg-background border-muted-foreground/20 focus:border-primary focus:ring-primary/20 transition-all resize-none"
                />
              </div>
            </div>

            {/* Footer with Order Summary & Button */}
            <div className="mt-auto border-t bg-muted/40 px-6 py-4 space-y-4">
              {/* Order Summary */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
                <span className="text-xl font-bold text-primary">₹{totalPrice}</span>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <Send className="mr-2 h-4 w-4" />
                Book Order Now
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
