export interface Category {
  name: string;
  root: string;
  firstNode: string;
  properties: CategoryProperty[];
}

export interface CategoryProperty {
  name: string;
  request?: string;
  chart: ChartType;
  isCount?: boolean;
}

export enum ChartType {
  barChart,
  timeline,
  pieChart,
  linearHistogram,
  logarithmicHistogram
}