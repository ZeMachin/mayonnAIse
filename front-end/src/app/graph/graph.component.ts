import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less']
})
export class GraphComponent implements OnInit {
  data: string = 'init';

  constructor(
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.data = history.state['data'];
  }
}
