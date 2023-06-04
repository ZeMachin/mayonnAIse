import { Category, CategoryProperty, ChartType } from "./category.model";

export interface DTO {
    data: any;
    chart: ChartType;
    title: string;
    category: Category;
    property: CategoryProperty;
    query: string;
}