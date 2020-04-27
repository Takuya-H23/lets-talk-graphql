import prisma from '../../../src/prisma'

export const postOne = {
  data: {
    key: 'emma',
    text: 'Post from seedDatabase',
    name: 'Emma',
  },
  post: undefined,
}

export const commentOne = {
  data: {
    key: 'mike',
    text: 'Good post, Emma!',
    name: 'Mike',
  },
  comment: undefined,
}

export default async () => {
  await prisma.mutation.deleteManyPosts()
  await prisma.mutation.deleteManyComments()

  postOne.post = await prisma.mutation.createPost({
    data: postOne.data,
  })

  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.data,
      post: { connect: { id: postOne.post.id } },
    },
  })
}
