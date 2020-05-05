import '@babel/polyfill'
import PrismaExists from '../utils/prismaExists'
import { TABLES } from '../utils/constant'

const Query = {
  posts(parent, { textOrName }, { prisma }, info) {
    return prisma.query.posts(
      {
        where: {
          OR: [
            { text_contains: textOrName || '' },
            { name_contains: textOrName || '' },
            {
              comments_some: {
                OR: [
                  { text_contains: textOrName || '' },
                  { name_contains: textOrName || '' },
                ],
              },
            },
          ],
        },
      },
      info
    )
  },

  async post(parent, { id }, { prisma }, info) {
    await PrismaExists({ id }, TABLES.POST)

    return prisma.query.post({ where: { id } }, info)
  },

  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info)
  },
}

export default Query
