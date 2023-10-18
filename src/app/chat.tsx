'use client'
import { Button } from '@/components/ui/button'
import { useDropzone } from 'react-dropzone'
import DocumentSetter from '@/components/DocumentSetter'
import { useEffect, useState } from 'react'
import { extractTextFromDocxFile } from '@/wordUtil'
import { Configuration, OpenAIApi } from 'openai-edge'
import { useChat, useCompletion } from 'ai/react'
import { useToast } from '@/components/ui/use-toast'

// import { read } from 'fs'

export default function Chat() {
  const { toast } = useToast()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isFileSelected, setIsFileSelected] = useState<boolean>(true)
  const [loadingTheResponse, setLoadingTheResponse] = useState<boolean>(false)
  const { messages, append, } = useChat({
    initialMessages: [
      {
        id: '1',
        role: 'system',
        content:
          'You are an expert resume reviewer system named Zodo with over 20 years experience and a love for helping people improve their career prospects, give a review of the following resume highlighting points to improve and giving examples of said improved points. Stay less than 300 words and use an upbeat tone. Do not just send back the resume itself. Between each point or paragraph add a new line and speak as if you are talking to the person who wrote the resume.',
      },
    ],
  })

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles)
    },
    maxFiles: 1,
    maxSize: 1000000,
  })
  const files = selectedFiles.map((file) => (
    <div key={file.name} className="">
      <DocumentSetter file={file} />
    </div>
  ))
  useEffect(() => {
    if (selectedFiles.length > 0) {
      console.log('isFileSelected', isFileSelected)
    }
    setSelectedFiles((prevArray) => [...prevArray, ...acceptedFiles])
    return () => {
      setSelectedFiles([])
      // setIsFileSelected(false)
    }
  }, [acceptedFiles])

  const processAndSendText = async () => {
    if (!selectedFiles[0]) {
      console.error('No file selected.')
      return
    }

    try {
      const fileExtension = selectedFiles[0].name
        .split('.')
        .pop()
        ?.toLowerCase()

      if (fileExtension === 'pdf') {
      }
      if (fileExtension === 'docx') {
        const wordText = await extractTextFromDocxFile(selectedFiles[0])
        console.log('This is the word text: ', wordText)
        await append({ role: 'user', content: wordText })
      } else {
        toast({
          title: 'Unsupported file format.',
          content: 'Please provide a Word document.',
          className: ' bg-red-500 text-white',
        })
        console.error(
          'Unsupported file format. Please provide a PDF or Word document.'
        )
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <section className="container">
          {!loadingTheResponse ? (
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p className="  h-36 rounded-lg px-6 bg-slate-100 border-dashed border-2 border-sky-500 flex items-center justify-center text-black cursor-pointer">
                Drag 'n' drop a word doc of the resume here, or click and select
                it
              </p>
            </div>
          ) : (
            <p>loading...</p>
          )}
          <div>
            <h4 className=" my-4">File</h4>
            <div className=" flex flex-wrap w-full h-fit">{files}</div>
            <Button
              type="button"
              className={` ${
                !isFileSelected && 'disabled bg-slate-300 cursor-not-allowed'
              } mb-4 `}
              onClick={() => {
                if (!isFileSelected) return
                console.log('its come here')
                processAndSendText()
              }}
            >
              Submit
            </Button>

            {messages.length > 2 && (
              <p className="bg-slate-100 p-2 rounded-lg">
                {messages[2]?.content ?? ''}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
