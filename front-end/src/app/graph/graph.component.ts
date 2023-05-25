import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, CategoryProperty, ChartType } from 'src/model/category.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less']
})
export class GraphComponent implements OnInit {
  title?: string;
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
      this.title = history.state['data'].title;
      this.chart = history.state['data'].chart;
      this.category = history.state['data'].category;
      this.property = history.state['data'].property;
      this.data = history.state['data'].data[this.category!.root][this.category!.firstNode];
      console.log('data:', this.data);
      // console.log('title:', this.title);
      // console.log('chart:', this.chart);
      // console.log('category:', this.category);
      // console.log('property:', this.property);
    }
  }
}
