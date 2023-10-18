import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: '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',
})

export async function POST(req: Request) {
  console.log('req json', req.json)
  const {
    messages,
  }: { messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] } =
    await req.json()

  if (!messages) {
    console.log('No messages found ', messages)
    return new Response('No messages found', { status: 400 })
  }

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-16k',
    stream: true,
    messages: messages,
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
