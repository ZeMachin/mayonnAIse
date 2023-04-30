import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less']
})
export class GraphComponent implements OnInit {
  item: string = '';
  action: string = '';
  private data: any = {};

  private keys: string[] = [];
  private values: number[] = [];
  private d: { month: string, value: number }[] = [];

  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.data = history.state['data'];
    if(!this.data) this._router.navigate(['/home']);
    else {
      this.item = Object.keys(this.data)[0];
      this.action = Object.keys(this.data[this.item])[0];
      this.keys = Object.keys(this.data[this.item][this.action]);
      this.values = Object.values(this.data[this.item][this.action]);
      this.d = this.keys.map((k, i) => { return { month: k, value: this.values[i] } })
      this.createSvg();
      this.drawBars();
    }
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(this.keys) // needs string[]
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, Math.max(...this.values)])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(this.d)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.month))
      .attr("y", (d: any) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.value))
      .attr("fill", "#d04a35");
  }
}
