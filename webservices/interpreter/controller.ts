import { Request, Response, NextFunction } from 'express';
import needle from "needle";
import { Category, CategoryProperty } from './model/category.model';
import { CATEGORIES } from './data/categories';

const interpreter = async (req: Request, res: Response, next: NextFunction) => {
  console.log('interpreter()');
  console.log('query:', req.body.query)

  const pickedData = req.body.query.split(' ');

  const chosenCategory: Category = pickCategory(parseInt(pickedData[0]));
  const chosenProperty: CategoryProperty = pickProperty(chosenCategory, parseInt(pickedData[1]));

  const query = `
      query Query {
        ${chosenCategory.root} {
          ${chosenCategory.firstNode} {
            ${chosenCategory.firstNode === 'films' ? 'title' : 'name'}
            ${chosenProperty.request}
          }
        }
      }
    `

  const data = { query: query };

  needle.post('https://swapi-graphql.netlify.app/.netlify/functions/index', data, (error, response, body) => {
    console.log('response:', response.body)
    // if (body?.data) res.send({ data: body.data, chart: chosenProperty.chart, title: req.body.query })
    if (body?.data) res.send({ data: body.data, chart: chosenProperty.chart, title: `${chosenCategory.firstNode} ${chosenProperty.name}`, category: chosenCategory, property: chosenProperty  })
    else res.send('error')
  })
}

const pickCategory = (idx?: number): Category => {
  return CATEGORIES[idx ?? Math.floor(Math.random() * CATEGORIES.length)];
}

const pickProperty = (category: Category, idx?: number): CategoryProperty => {
  return category.properties[idx ?? Math.floor(Math.random() * category.properties.length)];
}

export default { interpreter }