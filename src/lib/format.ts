export const formatPrice = (price: number | null) =>
  price === null
    ? "Price on request"
    : new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
