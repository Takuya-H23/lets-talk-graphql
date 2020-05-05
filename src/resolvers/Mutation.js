import '@babel/polyfill'
import validateStringLength from '../utils/validateStringLength.js'
import checkName from '../utils/checkName'
import prismaExists from '../utils/prismaExists'
import { TABLES } from '../utils/constant'

const Mutation = {
  createPost(parent, { key, input }, { prisma }, info) {
    validateStringLength(key, input.text)

    const newPost = {
      key,
      name: checkName(input.name),
      text: input.text,
    }

    return prisma.mutation.createPost({ data: newPost }, info)
  },

  async updatePost(parent, { key, input }, { prisma }, info) {
    validateStringLength(key, input.text)
    await prismaExists({ id: input.id, key }, TABLES.POST)

    return prisma.mutation.updatePost(
      { data: { text: input.text }, where: { id: input.id } },
      info
    )
  },

  async deletePost(parent, { key, input }, { prisma }, info) {
    validateStringLength(key)
    await prismaExists({ id: input.id, key }, TABLES.POST)

    return prisma.mutation.deletePost({ where: { id: input.id } }, info)
  },

  // Comment Mutation==================================================
  async createComment(parent, { key, input }, { prisma }, info) {
    validateStringLength(key, input.name, input.text)
    await prismaExists({ id: input.postId }, TABLES.POST)

    return prisma.mutation.createComment(
      {
        data: {
          key,
          text: input.text,
          name: input.name,
          post: { connect: { id: input.postId } },
        },
      },
      info
    )
  },

  async updateComment(parent, { key, input }, { prisma }, info) {
    validateStringLength(key, input.text)
    await prismaExists({ id: input.id, key }, TABLES.COMMENT)

    return prisma.mutation.updateComment(
      {
        data: { key, text: input.text },
        where: { id: input.id },
      },
      info
    )
  },

  async deleteComment(parent, { key, input }, { prisma }, info) {
    await prismaExists({ id: input.id, key }, TABLES.COMMENT)

    return prisma.mutation.deleteComment({ where: { id: input.id } }, info)
  },
}

export default Mutation
