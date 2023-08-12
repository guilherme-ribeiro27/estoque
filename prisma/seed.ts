import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.userTypes.create({
        data: {
        name: 'Administrador'
        },
    })
    await prisma.userTypes.create({
        data: {
          name: 'Estoquista'
        },
      })
    await prisma.userTypes.create({
        data: {
            name: 'Vendedor'
        },
    })
  }
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })