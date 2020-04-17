const Query = {
  posts(parent, args, { db }) {
    return db.posts
  },

  comments(parent, args, { db }) {
    return db.comments
  },
}

export default Query
