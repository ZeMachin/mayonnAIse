import { Request, Response, NextFunction } from 'express';
import needle from "needle";
import { Category, CategoryProperty } from './model/category.model';
import { CATEGORIES } from './data/categories';
import { DTO } from './model/dto.model';

const interpreter = async (req: Request, res: Response, next: NextFunction) => {
  console.log('interpreter()');
  console.log('query:', req.body.query)

  const originalQuery: string = req.body.query;
  const pickedData = originalQuery.split(' ');

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
    if (body?.data) {
      const dto: DTO = { data: body.data, chart: chosenProperty.chart, title: `${chosenCategory.firstNode} ${chosenProperty.name}`, category: chosenCategory, property: chosenProperty, query: originalQuery }
      res.send(dto);
    }
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