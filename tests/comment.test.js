/*eslint-disable */
import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, { postOne, commentOne } from './jest/utils/seedDatabase'

const client = new ApolloBoost({
  uri: 'http://localhost:4000',
})

beforeEach(seedDatabase)

test('Should return comments', async () => {
  const comments = gql`
    query {
      comments {
        id
        name
        text
      }
    }
  `

  const { data } = await client.query({ query: comments })

  expect(data.comments[0].id).toBe(commentOne.comment.id)
})

test('Should create a comment', async () => {
  const createComment = gql`
    mutation {
      createComment(
        key: "test"
        input: { name: "Andrew", text: "Comment by Andrew", postId: "${postOne.post.id}" }
      ) {
        id
        name
        text
      }
    }
  `
  const res = await client.mutate({ mutation: createComment })
  const commentExists = await prisma.exists.Comment({
    id: res.data.createComment.id,
    key: 'test',
  })

  expect(commentExists).toBe(true)
})

test('Should update a comment', async () => {
  const updateComment = gql`
    mutation {
      updateComment(
        key: "${commentOne.data.key}"
        input: { id: "${commentOne.comment.id}", text: "${'Updated comment'}" }
      ) {
        id
      }
    }
  `

  await client.mutate({ mutation: updateComment })

  const commentExists = await prisma.exists.Comment({
    id: commentOne.comment.id,
    key: commentOne.data.key,
    text: 'Updated comment',
  })

  expect(commentExists).toBe(true)
})

// test('Should delete a comment', async () => {
//   const deleteComment = gql`
//     mutation {
//       deleteComment(
//         key: "${commentOne.data.key}"
//         input: { id: "${commentOne.comment.id}"} )
//       {
//         id
//       }
//     }
//   `

//   await client.mutate({ mutation: deleteComment })
//   const commentExists = await prisma.exists.Comment({
//     id: commentOne.comment.id,
//   })

//   expect(commentExists).toBe(false)
// })
