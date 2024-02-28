import { abbreviateDate } from './../utils/abbreviateDate';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Chart from 'chart.js/auto';
import { WeatherApiService } from '../services/weather-api.service';
import { Period, WeatherResponse } from '../models/weather.interface';
import { ChartDataSet } from '../models/chartData.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  location: string = '';
  forecastData: Period[] = [];
  chartData: ChartDataSet[] = [];
  chartLabels: string[] = [];
  public weatherChart: any;
  public ctx: any;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherApiService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.location = this.route.snapshot.paramMap.get('location') || '';
    this.ctx = this.elementRef.nativeElement.querySelector('#chartCanvas');
    this.loadData();
  }

  loadData(): void {
    this.weatherService
      .getForecast(this.location)
      .subscribe((data: WeatherResponse) => {
        this.forecastData = data.properties.periods;
        console.log(this.forecastData);
        const dayTimePeriod = this.forecastData.filter(
          (period: Period) => period.isDaytime
        );
        const nightTimePeriod = this.forecastData.filter(
          (period: Period) => !period.isDaytime
        );
        this.chartData = [
          {
            label: 'Day Time',
            data: dayTimePeriod.map((period: Period) => period.temperature),
            fill: false,
            tension: 0.5,
          },
          {
            label: 'Night Time',
            fill: true,
            tension: 0.5,
            data: nightTimePeriod.map((period: Period) => period.temperature),
          },
        ];
        this.chartLabels = dayTimePeriod.map((period: Period) =>
          abbreviateDate(period.startTime)
        );
        this.renderChart();
      });
  }

  renderChart() {
    this.weatherChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: this.chartData,
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
      },
    });
  }
}
