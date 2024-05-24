import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { generateSlug } from "../utils/generate-slugs"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"
import { BadRequest } from "./_errors/bad-request"

export async function cretaeEvent(app: FastifyInstance) {

    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/events', {
        schema: {
            summary: 'Create an event',
            tags: ['events'],
            body: z.object({
                title: z.string().min(4),
                details: z.string().nullable(),
                maximumAttendees: z.number().int().positive().nullable(),
            }),
            response: {
                201: z.object({
                    eventId: z.string().uuid(),
                })
            }
        }
    }, async (request, reply) => {
        const {
            title,
            details,
            maximumAttendees
        } = request.body
        
        console.log(title)
        const slug = generateSlug(title)
        
        const eventWithSameslug = await prisma.event.findUnique({
            where: {
                slug,
            }
        })
        
        if (eventWithSameslug != null) {
            throw new BadRequest('Another event with same title already exists.')
        }

        const event = await prisma.event.create({
            data: {
                title,
                details,
                maximumAttendees,
                slug,
            },
        })
        
        return reply.status(201).send({ eventId: event.id })
    })
    
}