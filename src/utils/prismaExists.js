import prisma from './../prisma'
import { TABLES } from './constant'

async function prismaExists(value, table) {
  let dataExists

  if (table === TABLES.POST) {
    dataExists = await prisma.exists.Post(value)
  }
  if (table === TABLES.COMMENT) {
    dataExists = await prisma.exists.Comment(value)
  }

  if (!dataExists) throw new Error('Data not found')
}

export default prismaExists
