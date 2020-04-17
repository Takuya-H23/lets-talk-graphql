const Comment = {
  post(parent, args, { db }) {
    return db.posts.find((post) => post.id === parent.postId)
  },
}

export default Comment
