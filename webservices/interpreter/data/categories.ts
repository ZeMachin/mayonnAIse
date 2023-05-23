import { Category, ChartType } from "../model/category.model";

export const CATEGORIES: Category[] = [{
    root: 'allFilms',
    firstNode: 'films',
    properties: [{
      name: 'charactersCount',
      request: 'characterConnection  { totalCount } ',
      chart: ChartType.barChart
    },
    {
      name: 'planetsCount',
      request: 'planetConnection  { totalCount }',
      chart: ChartType.barChart
    },
    {
      name: 'speciesCount',
      request: 'speciesConnection  { totalCount }',
      chart: ChartType.barChart
    },
    {
      name: 'starshipsCount',
      request: 'starshipConnection  { totalCount }',
      chart: ChartType.barChart
    },
    {
      name: 'vehiclesCount',
      request: 'vehicleConnection  { totalCount }',
      chart: ChartType.barChart
    },
    {
      name: 'releaseDate',
      request: 'releaseDate',
      chart: ChartType.timeline
    },
    {
      name: 'producers',
      request: 'producers',
      chart: ChartType.barChart
    },
    {
      name: 'openingCrawl',
      request: 'openingCrawl',
      chart: ChartType.barChart
    },]
  }, {
    root: 'allPeople',
    firstNode: 'people',
    properties: [
      {
        name: 'birthYear',
        request: 'birthYear',
        chart: ChartType.timeline
      },
      {
        name: 'birthYear',
        request: 'birthYear',
        chart: ChartType.pieChart // ABY | BBY
      },
      {
        name: 'eyeColor',
        request: 'eyeColor',
        chart: ChartType.barChart
      },
      {
        name: 'gender',
        request: 'gender',
        chart: ChartType.barChart
      },
      {
        name: 'height',
        request: 'height',
        chart: ChartType.linearHistogram
      },
      {
        name: 'mass',
        request: 'mass',
        chart: ChartType.linearHistogram
      },
      {
        name: 'openingCrawl',
        request: 'openingCrawl',
        chart: ChartType.barChart
      },
      {
        name: 'skinColor',
        request: 'skinColor',
        chart: ChartType.barChart
      },
      {
        name: 'species',
        request: 'species',
        chart: ChartType.barChart
      },
      {
        name: 'openingCrawl',
        request: 'openingCrawl',
        chart: ChartType.barChart
      },
      {
        name: 'filmsCount',
        request: 'filmConnection  { totalCount }',
        chart: ChartType.barChart
      },
      {
        name: 'starshipsCount',
        request: 'starshipConnection  { totalCount }',
        chart: ChartType.barChart
      },
      {
        name: 'vehiclesCount',
        request: 'vehicleConnection  { totalCount }',
        chart: ChartType.barChart
      },]
  }, {
    root: 'allPlanets',
    firstNode: 'planets',
    properties: [
        {
          name: 'climates',
          request: 'climates',
          chart: ChartType.barChart
        },
        {
          name: 'diameter',
          request: 'diameter',
          chart: ChartType.linearHistogram
        },
        {
          name: 'gravity',
          request: 'gravity',
          chart: ChartType.linearHistogram
        },
        {
          name: 'orbitalPeriod',
          request: 'orbitalPeriod',
          chart: ChartType.linearHistogram
        },
        {
          name: 'population',
          request: 'population',
          chart: ChartType.logarithmicHistogram
        },
        {
          name: 'rotationPeriod',
          request: 'rotationPeriod',
          chart: ChartType.linearHistogram
        },
        {
          name: 'surfaceWater',
          request: 'surfaceWater',
          chart: ChartType.linearHistogram
        },
        {
          name: 'terrains',
          request: 'terrains',
          chart: ChartType.barChart
        },
        {
          name: 'residentsCount',
          request: 'residentConnection  { totalCount }',
          chart: ChartType.barChart
        },
        {
          name: 'filmsCount',
          request: 'filmConnection  { totalCount }',
          chart: ChartType.barChart
        },]
  }, {
    root: 'allSpecies',
    firstNode: 'species',
    properties: [
        {
          name: 'averageHeight',
          request: 'averageHeight',
          chart: ChartType.linearHistogram
        },
        {
          name: 'averageLifespan',
          request: 'averageLifespan',
          chart: ChartType.linearHistogram
        },
        {
          name: 'classification',
          request: 'classification',
          chart: ChartType.barChart
        },
        {
          name: 'designation',
          request: 'designation',
          chart: ChartType.pieChart
        },
        {
          name: 'eyeColors',
          request: 'eyeColors',
          chart: ChartType.barChart
        },
        {
          name: 'hairColors',
          request: 'hairColors',
          chart: ChartType.barChart
        },
        {
          name: 'skinColors',
          request: 'skinColors',
          chart: ChartType.barChart
        },
        {
          name: 'filmsCount',
          request: 'filmConnection  { totalCount }',
          chart: ChartType.barChart
        },]
  }, {
    root: 'allStarships',
    firstNode: 'starships',
    properties: [
        {
          name: 'MGLT',
          request: 'MGLT',
          chart: ChartType.linearHistogram
        },
        {
          name: 'cargoCapacity',
          request: 'cargoCapacity',
          chart: ChartType.logarithmicHistogram
        },
        {
          name: 'costInCredits',
          request: 'costInCredits',
          chart: ChartType.logarithmicHistogram
        },
        {
          name: 'crew',
          request: 'crew',
          chart: ChartType.logarithmicHistogram
        },
        {
          name: 'hyperdriveRating',
          request: 'hyperdriveRating',
          chart: ChartType.barChart
        },
        {
          name: 'length',
          request: 'length',
          chart: ChartType.logarithmicHistogram
        },
        {
          name: 'maxAtmospheringSpeed',
          request: 'maxAtmospheringSpeed',
          chart: ChartType.linearHistogram
        },
        {
          name: 'passengers',
          request: 'passengers',
          chart: ChartType.logarithmicHistogram
        },
        {
          name: 'starshipClass',
          request: 'starshipClass',
          chart: ChartType.barChart
        },
        {
          name: 'filmsCount',
          request: 'filmConnection  { totalCount }',
          chart: ChartType.barChart
        },]
  }, {
    root: 'allVehicles',
    firstNode: 'vehicles',
    properties: [
        {
          name: 'cargoCapacity',
          request: 'cargoCapacity',
          chart: ChartType.logarithmicHistogram
        },
        {
          name: 'costInCredits',
          request: 'costInCredits',
          chart: ChartType.logarithmicHistogram
        },
        {
          name: 'crew',
          request: 'crew',
          chart: ChartType.logarithmicHistogram
        },
        {
          name: 'hyperdriveRating',
          request: 'hyperdriveRating',
          chart: ChartType.barChart
        },
        {
          name: 'length',
          request: 'length',
          chart: ChartType.logarithmicHistogram
        },
        {
          name: 'maxAtmospheringSpeed',
          request: 'maxAtmospheringSpeed',
          chart: ChartType.linearHistogram
        },
        {
          name: 'passengers',
          request: 'passengers',
          chart: ChartType.logarithmicHistogram
        },
        {
          name: 'starshipClass',
          request: 'starshipClass',
          chart: ChartType.barChart
        },
        {
          name: 'filmsCount',
          request: 'filmConnection  { totalCount }',
          chart: ChartType.barChart
        },]
  },]
  