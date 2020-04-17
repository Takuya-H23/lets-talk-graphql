import checkStringLength from './../utils/checkStringLength'

const Mutation = {
  createPost(parent, { key, input }, { db }) {
    checkStringLength(key, input.text)

    const newPost = {
      key,
      text: input.text,
      id: 'post4',
      createdAt: new Date(),
      updatedAt: null,
    }
    db.posts.push(newPost)

    return newPost
  },

  updatePost(parent, { key, input }, { db }) {
    const post = db.posts.findIndex(
      (post) => post.id === input.id && post.key === key
    )
    if (post === -1) throw new Error('Post not found')

    checkStringLength(key, input.text)

    const newPost = {
      ...db.posts[post],
      text: input.text,
      updatedAt: new Date(),
    }
    db.posts.splice(post, 1, newPost)

    return db.posts[post]
  },

  deletePost(parent, { key, input }, { db }) {
    checkStringLength(key)

    const post = db.posts.findIndex(
      (post) => post.id === input.id && post.key === key
    )
    if (post === -1) throw new Error('Post not found')

    return db.posts.splice(post, 1)[0]
  },
}

export default Mutation
