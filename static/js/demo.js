//require([
//  "esri/Map",
//  "esri/views/MapView",
//  "dojo/domReady!"
//], function(Map, MapView){
//  var map = new Map({
//    basemap: "streets"
//  });
//  var view = new MapView({
//    container: "viewDiv",  // Reference to the scene div created in step 5
//    map: map,  // Reference to the map object created before the scene
//    zoom: 15,  // Sets zoom level based on level of detail (LOD)
//    center: [ -122.4082717 ,37.78121 ]  // Sets center point of view using longitude,latitude
//  });
//});


require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search",
  "esri/layers/FeatureLayer",
    "esri/views/2d/draw/Draw",
      "esri/Graphic",
      "esri/geometry/Polyline",
      "esri/geometry/geometryEngine",
  "dojo/domReady!"
], function(Map, MapView, Search, FeatureLayer, Draw, Graphic,
      Polyline, geometryEngine) {

  var map = new Map({
    basemap: "streets-vector"
  });

  // Add the layer to the map
  var trailsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
  });

  //map.add(trailsLayer); // Optionally add layer to map

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center:  [ -122.4082717 ,37.78121 ],
    zoom: 15
  });

//  require([
//      "esri/Map",
//      "esri/views/MapView",
//      "esri/views/2d/draw/Draw",
//      "esri/Graphic",
//      "esri/geometry/Polyline",
//      "esri/geometry/geometryEngine",
//
//      "dojo/domReady!"
//    ], function(
//      Map, MapView,
//      Draw, Graphic,
//      Polyline, geometryEngine
//    ) {
//      var map = new Map({
//        basemap: "gray"
//      });
//
//      var view = new MapView({
//        container: "viewDiv",
//        map: map,
//        zoom: 16,
//        center: [18.06, 59.34]
//      });

  view.ui.add("line-button", "top-left");

  view.when(function(evt) {
    var draw = new Draw({
      view: view
    });

   var drawLineButton = document.getElementById("line-button");
   drawLineButton.onclick = function() {
          view.graphics.removeAll();
          enableCreateLine(draw, view);
        }
   });

  function enableCreateLine(draw, view) {
    // creates and returns an instance of PolyLineDrawAction
    var action = draw.create("polyline");

    // focus the view to activate keyboard shortcuts for sketching
    view.focus();

    // listen to vertex-add event on the polyline draw action
    action.on("vertex-add", updateVertices);

    // listen to vertex-remove event on the polyline draw action
    action.on("vertex-remove", updateVertices);

    // listen to cursor-update event on the polyline draw action
    action.on("cursor-update", createGraphic);

    // listen to draw-complete event on the polyline draw action
    action.on("draw-complete", updateVertices);

  }

  // This function is called from the "vertex-add" and "vertex-remove"
  // events. Checks if the last vertex is making the line intersect itself.
  function updateVertices(evt) {
    // create a polyline from returned vertices
    var result = createGraphic(evt);

    // if the last vertex is making the line intersects itself,
    // prevent "vertex-add" or "vertex-remove" from firing
    if (result.selfIntersects) {
      evt.preventDefault();
    }
  }

  // create a new graphic presenting the polyline that is being drawn on the view
  function createGraphic(evt) {
    var vertices = evt.vertices;
    view.graphics.removeAll();

    // a graphic representing the polyline that is being drawn
    var graphic = new Graphic({
      geometry: new Polyline({
        paths: vertices,
        spatialReference: view.spatialReference
      }),
      symbol: {
        type: "simple-line", // autocasts as new SimpleFillSymbol
        color: [4, 90, 141],
        width: 4,
        cap: "round",
        join: "round"
      }
    });

    // check the polyline intersects itself.
    var intersectingFeature = getIntersectingFeature(graphic.geometry);

    // Add a new graphic for the intersecting segment.
    if (intersectingFeature) {
      view.graphics.addMany([graphic, intersectingFeature]);
    }
    // Just add the graphic representing the polyline if no intersection
    else {
      view.graphics.add(graphic);
    }

    // return the graphic and intersectingSegment
    return {
      graphic: graphic,
      selfIntersects: intersectingFeature
    }
  }

  // function that checks if the line intersects itself
  function isSelfIntersecting(polyline) {
    if (polyline.paths[0].length < 3) {
      return false
    }
    var line = polyline.clone();

    //get the last segment from the polyline that is being drawn
    var lastSegment = getLastSegment(polyline);
    line.removePoint(0, line.paths[0].length - 1);

    // returns true if the line intersects itself, false otherwise
    return geometryEngine.crosses(lastSegment, line);
  }

  // Checks if the line intersects itself. If yes, changes the last
  // segment's symbol giving a visual feedback to the user.
  function getIntersectingFeature(polyline) {
    if (isSelfIntersecting(polyline)) {
      return new Graphic({
        geometry: getLastSegment(polyline),
        symbol: {
          type: "simple-line", // autocasts as new SimpleLineSymbol
          style: "short-dot",
          width: 3.5,
          color: "yellow"
        }
      });
    }
    return null;
  }

  // Get the last segment of the polyline that is being drawn
  function getLastSegment(polyline) {
    var line = polyline.clone();
    var lastXYPoint = line.removePoint(0, line.paths[0].length - 1);
    var existingLineFinalPoint = line.getPoint(0, line.paths[0].length -
      1);

    return new Polyline({
      spatialReference: view.spatialReference,
      hasZ: false,
      paths: [
        [
          [existingLineFinalPoint.x, existingLineFinalPoint.y],
          [lastXYPoint.x, lastXYPoint.y]
        ]
      ]
    });
  }




  // Search

  var search = new Search({
    view: view
  });
  search.defaultSource.withinViewEnabled = true; // Limit search to visible map area only
  view.ui.add(search, "top-right"); // Add to the map

  // Add the trailheads as a search source
  search.sources.push({
    featureLayer: trailsLayer,
    searchFields: ["TRL_NAME"],
    displayField: "TRL_NAME",
    exactMatch: false,
    outFields: ["TRL_NAME", "PARK_NAME"],
    resultGraphicEnabled: true,
    name: "Trailheads",
    placeholder: "Santa",
  });

  // Find address

  function showPopup(address, pt) {
    view.popup.open({
      title: "Find Address Result",
      content: address + "<br><br> Lat: " + Math.round(pt.latitude * 100000)/100000 + " Lon: " + Math.round(pt.longitude * 100000)/100000,
      location: pt
    });
  }

  view.on("click", function(evt){
    search.clear();
    view.popup.clear();
    var locatorSource = search.defaultSource;
    locatorSource.locator.locationToAddress(evt.mapPoint)
      .then(function(response) {
        var address = response.address;
        // Show the address found
        showPopup(address, evt.mapPoint);
      }, function(err) {
        // Show no address found
        showPopup("No address found for this location.", evt.mapPoint);
      });
  });

});