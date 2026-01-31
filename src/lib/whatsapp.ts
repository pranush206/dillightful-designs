export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function buildWhatsAppSendUrl(params: { phoneE164Digits: string; message: string }): string {
  const encodedMessage = encodeURIComponent(params.message);
  const phone = params.phoneE164Digits.replace(/\D/g, "");

  // Desktop: prefer WhatsApp Web to avoid api.whatsapp.com being blocked by some browsers/extensions.
  // Mobile: wa.me is a good default that hands off to the WhatsApp app.
  return isMobileDevice()
    ? `https://wa.me/${phone}?text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
}
