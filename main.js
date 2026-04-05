// tokend
mapboxgl.accessToken = "pk.eyJ1IjoicHR1bGluIiwiYSI6ImNtbjJ5aWJzNTFiY3cycnB4NTYzMnMxN3EifQ.FcVHmTN-h4SXKqckbTKPgw"

// Create map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [100.5, 13.7],   // [lon, lat]
    zoom: 5,
    projection: 'mercator'
});

// =====================================
// 2) Add map controls
// =====================================
map.addControl(new mapboxgl.NavigationControl(), 'top-right');
map.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

// =====================================
// 3) Load vector tileset and add layer
// =====================================
map.on('load', () => {
    console.log('Map loaded');
 
    map.addSource('Lakes-source', {
        type: 'vector',
        url: 'mapbox://ptulin.lannxp2l77ir'
    });
    console.log('Source added');
 
    map.addLayer({
        id: 'Lakes-layer',
        type: 'fill',
        source: 'Lakes-source',
        'source-layer': '513b3e03926d52227526',
        minzoom: 0,
        maxzoom: 15,
        paint: {
            'fill-color': '#0088ff',
            'fill-opacity': 0.7
        }
    }); 
    console.log('Layer Lakes added');


    map.addSource('urban_areas-source', {
    type: 'vector',
    url: 'mapbox://ptulin.i5embjg1swal'
    });
    console.log('Source added');
 
    map.addLayer({
        id: 'urban_areas-layer',
        type: 'fill',
        source: 'urban_areas-source',
        'source-layer': 'db3d1f0d04241b9d71bf',
        minzoom: 0,
        maxzoom: 15,
        paint: {
            'fill-color': '#f84a4a',
            'fill-opacity': 0.7
        }
    }); 
    console.log('Layer urban areas added');

});

// =====================================
// 4) Popup on click
// =====================================
map.on('click', 'Lakes-layer', (e) => {
    const feature = e.features[0];
    const props = feature.properties || {};
 
    const popupHTML = `
        <div style="font-size: 13px; line-height: 1.5;">
            <b>lakes feature</b><br>
            <pre style="margin: 6px 0 0; white-space: pre-wrap;">${JSON.stringify(props, null, 2)}</pre>
        </div>
    `;
 
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(popupHTML)
        .addTo(map);
});

map.on('click', 'urban_areas-layer', (e) => {
    const feature = e.features[0];
    const props = feature.properties || {};
 
    const popupHTML = `
        <div style="font-size: 13px; line-height: 1.5;">
            <b>Urban areas feature</b><br>
            <pre style="margin: 6px 0 0; white-space: pre-wrap;">${JSON.stringify(props, null, 2)}</pre>
        </div>
    `;
 
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(popupHTML)
        .addTo(map);
});

// =====================================
// 5) Change cursor on hover
// =====================================
map.on('mouseenter', 'Lakes-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
});
 
map.on('mouseleave', 'Lakes-layer', () => {
    map.getCanvas().style.cursor = '';
});

map.on('mouseenter', 'urban_areas-layer', () => {
    map.getCanvas().style.cursor = 'pointer';
});
 
map.on('mouseleave', 'urban_areas-layer', () => {
    map.getCanvas().style.cursor = '';
});


// =====================================
// 6) Checkbox
// =====================================

// Lakes toggle
document.getElementById('toggle-lakes').addEventListener('change', (e) => {

    if (map.getLayer('Lakes-layer')) {
        map.setLayoutProperty(
            'Lakes-layer',
            'visibility',
            e.target.checked ? 'visible' : 'none'
        );
    }

});

// Urban areas toggle
document.getElementById('toggle-urban-areas').addEventListener('change', (e) => {

    if (map.getLayer('urban_areas-layer')) {
        map.setLayoutProperty(
            'urban_areas-layer',
            'visibility',
            e.target.checked ? 'visible' : 'none'
        );
    }

});