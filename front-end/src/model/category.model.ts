export interface Category {
    root: string;
    firstNode: string;
    properties: CategoryProperty[];
  }
  
  export interface CategoryProperty {
    name: string;
    request?: string;
    chart: ChartType;
  }
  
  export enum ChartType {
    barChart,
    timeline,
    pieChart,
    linearHistogram,
    logarithmicHistogram
  }