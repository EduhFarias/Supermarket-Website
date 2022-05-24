// Check if device is mobile
function isMobile() {
  return screen.width < 992 ? true : false;
}

// Set map and initial position
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-35.7805, -9.557]),
    zoom: 16,
  }),
});

function generateRadarChart() {
  // Set up
  var margin = { top: 100, right: 100, bottom: 100, left: 100 },
    legendPosition = { x: 25, y: 25 },
    width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

  // Data
  var data = [
    [
      //iPhone
      { axis: 'Janeiro', value: 0.22 },
      { axis: 'Feveiro', value: 0.28 },
      { axis: 'Março', value: 0.29 },
      { axis: 'Abril', value: 0.17 },
      { axis: 'Maio', value: 0.22 },
      { axis: 'Junho', value: 0.02 },
      { axis: 'Julho', value: 0.21 },
      { axis: 'Agosto', value: 0.5 },
      { axis: 'Setembro', value: 0.22 },
      { axis: 'Outubro', value: 0.02 },
      { axis: 'Novembro', value: 0.21 },
      { axis: 'Dezembro', value: 0.6 },
    ],
    [
      //Samsung
      { axis: 'Battery Life', value: 0.27 },
      { axis: 'Brand', value: 0.16 },
      { axis: 'Contract Cost', value: 0.35 },
      { axis: 'Design And Quality', value: 0.13 },
      { axis: 'Have Internet Connectivity', value: 0.2 },
      { axis: 'Large Screen', value: 0.13 },
      { axis: 'Price Of Device', value: 0.35 },
      { axis: 'To Be A Smartphone', value: 0.38 },
      { axis: 'teste1', value: 0.12 },
      { axis: 'teste2', value: 0.22 },
      { axis: 'teste3', value: 0.01 },
      { axis: 'teste4', value: 0.1 },
    ],
  ];

  // Set colors
  var color = d3.scale.ordinal().range(['#EDC951', '#CC333F', '#00A0B0']);

  // Draw chart
  var radarChartOptions = {
    w: width,
    h: height,
    margin: margin,
    legendPosition: legendPosition,
    maxValue: 0.5,
    levels: 5,
    roundStrokes: true,
    color: color,
  };
  //Call function to draw the Radar chart
  RadarChart('.radarChart', data, radarChartOptions);
}
