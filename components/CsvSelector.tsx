"use client"

import { useState, useEffect } from "react"
import { PhilosophicalSpinner } from "./PhilosophicalSpinner"
import { FileText, Calendar } from "lucide-react"

interface CsvFile {
  _id: string
  fileName: string
  uploadDate: string
}

interface CsvSelectorProps {
  onSelect: (csvId: string) => void
}

export function CsvSelector({ onSelect }: CsvSelectorProps) {
  const [csvFiles, setCsvFiles] = useState<CsvFile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCsvFiles = async () => {
      try {
        const response = await fetch("/api/csv-files")
        if (!response.ok) {
          throw new Error("Failed to fetch CSV files")
        }
        const data = await response.json()
        setCsvFiles(data.files)
      } catch (err) {
        setError("Failed to load CSV files")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCsvFiles()
  }, [])

  if (isLoading) return <PhilosophicalSpinner />
  if (error) return <p className="text-destructive">{error}</p>

  return (
    <div className="space-y-4">
      {csvFiles.length === 0 ? (
        <p className="text-muted-foreground">No CSV files uploaded yet.</p>
      ) : (
        csvFiles.map((file) => (
          <button
            key={file._id}
            onClick={() => onSelect(file._id)}
            className="w-full text-left p-4 hover:bg-primary/10 rounded-lg transition-colors flex items-center space-x-4 border border-border"
          >
            <FileText className="text-primary" />
            <div className="flex-grow">
              <span className="font-medium block">{file.fileName}</span>
              <span className="text-sm text-muted-foreground flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(file.uploadDate).toLocaleDateString()}
              </span>
            </div>
          </button>
        ))
      )}
    </div>
  )
}


