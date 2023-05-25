import { Component, Input } from '@angular/core';
import { CategoryProperty } from 'src/model/category.model';

@Component({
  selector: 'app-logarithmic-histogram',
  templateUrl: './logarithmic-histogram.component.html',
  styleUrls: ['./logarithmic-histogram.component.less']
})
export class LogarithmicHistogramComponent {
  @Input() property!: CategoryProperty;
  @Input() data!: any;
}
