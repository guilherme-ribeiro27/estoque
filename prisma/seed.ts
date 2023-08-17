import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.stock.create({
    data:{
      quantity: 1,
      size:37,
      productModelsId:1
    }
  })
  await prisma.stock.create({
    data:{
      quantity: 1,
      size:38,
      productModelsId:1
    }
  })

  await prisma.stock.create({
    data:{
      quantity: 1,
      size:39,
      productModelsId:3
    }
  })
  await prisma.stock.create({
    data:{
      quantity: 1,
      size:40,
      productModelsId:3
    }
  })
  await prisma.stock.create({
    data:{
      quantity: 1,
      size:41,
      productModelsId:3
    }
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