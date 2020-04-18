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

  // Comment Mutation==================================================
  createComment(parent, { key, input }, { db }) {
    validateStringLength(key, input.name, input.text)

    const post = db.posts.find((post) => post.id === input.postId)
    if (!post) throw new Error('Post not found')

    const newComment = {
      id: 'comment4',
      key,
      ...input,
      createdAt: new Date(),
      updatedAt: null,
    }

    db.comments.push(newComment)

    return newComment
  },

  updateComment(parent, { key, input }, { db }) {
    validateStringLength(key, input.text)

    const comment = db.comments.find(
      (comment) => comment.id === input.id && comment.key === key
    )
    if (!comment) throw new Error('Not found')

    comment.text = input.text
    comment.updatedAt = new Date()

    return comment
  },

  deleteComment(parent, { key, input }, { db }) {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === input.id && comment.key === key
    )
    if (commentIndex === -1) throw new Error('Comment not found')

    return db.comments.splice(commentIndex, 1)[0]
  },
}

export default Mutation
