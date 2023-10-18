'use client'
import React, { useState } from 'react'

import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faFileWord } from '@fortawesome/free-solid-svg-icons'
import { useToast } from './ui/use-toast'

const DocumentSetter = ({ file }: { file: File }) => {
  const [uploaded, setUploaded] = useState<boolean>(false)
  const { toast } = useToast()

  return (
    <div>
      <div
        className={`flex flex-col items-center ${
          uploaded ? 'hidden' : null
        } bg-gray-200 justify-center p-2  m-2 w-fit  rounded-lg`}
      >
        <div className="flex items-center mb-2 justify-center">
          {file.type === 'application/pdf' ? (
            <i className="text-2xl text-blue-500">
              <FontAwesomeIcon icon={faFilePdf} size="4x" />
            </i>
          ) : (
            <i className="text-2xl text-blue-500">
              <FontAwesomeIcon icon={faFileWord} size="4x" />
            </i>
          )}
        </div>
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-700">{file.name}</p>
        </div>
      </div>
    </div>
  )
}

export default DocumentSetter
