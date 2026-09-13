export function whatsappLink(number, message) {
  const clean = String(number || '').replace(/\D/g, '');
  return clean ? `https://wa.me/${clean}?text=${encodeURIComponent(message)}` : '#';
}

export function scrollToHash() {
  if (!window.location.hash) return;
  window.requestAnimationFrame(() => {
    document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' });
  });
}
