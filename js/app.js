const map = L.map("map").setView([33.372, -111.9279], 12);

const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(map);
const usgs = L.tileLayer.wms(
    "https://basemap.nationalmap.gov/arcgis/services/" + "USGSTopo/MapServer/WMSServer", {
        layers: "0", format: "image/png", attribution: "USGS The National Map"
    }
);
const basemaps = {"OpenStreetMap": osm, "USGS Topo": usgs};
L.control.layers(basemaps, null, {position: "topleft"}).addTo(map);

L.control.scale({imperial: true, metric: false,}).addTo(map);

map.on("click", e => console.log(e.latlng.lat.toFixed(5), e.latlng.lng.toFixed(5)));
map.on("moveend", () => console.log("zoom", map.getZoom()));

const plainStyle = { radius: 6, color: "white", weight: 1, fillColor: "#d95f02", fillOpacity: 0.9 };
const selectedStyle = { radius: 9, color: "#8c1d40", weight: 3, fillColor: "#ffc627", fillOpacity: 1 };
const selectedText = document.querySelector("#selected");
let current = null;

function highlight(layer, on) {
    if (layer.setStyle) layer.setStyle(on ? selectedStyle : plainStyle);
    else layer.setIcon(on ? waterIconBig : waterIcon);
}

// Cooling centers and hydration stations share one file, so each layer keeps only its own kind
function siteLayer(kind) {
    return L.geoJSON(null, {
        filter: f => f.properties.kind == kind,
        pointToLayer: (f, latlng) => kind == "Hydration Station"
            ? L.marker(latlng, {icon: waterIcon})
            : L.circleMarker(latlng, plainStyle),
        onEachFeature: (f, layer) => {
            const p = f.properties;
            layer.bindPopup(`${p.name}<br>${p.city}<br>Wheelchair: ${p.wheelchair ?? "not reported"}`);
            layer.on("click", e => {
                if (current) highlight(current, false);
                current = layer;
                highlight(layer, true);
                selectedText.textContent = `${p.name} (${p.kind}, ${p.city})`;
                L.DomEvent.stopPropagation(e);
            });
        }
    });
}

map.on("click", () => {
    if (current) highlight(current, false);
    current = null;
    selectedText.textContent = "";
});

const transit = L.geoJSON(null, {
    pointToLayer: (f, latlng) => L.circleMarker(latlng, {radius: 4, color: "#333", weight: 1, fillColor: "#ffffff", fillOpacity: 1}),
    onEachFeature: (f, layer) => layer.bindTooltip(f.properties.name)
});

const parks = L.geoJSON(null, {
    polygonToLayer: (f, latlng) => L.polygon(latlng, {radius: 4, color: "#333", weight: 1, fillColor: "#ffffff", fillOpacity: 1}),
    onEachFeature: (f, layer) => layer.bindTooltip(f.properties.name)
});

const healthcare = L.geoJSON(null, {
    pointToLayer: (f, latlng) => L.circleMarker(latlng, {radius: 4, color: "#333", weight: 1, fillColor: "#ffffff", fillOpacity: 1}),
    onEachFeature: (f, layer) => layer.bindTooltip(f.properties.name)
});

const schools = L.geoJSON(null, {
    pointToLayer: (f, latlng) => L.circleMarker(latlng, {radius: 4, color: "#333", weight: 1, fillColor: "#ffffff", fillOpacity: 1}),
    onEachFeature: (f, layer) => layer.bindTooltip(f.properties.name)
});

const layers = {transit, parks, healthcare, schools};

const CountControl = L.Control.extend({
    onAdd: function () {
        this.box = L.DomUtil.create("div", "count-box");
        this.box.textContent = "...";
        return this.box;
    },
    update: function (n) {
        this.box.textContent = `${n} sites in view`;
    }
});
const countControl = new CountControl({ position: "bottomleft" }).addTo(map);

function countInView() {
    const bounds = map.getBounds();
    let n = 0;
    for (const [group, shown] of [[transit, map.hasLayer(transit)], [parks, map.hasLayer(parks)], [healthcare, map.hasLayer(healthcare)], [schools, map.hasLayer(schools)]]) {
        if (!shown) continue;
        group.eachLayer(l => { if (bounds.contains(l.getLatLng())) n += 1; });
    }
    countControl.update(n);
}

map.on("moveend", countInView);

for (const box of document.querySelectorAll("[data-layer]")) {
    box.addEventListener("change", () => {
        const layer = layers[box.dataset.layer];
        if (box.checked) layer.addTo(map); else map.removeLayer(layer);
        countInView();
    });
}

async function start() {

    const transitData = await (await fetch("data/rail_stations.geojson")).json();
    transit.addData(transitData);
    transit.addTo(map);

    const parksData = await (await fetch("data/parks.geojson")).json();
    parks.addData(parksData);
    parks.addTo(map);

    const healthcareData = await (await fetch("data/healthcare.geojson")).json();
    healthcare.addData(healthcareData);
    healthcare.addTo(map);

    const schoolsData = await (await fetch("data/schools.geojson")).json();
    schools.addData(schoolsData);
    schools.addTo(map);
}
start();

// Update the map status
// document.querySelector("#map-status").textContent =
//   "Explore Tempe. Housing and amenity layers will be loaded next.";
