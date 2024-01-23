import { fastify } from "fastify";
import { getAllPromptsRouts } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { getAllTranscriptionRouts } from "./routes/create-transcription";

const app = fastify()

app.register(getAllPromptsRouts)
app.register(uploadVideoRoute)
app.register(getAllTranscriptionRouts)

app.listen({
    port: 3333,
}).then(() => {
    console.log(`HTTP Server Running!`)
})