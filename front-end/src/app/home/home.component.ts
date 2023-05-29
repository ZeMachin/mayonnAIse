import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InterpreterService } from '../services/interpreter/interpreter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  form: FormGroup = new FormGroup({});

  constructor(private _fb: FormBuilder,
     private _interpreterService: InterpreterService,
     private _router: Router) {}

  ngOnInit(): void {
    this.createForm();
    this.sendQuery('1 4');
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
