import express from "express";
import cors from "cors";
import { graphql, buildSchema } from "graphql";

const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Schema
const typeDefs = `
type Query {
  whatami: String,
  whatsmyname: String,
  something: String
}`;

const resolverRoot = {
  whatami: () => "An application?",
  whatsmyname: () => "MayonnAIse!",
  something: () => "Something",
};

const schema = buildSchema(`
type Query {
  whatami: String,
  whatsmyname: String,
  something: String
}`);

app.use("/db", (req, res, next) => {
  let query = req.body.query;
  graphql(schema, query, resolverRoot).then((response) => {
    res.send(response);
  });
});

app.listen(PORT);
console.log(
  `Running a GraphQL API server at http://localhost:${PORT}/graphql'`
);
