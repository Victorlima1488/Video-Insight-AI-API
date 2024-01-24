import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors"
import { getAllPromptsRouts } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { getAllTranscriptionRouts } from "./routes/create-transcription";
import { generateCompletionRouts } from "./routes/generate-ai-completion";

const app = fastify()

app.register(fastifyCors, {
    origin: '*'
})

app.register(getAllPromptsRouts)
app.register(uploadVideoRoute)
app.register(getAllTranscriptionRouts)
app.register(generateCompletionRouts)

app.listen({
    port: 3333,
}).then(() => {
    console.log(`HTTP Server Running!`)
})