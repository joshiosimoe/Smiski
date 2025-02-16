"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Submission {
  data: string
  timestamp: string
}

export default function History() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedSubmissions = localStorage.getItem("submissions")
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions))
    }
  }, [])

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Submission History</h1>
        {submissions.length > 0 ? (
          <div className="bg-card rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left text-muted-foreground">Timestamp</th>
                  <th className="p-3 text-left text-muted-foreground">Data</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => (
                  <tr key={index} className="border-t border-muted">
                    <td className="p-3 text-card-foreground">{new Date(submission.timestamp).toLocaleString()}</td>
                    <td className="p-3 text-card-foreground">{submission.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground">No submissions yet.</p>
        )}
        <button
          onClick={() => router.back()}
          className="mt-6 bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-secondary/90 transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  )
}


