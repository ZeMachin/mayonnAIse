import { Request, Response, NextFunction } from 'express';
import needle from "needle";

const interpreter = async (req: Request, res: Response, next: NextFunction) => {
    console.log('interpreter()');
    // let query = req.body.query; // vente de tshirt 2022
    // console.log('query:', query)
  
    const itemName = 'tshirt';
    const action = 'sales';
    const period = '2022';

    const query = `{
      ${itemName} {
        ${action}${(period ? `(year: ${period})` : '')} {
          january
          february
          march
          april
          may
          june
          july
          august
          september
          october
          november
          december
        }
      }
    }`
  
    const data = {query: query};
  
    needle.post('http://localhost:4001/db', data, (error, response, body) => {
      console.log('response:', response.body)
      if(body?.data) res.send({data: body.data})
      else res.send('error')
    })
}

export default { interpreter }