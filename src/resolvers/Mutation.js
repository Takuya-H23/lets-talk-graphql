import checkStringLength from './../utils/checkStringLength'

const Mutation = {
  createPost(parent, { key, input }, { db }) {
    checkStringLength(key, input.text, input.name)

    const newPost = {
      key,
      ...input,
      id: 'post4',
      createdAt: new Date(),
      updatedAt: null,
    }
    db.posts.push(newPost)

    return newPost
  },

  updatePost(parent, { key, input }, { db }) {
    checkStringLength(key, input.text)

    const post = db.posts.findIndex(
      (post) => post.id === input.id && post.key === key
    )
    if (post === -1) throw new Error('Post not found')

    const newPost = {
      ...db.posts[post],
      text: input.text,
      updatedAt: new Date(),
    }
    db.posts.splice(post, 1, newPost)

    return db.posts[post]
  },

  deletePost(parent, { key, input }, { db }) {
    const post = db.posts.findIndex(
      (post) => post.id === input.id && post.key === key
    )
    if (post === -1) throw new Error('Post not found')

    db.comments = db.comments.filter((comment) => comment.postId !== input.id)

    return db.posts.splice(post, 1)[0]
  },

  // Comment Mutation======================================================
  createComment(parent, { key, input }, { db }) {
    const post = db.posts.findIndex((post) => post.id === input.postId)
    if (post === -1) throw new Error('Post not found')

    checkStringLength(key, input.text, input.name)

    const newComment = {
      ...input,
      key,
      id: 'newComment',
      updatedAt: null,
      createdAt: new Date(),
    }

    db.comments.push(newComment)
    return newComment
  },

  updateComment(parent, { key, input }, { db }) {
    checkStringLength(key, input.text)

    const comment = db.comments.find(
      (comment) => comment.id === input.id && comment.key === key
    )
    if (!comment) throw new Error('Comment not found')

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
