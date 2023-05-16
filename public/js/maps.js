let originMarker = null;
const destinationMarkers = [];
let directionsRenderer = null;


function initMap() {
    const bounds = new google.maps.LatLngBounds();
    const markersArray = [];
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 55.53, lng: 9.4 },
        zoom: 10,
    });


    // Initialize services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    const directionsService = new google.maps.DirectionsService();


    // Handle click event on map
    map.addListener("click", (event) => {
        if (originMarker === null) {
            originMarker = createMarker(event.latLng, "O");
        } else {
            const destinationMarker = createMarker(event.latLng, "D");
            destinationMarkers.push(destinationMarker);
            calculateDistance();
        }
    });


    // Clear map
    document.querySelector('button').addEventListener("click", () => {
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

                    // Information of each stop in the route
                    console.log(route.legs);
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

window.initMap = initMap;