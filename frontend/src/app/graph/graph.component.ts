import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, CategoryProperty, ChartType } from 'src/model/category.model';
import { DTO } from 'src/model/dto.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less']
})
export class GraphComponent implements OnInit {
  title?: string;
  query?: string;
  category!: Category;
  property!: CategoryProperty;
  data: any = {};
  chart?: ChartType;

  allChartTypes = ChartType;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (!history.state['data']) this._router.navigate(['/home']);
    else {
      const dto: DTO = history.state['data'];
      this.title = dto.title;
      this.chart = dto.chart;
      this.query = dto.query;
      this.category = dto.category;
      this.property = dto.property;
      this.data = dto.data[this.category!.root][this.category!.firstNode];
      console.log('data:', this.data);
      // console.log('title:', this.title);
      // console.log('chart:', this.chart);
      // console.log('category:', this.category);
      // console.log('property:', this.property);
    }
  }
}
