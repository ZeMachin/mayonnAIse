import { Component, Input } from '@angular/core';
import { CategoryProperty } from 'src/model/category.model';

@Component({
  selector: 'app-linear-histogram',
  templateUrl: './linear-histogram.component.html',
  styleUrls: ['./linear-histogram.component.less']
})
export class LinearHistogramComponent {
  @Input() property!: CategoryProperty;
  @Input() data!: any;
}
