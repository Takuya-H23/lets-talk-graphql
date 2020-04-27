/*eslint-disable */
import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, { postOne, commentOne } from './jest/utils/seedDatabase'

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
})

beforeEach(seedDatabase)

const queryPosts = gql`
  query($input: String) {
    posts(textOrName: $input) {
      id
      name
      text
      comments {
        id
        text
        name
      }
    }
  }
`

test('Should return a post', async () => {
  const { data } = await client.query({ query: queryPosts })

  expect(data.posts[0].id).toBe(postOne.post.id)
  expect(data.posts[0].comments[0].id).toBe(commentOne.comment.id)
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

test('Should not return any posts', async () => {
  const variables = {
    input: 'asdfasdfasdf',
  }

  const { data } = await client.query({ query: queryPosts, variables })

  expect(data.posts.length).toBe(0)
})

test('Should update a post', async () => {
  const updatePost = gql`
    mutation {
      updatePost(
        key: "${postOne.data.key}"
        input: { id: "${postOne.post.id}", text: "${'Updated post'}" }
      ) {
        id
      }
    }
  `

  await client.mutate({ mutation: updatePost })

  const postExists = await prisma.exists.Post({
    id: postOne.post.id,
    key: postOne.data.key,
    text: 'Updated post',
  })

  expect(postExists).toBe(true)
})

test('Should delete a post', async () => {
  const deletePost = gql`
    mutation {
      deletePost(
        key: "${postOne.data.key}"
        input: { id: "${postOne.post.id}"} ) 
      {
        id
      }
    }
  `

  await client.mutate({ mutation: deletePost })
  const postExists = await prisma.exists.Post({ id: postOne.post.id })

  expect(postExists).toBe(false)
})
