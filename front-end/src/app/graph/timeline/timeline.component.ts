import { Component, Input } from '@angular/core';
import { CategoryProperty } from 'src/model/category.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less']
})
export class TimelineComponent {
  @Input() property!: CategoryProperty;
  @Input() data!: any;
}
