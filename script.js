//Define access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXM3MzIyIiwiYSI6ImNsc2liNzgyNjE3bHMyaW5uYmpnM2g0ZWUifQ.XnhfVeO7l6Smi0x-SKMB8Q'; //****ADD YOUR PUBLIC ACCESS TOKEN*****

//Initialize map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chris7322/clsjtr9s701fc01qre0wl846p', // style URL,
    center: [28.9556462132237, 41.109551659595354], // starting position [lng, lat]
    zoom: 9, // starting zoom
});


// Add zoom and rotation controls to the top left of the map
map.addControl(new mapboxgl.NavigationControl());

// Add fullscreen option to the map
map.addControl(new mapboxgl.FullscreenControl());


// Create geocoder as a variable (and remove previous geocoder)
const geocoder = new MapboxGeocoder({
     accessToken: mapboxgl.accessToken,
     mapboxgl: mapboxgl,
     countries: "tr" 
 });

// Append geocoder variable to goeocoder HTML div to position on page
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));





//Add data source and draw initial visiualization of layer
map.on('load', () => {
    //Istanbul GeoJSON data source
    map.addSource('istanbul-data', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                     "properties": {
                        "name": "Istanbul"
                    },
                    "geometry": {
                        "coordinates": [
                            28.9556462132237,
                            41.109551659595354
                        ],
                        "type": "Point"
                    },
                    "properties": {
                        "population": 15.46
                    }
                }
            ]
        }
    });
    map.addLayer({
        'id': 'istanbul-pnt',
        'type': 'circle',
        'source': 'istanbul-data',
        'paint': {
            'circle-radius': ['/', ['get', 'capacity'], 0.2],
            'circle-color': [
                       'step', // STEP expression produces stepped results based on value pairs
                       ['get', 'population'], // GET expression retrieves property value from 'istanbul-pnt' data field
                       '#800026', // Colour assigned to any values < first step
                       5, '#bd0026', // Colours assigned to values >= each step
                       10, '#e31a1c',
                       15, '#fc4e2a',
                       20, '#fd8d3c'
                   ]
            
        }
    });
});


map.on('load', () => {
    //Ankara GeoJSON data source
    map.addSource('ankara-data', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                     "properties": {
                        "name": "Ankara"
                    },
                    "geometry": {
                        "coordinates": [
                            32.868821998912125,
                            39.89252439810511
                        ],
                        "type": "Point"
                    },
                    "properties": {
                        "population": 5.663
                    }
                }
            ]
        }
    });
    map.addLayer({
        'id': 'ankara-pnt',
        'type': 'circle',
        'source': 'ankara-data',
        'paint': {
            'circle-radius': ['/', ['get', 'capacity'], 0.2],
            'circle-color': [
                'step', // STEP expression produces stepped results based on value pairs
                ['get', 'population'], // GET expression retrieves property value from 'ankara-pnt' data field
                '#800026', // Colour assigned to any values < first step
                5, '#bd0026', // Colours assigned to values >= each step
                10, '#e31a1c',
                15, '#fc4e2a',
                20, '#fd8d3c'
            ]
        }
    });
});


/*--------------------------------------------------------------------
SIMPLE CLICK EVENT
--------------------------------------------------------------------*/
map.on('click', 'ankara-pnt', (e) => {

    console.log(e);   //e is the event info triggered and is passed to the function as a parameter (e)
                        //Explore console output using Google DevTools

    // let provname = e.features[0].properties.PRENAME;
    // console.log(provname);

});

map.on('click', 'istanbul-pnt', (e) => {

    console.log(e);   //e is the event info triggered and is passed to the function as a parameter (e)
                        //Explore console output using Google DevTools

    // let provname = e.features[0].properties.PRENAME;
    // console.log(provname);

});

/*--------------------------------------------------------------------
ADD POP-UP ON CLICK EVENT
--------------------------------------------------------------------*/
map.on('mouseenter', 'ankara-pnt', () => {
    map.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over ankara-pnt layer
});

map.on('mouseleave', 'ankara-pnt', () => {
    map.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves ankara-pnt layer
});

map.on('click', 'ankara-pnt', (e) => {
    new mapboxgl.Popup() //Declare new popup object on each click
        .setLngLat(e.lngLat) //Use method to set coordinates of popup based on mouse click location
        .setHTML('A City of Turkiye with a population of 5.663 million.') //Use click event properties to write text for popup
        .addTo(map); //Show popup on map
});


map.on('mouseenter', 'istanbul-pnt', () => {
    map.getCanvas().style.cursor = 'pointer'; //Switch cursor to pointer when mouse is over istanbul-pnt layer
});

map.on('mouseleave', 'istanbul-pnt', () => {
    map.getCanvas().style.cursor = ''; //Switch cursor back when mouse leaves istanbul-pnt layer
});

map.on('click', 'istanbul-pnt', (e) => {
    new mapboxgl.Popup() //Declare new popup object on each click
        .setLngLat(e.lngLat) //Use method to set coordinates of popup based on mouse click location
        .setHTML('A City of Turkiye with a population of 15.46 million.') //Use click event properties to write text for popup
        .addTo(map); //Show popup on map
});


// 1) Add event listener which returns map view to full screen on button click using flyTo method
document.getElementById('returnbutton').addEventListener('click', () => {
    map.flyTo({
        center: [-105, 58],
        zoom: 3,
        essential: true
    });
});
