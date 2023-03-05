import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphqlService } from './services/graphql/graphql.service';
import { InterpreterService } from './services/interpreter/interpreter.service';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
  providers: [GraphqlService, InterpreterService]
})
export class AppRoutingModule { }
