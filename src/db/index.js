let threads = [
  {
    id: 'thread1',
    key: 'thread1',
    title: 'GraphQL',
    createdAt: 'Thu Apr 16 2020 21:58:30 GMT-0400',
    updatedAt: null,
  },
  {
    id: 'thread2',
    key: 'thread2',
    title: 'Node.js',
    createdAt: 'Thu Apr 16 2020 21:58:30 GMT-0400',
    updatedAt: null,
  },
  {
    id: 'thread3',
    key: 'thread3',
    title: 'React',
    createdAt: 'Thu Apr 16 2020 21:58:30 GMT-0400',
    updatedAt: null,
  },
]

let comments = [
  {
    id: 'comment1',
    key: 'comment1',
    text: 'About GraphQL',
    threadId: 'thread1',
    createdAt: 'Thu Apr 16 2020 21:58:30 GMT-0400',
    updatedAt: null,
  },
  {
    id: 'comment2',
    key: 'comment2',
    text: 'About Node.js',
    threadId: 'thread2',
    createdAt: 'Thu Apr 16 2020 21:58:30 GMT-0400',
    updatedAt: null,
  },
  {
    id: 'comment3',
    key: 'comment3',
    text: 'About React',
    threadId: 'thread3',
    createdAt: 'Thu Apr 16 2020 21:58:30 GMT-0400',
    updatedAt: null,
  },
]

export default { threads, comments }
