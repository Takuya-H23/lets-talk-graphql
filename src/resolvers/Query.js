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

  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info)
  },
}

export default Query
