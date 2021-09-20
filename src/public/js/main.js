const map=L.map('map-template').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
///https://www.youtube.com/watch?v=Zy89Nj7tNNM
//33.29



// Geolocation
map.locate({enableHighAccuracy: true})
map.on('locationfound', (e) => {
  const marker=L.marker([e.latlng.lat,e.latlng.lng],13).bindPopup('Aqui estas Tu Men')
  marker.addTo(map)
});


