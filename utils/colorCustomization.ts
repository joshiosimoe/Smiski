export function generateRandomColors() {
  const hue = Math.floor(Math.random() * 360)
  const primary = `hsl(${hue}, 80%, 50%)`
  const secondary = `hsl(${(hue + 30) % 360}, 60%, 60%)`
  const accent = `hsl(${(hue + 60) % 360}, 70%, 70%)`

  document.documentElement.style.setProperty("--primary", primary)
  document.documentElement.style.setProperty("--secondary", secondary)
  document.documentElement.style.setProperty("--accent", accent)
  // Add more color updates as needed
}


