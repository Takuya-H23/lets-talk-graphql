let posts = [
  {
    id: 'post1',
    key: 'post1',
    text: 'GraphQL',
    createdAt: 'Thu Apr 16 2020 21:58:30 GMT-0400',
    updatedAt: null,
  },
  {
    id: 'post2',
    key: 'post2',
    text: 'Node.js',
    createdAt: 'Thu Apr 16 2020 21:58:30 GMT-0400',
    updatedAt: null,
  },
  {
    id: 'post3',
    key: 'post3',
    text: 'React',
    createdAt: 'Thu Apr 16 2020 21:58:30 GMT-0400',
    updatedAt: null,
  },
]

let comments = [
  {
    id: 'comment1',
    key: 'comment1',
    text: 'About GraphQL',
    postId: 'post1',
    createdAt: 'Thu Apr 16 2020 21:58:30 GMT-0400',
    updatedAt: null,
  },
  {
    id: 'comment2',
    key: 'comment2',
    text: 'About Node.js',
    postId: 'post2',
    createdAt: 'Thu Apr 16 2020 21:58:30 GMT-0400',
    updatedAt: null,
  },
  {
    id: 'comment3',
    key: 'comment3',
    text: 'About React',
    postId: 'post3',
    createdAt: 'Thu Apr 16 2020 21:58:30 GMT-0400',
    updatedAt: null,
  },
]

export default { posts, comments }
