import express from "express";
import cors from "cors";
import needle from "needle";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/interpreter", (req, res, next) => {
  let query = req.body.query;

  let data = {query: '{' + query + '}'};

  needle.post('http://localhost:4001/db', data, (error, response, body) => {
    res.send({data: body.data[query]})
  })
});

app.listen(PORT);
console.log(`Running interpreter.js at http://localhost:${PORT}/interpreter'`);