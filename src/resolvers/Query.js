const Query = {
  threads(parent, args, { db }) {
    return db.threads
  },

  comments(parent, args, { db }) {
    return db.comments
  },
}

export default Query
