import { GraphQLServer } from 'graphql-yoga'
import resolvers from './resolvers'
import db from './db'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context() {
    return { db }
  },
})
server.start(() => console.log('Server is up!'))
