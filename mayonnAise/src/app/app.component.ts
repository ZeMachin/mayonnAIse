import { Component, OnInit } from '@angular/core';
import { GraphqlService } from './services/graphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  constructor(private _graphqlService: GraphqlService) {}

  ngOnInit(): void {
    this.retrieveTitle();
  }

  async retrieveTitle() {
    this.title = await this._graphqlService.name;
  }

  title = 'before title';
}
