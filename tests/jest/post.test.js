/*eslint-disable */
import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import prisma from '../../src/prisma'

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
})

beforeEach(async () => {
  await prisma.mutation.deleteManyPosts()
})

test('Should create a post', async () => {
  const createPost = gql`
    mutation {
      createPost(
        key: "test"
        input: { name: "Andrew", text: "Post by Andrew" }
      ) {
        id
        name
        text
      }
    }
  `
  const res = await client.mutate({ mutation: createPost })
  const postExists = await prisma.exists.Post({
    id: res.data.createPost.id,
    key: 'test',
  })

  expect(postExists).toBe(true)
})
