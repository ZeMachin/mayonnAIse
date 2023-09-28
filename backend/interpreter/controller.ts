import { Request, Response, NextFunction } from 'express';
import needle from "needle";
import { Category, CategoryProperty } from './model/category.model';
import { CATEGORIES } from './data/categories';
import { DTO } from './model/dto.model';
import * as tf from './tensorflow/tf';

const interpreter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('interpreter()');
    // console.log('body:', util.inspect(req.body))
    console.log('query:', req.body.query)
  
    const originalQuery: string = req.body.query;
  
    const chosenCategory: Category = predictCategory(originalQuery);
    const chosenProperty: CategoryProperty = predictProperty(chosenCategory, originalQuery);
  
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
  } catch (err: any) {
    console.error('err:', err)
    res.status(500).send(`error: ${err}`)
  }
}

const predictCategory = (query: string): Category => {
  return tf.predictCategory(query);
}

const predictProperty = (category: Category, query: string): CategoryProperty => {
  return tf.predictProperty(category, query);
}

const test = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('interpreter()');
    // console.log('body:', util.inspect(req.body))
    console.log('query:', req.body.query)
  
    const originalQuery: string = req.body.query;
    const pickedData = originalQuery.split(' ');
  
    const chosenCategory: Category = CATEGORIES[parseInt(pickedData[0])];
    const chosenProperty: CategoryProperty = chosenCategory.properties[(parseInt(pickedData[1]))];
  
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
  } catch (err: any) {
    console.error('err:', err)
    res.status(500).send(`error: ${err}`)
  }
}

export default { interpreter, test }