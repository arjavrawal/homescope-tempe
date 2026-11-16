const map = L.map("map").setView([33.372, -111.9279], 12);

const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(map);

L.control
  .scale({
    imperial: true,
    metric: false,
  })
  .addTo(map);

document.querySelector("#map-status").textContent =
  "Explore Tempe. Housing and amenity layers will be loaded next.";
