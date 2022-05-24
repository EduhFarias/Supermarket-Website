window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(231,233,237)',
};

var color = Chart.helpers.color;
var config = {
  type: 'radar',
  data: {
    labels: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
        borderColor: window.chartColors.red,
        pointBackgroundColor: window.chartColors.red,
        data: [8, 1, 5, 2, 4, 10, 0, 0, 3, 9, 2, 5],
        notes: [
          'I am pretty happy',
          'I am isolated',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
        ],
      },
      {
        label: 'My Second dataset',
        backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
        borderColor: window.chartColors.blue,
        pointBackgroundColor: window.chartColors.blue,
        data: [10, 3, 4, 3, 5, 8, 7, 8, 9, 3, 1, 2],
        notes: [
          'I am pretty happy',
          'I am isolated',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
        ],
      },
      {
        label: 'My Third dataset',
        backgroundColor: color(window.chartColors.purple).alpha(0.2).rgbString(),
        borderColor: window.chartColors.purple,
        pointBackgroundColor: window.chartColors.purple,
        data: [0, 0, 1, 0, 0, 1, 0, 1, 2, 6, 1, 2],
        notes: [
          'I am pretty happy',
          'I am isolated',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
          'none',
        ],
      },
    ],
  },
  options: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Outcome Graph',
    },
    scale: {
      ticks: {
        beginAtZero: true,
      },
    },
    tooltips: {
      enabled: false,
      callbacks: {
        label: function (tooltipItem, data) {
          var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
          //This will be the tooltip.body
          return (
            datasetLabel +
            ': ' +
            tooltipItem.yLabel +
            ': ' +
            data.datasets[tooltipItem.datasetIndex].notes[tooltipItem.index]
          );
        },
      },
      custom: function (tooltip) {
        // Tooltip Element
        var tooltipEl = document.getElementById('chartjs-tooltip');
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }
        // Hide if no tooltip
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }
        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltip.yAlign) {
          tooltipEl.classList.add(tooltip.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }
        function getBody(bodyItem) {
          return bodyItem.lines;
        }
        // Set Text
        if (tooltip.body) {
          var titleLines = tooltip.title || [];
          var bodyLines = tooltip.body.map(getBody);
          var innerHtml = '<thead>';
          titleLines.forEach(function (title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
          });
          innerHtml += '</thead><tbody>';
          bodyLines.forEach(function (body, i) {
            var colors = tooltip.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
            innerHtml += '<tr><td>' + span + body + '</td></tr>';
          });
          innerHtml += '</tbody>';
          var tableRoot = tooltipEl.querySelector('table');
          tableRoot.innerHTML = innerHtml;
        }
        var position = this._chart.canvas.getBoundingClientRect();
        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = position.left + tooltip.caretX + 'px';
        tooltipEl.style.top = position.top + tooltip.caretY + 'px';
        tooltipEl.style.fontFamily = tooltip._fontFamily;
        tooltipEl.style.fontSize = tooltip.fontSize;
        tooltipEl.style.fontStyle = tooltip._fontStyle;
        tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
      },
    },
  },
};
window.onload = function () {
  window.myRadar = new Chart(document.getElementById('canvas'), config);
};
var colorNames = Object.keys(window.chartColors);
