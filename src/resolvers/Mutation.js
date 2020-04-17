import validateStringLength from '../utils/validateStringLength.js'
import checkName from '../utils/checkName'

const Mutation = {
  createPost(parent, { key, input }, { db }) {
    validateStringLength(key)
    const newPost = {
      id: 'post4',
      key,
      name: checkName(input.name),
      text: input.text,
      createdAt: new Date(),
      updatedAt: null,
    }

    db.posts.push(newPost)
    return newPost
  },

  updatePost(parent, { key, input }, { db }) {
    validateStringLength(key, input.text)

    const post = db.posts.find(
      (post) => post.id === input.id && post.key === key
    )
    if (!post) throw new Error('Post not found')

    post.text = input.text
    post.updatedAt = new Date()

    return post
  },

  deletePost(parent, { key, input }, { db }) {
    validateStringLength(key)

    const postIndex = db.posts.findIndex(
      (post) => post.id === input.id && post.key === key
    )
    if (postIndex === -1) throw new Error('Post not found')

    db.comments = db.comments.filter((comment) => comment.postId !== input.id)

    return db.posts.splice(postIndex, 1)[0]
  },
}

export default Mutation
