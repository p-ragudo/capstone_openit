export function parseAmount(str) {
  return parseFloat(String(str).replace(/[₱,]/g, "")) || 0;
}

export function formatAmount(num) {
  return "₱" + Number(num).toLocaleString("en-PH");
}
