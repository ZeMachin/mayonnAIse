import { Request, Response, NextFunction } from 'express';
import needle from "needle";

const interpreter = async (req: Request, res: Response, next: NextFunction) => {
    console.log('interpreter()');
    let query = req.body.query; // vente de tshirt 2022
  
    let itemName = 'tshirt';
    let action = 'sales';
    let period = '2022';
  
    let data = {query: '{' + query + '}'};
  
    needle.post('http://localhost:4001/db', data, (error, response, body) => {
      res.send({data: body.data[query]})
    })
}

export default { interpreter }