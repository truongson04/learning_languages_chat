export default function capitalize(text = "Sơn") {
  return text.charAt(0).toLocaleUpperCase() + text.slice(1);
}
