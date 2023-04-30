import express from "express";
import cors from "cors";
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

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
  constructor({type}: {type: string}) {
    this.type = type;
  }

  type: string

  sales({year}: {year: number}) {
    const type = this.type!;
    return new Sales({year, type});
  }
}

class Sales {
  constructor({year, type}: {year: number, type: string}) {}

  january: number = 2
  february: number = 3
  march: number = 1
  april: number = 4
  may: number = 5
  june: number = 6
  july: number = 7
  august: number = 11
  september: number = 8
  october: number = 10
  november: number = 9
  december: number = 12
}

app.use("/db", graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT);
console.log(
  `Running a GraphQL API server at http://localhost:${PORT}/db'`
);
