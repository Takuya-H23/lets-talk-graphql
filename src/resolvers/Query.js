const Query = {
  posts(parent, args, { prisma }, info) {
    return prisma.query.posts(null, info)
  },

  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info)
  },
}

export default Query
