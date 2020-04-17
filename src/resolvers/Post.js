const Post = {
  comments(post, args, { db }) {
    return db.comments.filter((comment) => comment.postId === post.id)
  },
}

export default Post
