let originMarker = null;
const destinationMarkers = [];
let directionsRenderer = null;
const detailsContainer = document.getElementById('route-details');


// Get geoloaction from user
navigator.geolocation.getCurrentPosition(
    (position) => {
        const latitude = position.coords.latitude.toFixed(3);
        const longitude = position.coords.longitude.toFixed(3);
        initMap(latitude, longitude);
    },
    (error) => {
        const defaultLatitude = 0;
        const defaultLongitude = 0;
        console.log(error);
        initMap(defaultLatitude, defaultLongitude);
    }
);



// Initialize map
function initMap(latitude, longitude) {
    if (typeof (latitude) === 'undefined' || typeof (longitude) === 'undefined') {
        latitude = 0;
        longitude = 0;
    }

    const bounds = new google.maps.LatLngBounds();
    const markersArray = [];
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: Number(latitude), lng: Number(longitude) },
        zoom: 10,
    });


    // Initialize Google services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    const directionsService = new google.maps.DirectionsService();


    // Handle click event on map
    map.addListener("click", (event) => {
        detailsContainer.innerHTML = '';
        if (originMarker === null) {
            originMarker = createMarker(event.latLng, "O");
        } else {
            const destinationMarker = createMarker(event.latLng, "D");
            destinationMarkers.push(destinationMarker);
            calculateDistance();
        }
    });


    // Add a "clear" button to the map
    const clearButton = document.createElement("button");
    clearButton.innerText = 'Clear route';
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(clearButton);


    // Clear map
    clearButton.addEventListener("click", () => {
        deleteMarkers(markersArray);
        originMarker = null;
        destinationMarkers.length = 0;
        if (directionsRenderer) {
            directionsRenderer.setMap(null);
        }
    });


    // Create a marker and add it to the map
    function createMarker(latLng, label) {
        const marker = new google.maps.Marker({
            map,
            position: latLng,
            label,
        });
        bounds.extend(latLng);
        markersArray.push(marker);
        return marker;
    }


    function calculateDistance() {
        const origin = { lat: originMarker.getPosition().lat(), lng: originMarker.getPosition().lng() };
        const destinations = destinationMarkers.map((marker) => ({
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng(),
        }));

        // Create a distance matrix request
        const request = {
            origins: [origin],
            destinations,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
        };

        // Get the distance matrix response
        service.getDistanceMatrix(request).then((response) => {
            const results = response.rows[0].elements;
            const waypoints = destinationMarkers.map((marker, index) => ({
                location: marker.getPosition(),
                stopover: true,
            }));

            const routeRequest = {
                origin: originMarker.getPosition(),
                destination: originMarker.getPosition(),
                waypoints,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING,
            };

            // Request the shortest route using waypoints
            directionsService.route(routeRequest, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    if (directionsRenderer) {
                        directionsRenderer.setMap(null);
                    }
                    // Render the directions on the map
                    directionsRenderer = new google.maps.DirectionsRenderer({
                        map,
                        directions: result,
                    });

                    const route = result.routes[0];

                    // Calculate total distance and duration
                    let totalDistance = 0;
                    let totalDuration = 0;

                    for (let i = 0; i < results.length; i++) {
                        const distance = results[i].distance.value; // distance in meters
                        const duration = results[i].duration.value; // duration in seconds

                        totalDistance += distance;
                        totalDuration += duration;
                    }

                    // Display information from the route
                    detailsContainer.innerHTML = `Total Distance: (${(totalDistance / 1000).toFixed(2)} km)<br>
                                                  Total Duration: (${(totalDuration / 60).toFixed(2)} minutes)`;
                }
            });
        });
    }
}


// Delete markers
function deleteMarkers(markersArray) {
    for (let i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }

    markersArray.length = 0;
}
