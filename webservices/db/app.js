import express from 'express';
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema'
import bodyParser from 'body-parser';
import { root } from './index.js';

const app = express();
const PORT = 4001;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// In-memory data store
const data = {
  whatami: "An application?",
  whatsmyname: "MayonnAIse!",
  something: "Something"
}

// Schema
const typeDefs = `
type Query {
  whatami: String,
  whatsmyname: String,
  something: String
}`

// Resolver for warriors
const resolvers = {
  Query: {
    whatami: (obj, args, context) => context.whatami,
    whatsmyname: (obj, args, context) => context.whatsmyname,
    something: (obj, args, context) => context.something,
  },
}

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

app.use('/graphql', graphqlHTTP({
  schema: executableSchema,
  // rootValue: root,
  context: data,
  graphiql: true,
}));

app.use('/db', (req, res, next) => {
  console.log("req.body:", req.body);
  res.send({data: 'message back from db to sender'})
});

app.listen(PORT);
console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql'`);