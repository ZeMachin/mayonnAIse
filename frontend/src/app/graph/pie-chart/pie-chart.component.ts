import { Component, Input } from '@angular/core';
import { CategoryProperty } from 'src/model/category.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.less']
})
export class PieChartComponent {
  @Input() property!: CategoryProperty;
  @Input() data!: any;
}
