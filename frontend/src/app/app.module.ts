import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { GraphComponent } from './graph/graph.component';
import { HomeComponent } from './home/home.component';
import { BarChartComponent } from './graph/bar-chart/bar-chart.component';
import { TimelineComponent } from './graph/timeline/timeline.component';
import { PieChartComponent } from './graph/pie-chart/pie-chart.component';
import { LinearHistogramComponent } from './graph/linear-histogram/linear-histogram.component';
import { LogarithmicHistogramComponent } from './graph/logarithmic-histogram/logarithmic-histogram.component';

@NgModule({
  declarations: [AppComponent, GraphComponent, HomeComponent, BarChartComponent, TimelineComponent, PieChartComponent, LinearHistogramComponent, LogarithmicHistogramComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
