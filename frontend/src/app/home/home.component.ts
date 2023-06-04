import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InterpreterService } from '../services/interpreter/interpreter.service';
import { CategoryProperty } from 'src/model/category.model';
import { CATEGORIES } from '../data/categories';
import { MatSelectChange } from '@angular/material/select';
import { ChartType } from 'src/model/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  form: FormGroup = new FormGroup({});
  selectedProperty?: CategoryProperty;
  categories = CATEGORIES;
  allCharts = ChartType;

  constructor(private _fb: FormBuilder,
     private _interpreterService: InterpreterService,
     private _router: Router) {}

  ngOnInit(): void {
    this.createForm();
    // this.sendQuery('1 4'); // for test purposes
  }

  onSelectChange(event: MatSelectChange) {
    console.log('event:', event);
    this.sendQuery(event.value);
  }

  createForm() {
    this.form = this._fb.group({
      query: ['']
    })
  }

  async sendQuery(testQuery?: string) {
    const query: string = testQuery ?? this.form.get('query')?.value;
    this.result = await this.getFromInterpreter(query);
    this._router.navigate(['/graph'], { state: { data: this.result }});
  }

  async getFromInterpreter(query: string) {
    return await this._interpreterService.query(query);
  }

  result = 'Type a query!';

}
