function showCharts() {
  document.getElementById('main-div').innerHTML =
    '<h2 style="color: var(--secondary-color)">Gráfico de desempenho</h2>' +
    '<div id="chart" style="margin: 0 auto">' +
    '<canvas id="canvas-radar"></canvas>' +
    '</div>' +
    '<div id="chart" style="margin: 0 auto">' +
    '<canvas id="canvas-bar"></canvas>' +
    '</div>';
  setupCharts();
}

function manageProducts() {
  document.getElementById('main-div').innerHTML = 'manage products';
}

function manageUsers() {
  document.getElementById('main-div').innerHTML = 'manage users';
}

function manageProviders() {
  document.getElementById('main-div').innerHTML = 'manage providers';
}
