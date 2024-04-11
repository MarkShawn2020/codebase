import OpenAI from "openai"
import { z } from "zod"
import { LLMModelType } from "./providers"

export const createCallLLMSchema = z.object({
  modelName: z.string(),
  user: z.string().optional(),

  temperature: z.number().default(0.7).optional(),
  maxTokens: z.number().default(4096).optional(),
  topP: z.number().default(0.5).optional(),
  frequencyPenalty: z.number().default(0).optional(),
  presencePenalty: z.number().default(0).optional(),
  n: z.number().default(1).optional(),
  streaming: z.boolean().default(true).optional(),
  // stop: z.string().array().optional(), // todo: readonly warning
  timeout: z.number().default(3000).optional(),
  openAIApiKey: z.string().optional(),
})
export type ICreateCallLLM = z.infer<typeof createCallLLMSchema>

export type ILLMMessage = {
  role: "system" | "user" | "assistant"
  content: string
}

export type ICallLLMOptions = {
  model: LLMModelType
  messages: ILLMMessage[]
  temperature?: number
  topP?: number
  stream?: boolean
}

export type ICallLLMResponse = {
  options: ICallLLMOptions
  response: OpenAI.Chat.Completions.ChatCompletion | null
  query: {
    start: number
    end?: number
    success: boolean
  }
}

export const backendEngineTypeSchema = z.union([
  z.literal("fastapi"),
  z.literal("nodejs"),
])
// todo: how to define the LiteralUnionSchema, so that backendEngineTypeSchema: LiteralUnionSchema = ... is ok
// export type LiteralUnionSchema = z.ZodUnion<...>

// Define a type that transforms a string array into a union of ZodLiterals
export type LiteralUnionSchema = z.ZodUnion<
  [z.ZodLiteral<string>, ...z.ZodLiteral<string>[]]
>

export type BackendEngineType = z.infer<typeof backendEngineTypeSchema>
