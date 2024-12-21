import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-net-worth-trend-card',
  imports: [MatCardModule],
  templateUrl: './net-worth-trend-card.component.html',
  styleUrl: './net-worth-trend-card.component.scss',
})
export class NetWorthTrendCardComponent implements OnInit {
  chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'line',

      data: {
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
          '2022-05-17',
        ],
        datasets: [
          {
            label: 'Wartosc netto',
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: 'orange',
            pointRadius: 4,
            pointHoverRadius: 8,
            borderWidth: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed.y;
                return `${value.toFixed(2)} PLN`;
              },
            },
          },
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => {
                return `${value} PLN`;
              },
            },
          },
        },
      },
    });
  }
}
