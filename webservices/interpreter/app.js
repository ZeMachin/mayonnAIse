import express from "express";
import cors from "cors";
import needle from "needle";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/interpreter", (req, res, next) => {
  console.log("req.body:", req.body);
  // console.log("res:", res);

  let data = {message: 'message from interpreter to db'}
  needle.post('http://localhost:4001/db', data, (error, response, body) => {
    console.log('db response:', body);
    res.send(body)
  })
  needle.post()
  // res.send({data: 'message back from interpreter to sender'})
});



app.listen(PORT);
console.log(`Running interpreter.js at http://localhost:${PORT}/interpreter'`);
