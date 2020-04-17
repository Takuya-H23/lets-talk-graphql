const Post = {
  comments(parent, args, { db }) {
    return db.comments.filter((comment) => comment.postId === parent.id)
  },
}

export default Post
