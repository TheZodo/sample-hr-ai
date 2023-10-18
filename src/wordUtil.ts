import mammoth from 'mammoth'

export async function extractTextFromDocxFile(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async () => {
      try {
        const docxData = reader.result as ArrayBuffer
        const result = await mammoth.extractRawText({
          arrayBuffer: docxData,
        })
        resolve(result.value)
      } catch (error) {
        console.log(error)
        reject(error)
      }
    }

    reader.readAsArrayBuffer(file)
  })
}
