// Check if device is mobile
function isMobile() {
  return screen.width < 992 ? true : false;
}

//
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
