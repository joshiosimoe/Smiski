"use client"

import { useEffect, useRef } from "react"

export function FloatingShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const shapes: Shape[] = []
    const numShapes = 20

    class Shape {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      type: "circle" | "square" | "triangle"

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.opacity = Math.random() * 0.5 + 0.1
        this.type = ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as "circle" | "square" | "triangle"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.fillStyle = `rgba(var(--primary), ${this.opacity})`

        switch (this.type) {
          case "circle":
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fill()
            break
          case "square":
            ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
            break
          case "triangle":
            ctx.moveTo(this.x, this.y - this.size)
            ctx.lineTo(this.x - this.size, this.y + this.size)
            ctx.lineTo(this.x + this.size, this.y + this.size)
            ctx.closePath()
            ctx.fill()
            break
        }
      }
    }

    for (let i = 0; i < numShapes; i++) {
      shapes.push(new Shape())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      shapes.forEach((shape) => {
        shape.update()
        shape.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}


