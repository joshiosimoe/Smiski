"use client"

import { useState, useEffect } from "react"

const miyazakiQuotes = [
  "The creation of a single world comes from a huge number of fragments and chaos.",
  "I've become skeptical of the unwritten rule that just because a boy and girl appear in the same feature, a romance must ensue. Rather, I want to portray a slightly different relationship, one where the two mutually inspire each other to live - if I'm able to, then perhaps I'll be closer to portraying a true expression of love.",
  "Personally I am very pessimistic. But when, for instance, one of my staff has a baby you can't help but bless them for a good future. Because I can't tell that child, 'Oh, you shouldn't have come into this life.' And yet I know the world is heading in a bad direction. So with those conflicting thoughts in mind, I think about what kind of films I should be making.",
  "The concept of portraying evil and then destroying it - I know this is considered mainstream, but I think it is rotten. This idea that whenever something evil happens someone particular can be blamed and punished for it, in life and in politics is hopeless.",
  "Many of my movies have strong female leads - brave, self-sufficient girls that don't think twice about fighting for what they believe in with all their heart. They'll need a friend, or a supporter, but never a savior. Any woman is just as capable of being a hero as any man.",
  "I do believe in the power of story. I believe that stories have an important role to play in the formation of human beings, that they can stimulate, amaze and inspire their listeners.",
  "Is someone different at age 18 or 60? I believe one stays the same.",
  "We depict hatred, but it is to depict that there are more important things. We depict a curse, to depict the joy of liberation.",
  "To have a film where there's an evil figure and a good person fights against the evil figure and everything becomes a happy ending, that's one way to make a film. But then that means you have to draw, as an animator, the evil figure. And it's not very pleasant to draw evil figures.",
  "I think we should stop using nuclear power plants because they're extremely dangerous. But this doesn't mean I want to go back to the land and live in a house with a charcoal fire.",
]

export function PhilosophicalQuote({ className = "" }: { className?: string }) {
  const [quote, setQuote] = useState("")

  useEffect(() => {
    setQuote(miyazakiQuotes[Math.floor(Math.random() * miyazakiQuotes.length)])
  }, [])

  return <div className={`italic text-foreground/70 ${className}`}>"{quote}" - Hayao Miyazaki</div>
}


