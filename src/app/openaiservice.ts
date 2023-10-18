import OpenAI from 'openai'
export const openai = new OpenAI({
  apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
})
