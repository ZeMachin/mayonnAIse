import { Component, Input } from '@angular/core';
import { CategoryProperty } from 'src/model/category.model';

import * as d3 from 'd3';

@Component({
  selector: 'app-logarithmic-histogram',
  templateUrl: './logarithmic-histogram.component.html',
  styleUrls: ['./logarithmic-histogram.component.less']
})
export class LogarithmicHistogramComponent {
  @Input() property!: CategoryProperty;
  @Input() data!: any;

  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  ngOnInit(): void {
    this.drawLogarithmicHistogram();
  }

  private drawLogarithmicHistogram() {
    this.createSvg();
    this.drawBars();
  }

  private createSvg(): void {
    this.svg = d3.select("figure#log-histo")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(): void {
    const binNumber: number = 50;
    const propertyData: number[] = this.data.map((d: any) => d[this.property.name]).filter((v: number) => !!v);
    const xDomain = [Math.min(...propertyData), Math.max(...propertyData)];

    // Create the X-axis band scale
    const x = d3.scaleLog()
    .domain([xDomain[0], xDomain[1]])
    .range([0, this.width]);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // set the parameters for the histogram
    const histogram = d3.bin()
      .value((d) => d)  // I need to give the vector of value
      .domain([xDomain[0], xDomain[1]])  // then the domain of the graphic
      .thresholds(x.ticks(binNumber)); // then the numbers of bins

    // And apply this function to data to get the bins
    const bins = histogram(propertyData);

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .range([this.height, 0]);

    y.domain([0, d3.max(bins, (d: any) => d.length)]);   // d3.hist has to be called before the Y axis obviously

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", 1)
    .attr("transform", (d: any) => "translate(" + x(d.x0) + "," + y(d.length) + ")")
    .attr("width", (d: any) => x(d.x1) - x(d.x0))
    .attr("height", (d: any) => this.height - y(d.length))
    .style("fill", "#69b3a2")
  }
}