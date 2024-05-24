import { prisma } from '../src/lib/prisma'

async function seed() {
    await prisma.event.create({
        data: {
            id:"967a7213-43f9-4dc1-8986-84024ef98586",
            title: "Unite Summit",
            slug: "unite-summit",
            details:"um evento p/ devs.",
            maximumAttendees: 120,
        }
    })
}

seed().then(() => {
    console.log('Database seeded!')

    prisma.$disconnect()
})