import { Request, Response, NextFunction } from 'express';
import needle from "needle";
import { Category, CategoryProperty } from './model/category.model';
import { CATEGORIES } from './data/categories';

const interpreter = async (req: Request, res: Response, next: NextFunction) => {
  console.log('interpreter()');
  // let query = req.body.query;
  // console.log('query:', query)

  const chosenCategory: Category = pickCategory();
  const chosenProperty: CategoryProperty = pickProperty(chosenCategory);

  const query = `
      query Query {
        ${chosenCategory.root} {
          ${chosenCategory.firstNode} {
            ${chosenCategory.firstNode === 'films' ? 'title' : 'name'}
            ${chosenProperty.name}
          }
        }
      }
    `

  const data = { query: query };

  needle.post('https://swapi-graphql.netlify.app/.netlify/functions/index', data, (error, response, body) => {
    console.log('response:', response.body)
    if (body?.data) res.send({ data: body.data })
    else res.send('error')
  })
}

const pickCategory = (): Category => {
  const randomIndex = Math.floor(Math.random() * CATEGORIES.length);
  return CATEGORIES[randomIndex];
}

const pickProperty = (category: Category): CategoryProperty => {
  const randomIndex = Math.floor(Math.random() * category.properties.length);
  return category.properties[randomIndex];
}

export default { interpreter }