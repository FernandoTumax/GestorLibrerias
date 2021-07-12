import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart-report',
  templateUrl: './pie-chart-report.component.html',
  styleUrls: ['./pie-chart-report.component.css']
})
export class PieChartReportComponent implements OnInit {

  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';

  constructor() { }

  ngOnInit(): void {
  }

}
