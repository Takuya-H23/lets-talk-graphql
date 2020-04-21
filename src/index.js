import { GraphQLServer } from 'graphql-yoga'
import resolvers from './resolvers'
import prisma from './prisma'
import db from './db'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context() {
    return { db, prisma }
  },
})
server.start(() => console.log('Server is up!'))
