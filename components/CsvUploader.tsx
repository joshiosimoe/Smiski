"use client"

import type React from "react"

import { useState, useRef } from "react"
import { PhilosophicalSpinner } from "./PhilosophicalSpinner"
import { Upload, File, AlertCircle } from "lucide-react"

interface CsvUploaderProps {
  onUpload: (csvId: string) => void
}

export function CsvUploader({ onUpload }: CsvUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file")
      return
    }

    setIsUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const result = await response.json()
      console.log("Upload successful:", result)
      onUpload(result.fileId)
    } catch (err) {
      console.error("Error uploading file:", err)
      setError(`Failed to upload and process the file: ${err.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-card/50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-primary" />
            <p className="mb-2 text-sm text-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">CSV files only</p>
          </div>
          <input
            ref={fileInputRef}
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {file && (
        <div className="flex items-center space-x-2 text-sm text-foreground">
          <File className="w-4 h-4" />
          <span>{file.name}</span>
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="philosophical-button w-full flex items-center justify-center"
      >
        {isUploading ? <PhilosophicalSpinner /> : "Upload and Process"}
      </button>
      {error && (
        <div className="flex items-center text-destructive">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}


