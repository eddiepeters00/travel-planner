# Travel-planner

## Description

This project aims to create a travel application that helps users plan their trips and navigate through different locations. The application will provide features such as an interactive map where users can set markers to indicate their origin and destination points. It will calculate the distance between these points using the Google Maps Distance Matrix service, allowing users to estimate travel times. Additionally, the application will optimize the route by finding the shortest path through the selected destinations using the Google Maps Directions service. This will enable users to plan efficient travel routes. The application will also include a clear function to remove markers and routes for ease of use. Overall, this travel application will provide users with a convenient and intuitive way to plan and visualize their road trips or routes, enhancing their travel experience.
### This project was built using:
* JavaScript
* Express
* Node
* EJS
* SCSS

## installation
To install all packages
```node
npm install
```

To run the server
```node
npm run start
```

To compile sass
```node
npm run sass 
```

## Features 
### Map
This feature enables an interactive map where users can set markers by clicking on it. These markers represent origin and destination points. The code utilizes the Google Maps Distance Matrix service to calculate the distance between the origin marker and the destination markers. Additionally, the route is optimized by determining the shortest path through the destination markers. The resulting route is then displayed on the map using the Google Maps Directions service. To enhance usability, a clear button is included, allowing users to easily remove markers and the route from the map. This feature provides a user-friendly and efficient way to plan and visualize road trips or routes on the map.

## API:s 
*Directions API*. 
https://developers.google.com/maps/documentation/directions/overview

*Distance matrix API*. 
https://developers.google.com/maps/documentation/distance-matrix/overview

*Geocoding API*. 
https://developers.google.com/maps/documentation/geocoding/overview

*Maps JavaScript API*. 
https://developers.google.com/maps/documentation/javascript/overview
