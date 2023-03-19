import express from "express";
import cors from "cors";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

// const root = {
//   whatami: () => "An application?",
//   whatsmyname: () => "MayonnAIse!",
//   something: () => "Something",
// };

// const schema = buildSchema(`
// type Query {
//   whatami: String,
//   whatsmyname: String,
//   something: String
// }`);

const root = {
  tshirt: () => new Item({type: 'tshirt'})
};

const schema = buildSchema(`
type Query {
  tshirt: Item
}

type Item {
  sales(year: Int): Sales
}

type Sales {
  january: Int
  february: Int
  march: Int
  april: Int
  may: Int
  june: Int
  july: Int
  august: Int
  september: Int
  october: Int
  november: Int
  december: Int
}`);

class Item {
  constructor({type}) {
    this.type = type;
  }

  type

  sales({year}) {
    return new Sales({year, type})
  }
}

class Sales {
  constructor()
}

// app.use("/db", (req, res, next) => {
//   let query = req.body.query;
//   graphql(schema, query, root).then((response) => {
//     res.send(response);
//   });
// });

app.use("/db", graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT);
console.log(
  `Running a GraphQL API server at http://localhost:${PORT}/db'`
);
