import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from 'zod'
import { openai } from "../lib/openai";

export async function generateCompletionRouts(app: FastifyInstance) {
    app.post('/ai/complete', async (request, reply) => {

        const bodySchema = z.object({
            videoID: z.string().uuid(),
            template: z.string(),
            temperature: z.number().min(0).max(1).default(0.5)
        })

        const { videoID, template, temperature} = bodySchema.parse(request.body)

        const video = await prisma.video.findFirstOrThrow({
            where: {
                id: videoID,
            }
        })

        if(!video.transcription) {
            return reply.status(400).send({ error: "Video transcription was not generated yet." })
        }

        const promptMessage = template.replace('{transcription}', video.transcription)

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-16k',
            temperature,
            messages: [
                {role: 'user', content: promptMessage}
            ]
        })

        return response
    })
} 