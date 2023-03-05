import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GraphqlService } from './services/graphql/graphql.service';
import { InterpreterService } from './services/interpreter/interpreter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private _fb: FormBuilder,
     private _graphqlService: GraphqlService,
     private _interpreterService: InterpreterService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this._fb.group({
      query: ['']
    })
  }

  async sendQuery() {
    // this.result = await this.getFromGraphQL(this.form.get('query')?.value)
    this.result = await this.getFromInterpreter(this.form.get('query')?.value);
  }

  async getFromGraphQL(query: string) {
    return await this._graphqlService.query(query);
  }

  async getFromInterpreter(query: string) {
    return await this._interpreterService.query(query);
  }

  result = 'Type a query!';
}
