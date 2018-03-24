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

function flip(el) {
    $("."+el).toggleClass('flipped');
}

$(document).ready(function(){
// $("tr").slideUp();
 $("tr").removeClass("hidde")

})
var notAdded1=true,notAdded2=true, completed=false,issue1=false,issue2=false

x=1
var color2=[0, 121, 191];
var color1=[0, 121, 191];
var graphic=''
var location_points=[ {"type":"Feature","properties":{"mag":1.98,"place":"12km N of Claremont, CA","time":1459784741120,"updated":1459785023178,"tz":-420,"url":"http://earthquake.usgs.gov/earthquakes/eventpage/ci37326887","detail":"http://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ci37326887.geojson","felt":null,"cdi":null,"mmi":null,"alert":null,"status":"automatic","tsunami":0,"sig":60,"net":"ci","code":"37326887","ids":",ci37326887,","sources":",ci,","types":",general-link,geoserve,nearby-cities,origin,phase-data,scitech-link,","nst":5,"dmin":0.1324,"rms":0.24,"gap":200,"magType":"ml","type":"earthquake","title":"M 2.0 - 12km N of Claremont, CA"},"geometry":{"type":"Point","coordinates":[ -122.4082717 ,37.88121,27.38]},"id":"ci37326887"},
        {"type":"Feature","properties":{"mag":1.1,"place":"22km ESE of Hawthorne, Nevada","time":1459784583180,"updated":1459784725824,"tz":-420,"url":"http://earthquake.usgs.gov/earthquakes/eventpage/nn00539077","detail":"http://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/nn00539077.geojson","felt":null,"cdi":null,"mmi":null,"alert":null,"status":"automatic","tsunami":0,"sig":19,"net":"nn","code":"00539077","ids":",nn00539077,","sources":",nn,","types":",general-link,geoserve,nearby-cities,origin,phase-data,","nst":8,"dmin":0.065,"rms":null,"gap":110.67,"magType":"ml","type":"earthquake","title":"M 1.1 - 22km ESE of Hawthorne, Nevada"},"geometry":{"type":"Point","coordinates":[ -122.4082717 ,37.98121,5.9]},"id":"nn00539077"},
]
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search",
  "esri/layers/FeatureLayer",
    "esri/views/2d/draw/Draw",
      "esri/Graphic",
      "esri/geometry/Polyline",
      "esri/geometry/Point",
      "esri/geometry/geometryEngine",
       "esri/symbols/SimpleMarkerSymbol",   "esri/Color",
  "dojo/domReady!"
], function(Map, MapView, Search, FeatureLayer, Draw, Graphic,
      Polyline,Point, geometryEngine,SimpleMarkerSymbol,Color) {


 GraphicGlobal=Graphic



  var map = new Map({
    basemap: "streets-vector"
  });

  // Add the layer to the map
  var trailsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
  });

  //map.add(trailsLayer); // Optionally add layer to map

  view = new MapView({
    container: "viewDiv",
    map: map,
    center:  [ -122.4082717 ,37.78121 ],
    zoom: 15,
    constraints: {
    rotationEnabled: true
  }
  });

 point1 = {
        type: "point", // autocasts as new Point()
        longitude: -122.4082117,
        latitude: 37.78111
      };

 point2 = {
        type: "point", // autocasts as new Point()
        longitude: -122.4082317,
        latitude: 37.78129
      };

      // Create a symbol for drawing the point
      var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [0, 121, 191],

      };

      // Create a graphic and add the geometry and symbol to it
      var pointGraphic = new Graphic({
        geometry: point1,
        symbol: markerSymbol
      });

       // Create a symbol for drawing the point
      var markerSymbol2 = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [0, 121, 191],

      };

      // Create a graphic and add the geometry and symbol to it
      var pointGraphic2 = new Graphic({
        geometry: point2,
        symbol: markerSymbol2
      });





  view.ui.add("line-button", "top-left");

  view.when(function(evt) {
    var draw = new Draw({
      view: view
    });

   var drawLineButton = document.getElementById("line-button");
   drawLineButton.onclick = function() {
          view.graphics.remove(graphic);
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
    action.on("draw-complete", endVertices);




  }

  view.on("pointer-down", eventHandler);

      function eventHandler(event) {
        // the hitTest() checks to see if any graphics in the view
        // intersect the given screen x, y coordinates
        view.hitTest(event)
          .then(getGraphics);
      }



   function  getGraphics(gr){


   }


  function endVertices(evt) {
    // create a polyline from returned vertices
    var result = createGraphic(evt);

    // if the last vertex is making the line intersects itself,
    // prevent "vertex-add" or "vertex-remove" from firing
    if (result.selfIntersects) {
      evt.preventDefault();
    }
    completed=true

//    setTimeout(function(){
//       view.graphics.add(pointGraphic);
//       $(".row1").slideDown("slow");
//     }, 1000);
//
//     setTimeout(function(){
//       view.graphics.add(pointGraphic2);
//        $(".row2").slideDown("slow");
//     }, 3000);

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
    view.graphics.remove(graphic);

    // a graphic representing the polyline that is being drawn
    graphic = new Graphic({
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

//  view.on("click", function(evt){
//    search.clear();
//    view.popup.clear();
//    var locatorSource = search.defaultSource;
//    locatorSource.locator.locationToAddress(evt.mapPoint)
//      .then(function(response) {
//        var address = response.address;
//        // Show the address found
//        showPopup(address, evt.mapPoint);
//      }, function(err) {
//        // Show no address found
//        showPopup("No address found for this location.", evt.mapPoint);
//      });
//  });
   setInterval(function(){

    $.get("/person1", function(data, status){
        if (JSON.parse(data).present==true && notAdded1 && completed){
          view.graphics.add(pointGraphic);
          notAdded1=false
        }

    })
    $.get("/person2", function(data, status){
         if (JSON.parse(data).present==true && notAdded2 && completed){
            view.graphics.add(pointGraphic2);
            notAdded2=false
        }

    })
},1000)

});

setInterval(function(){


    $.get("/issue1", function(data, status){
        if (JSON.parse(data).present==true && !issue1){
            $(".row1").addClass("highlight");
               var markerSymbol = {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: [255, 0, 0],

          };

              // Create a graphic and add the geometry and symbol to it
              issueGraphic = new GraphicGlobal({
                geometry: point1,
                symbol: markerSymbol
              });

              view.graphics.add(issueGraphic);

            issue1=!issue1
            color1=[255, 0, 0]

        }
        else if (JSON.parse(data).present==false && issue1){
          $(".row1").removeClass("highlight")
          color1=[0, 121, 191];
          issue1=!issue1
             var markerSymbol = {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: color1,

          };

              // Create a graphic and add the geometry and symbol to it
              issueGraphic = new GraphicGlobal({
                geometry: point1,
                symbol: markerSymbol
              });

              view.graphics.add(issueGraphic);

        }

    })
    $.get("/issue2", function(data, status){
         if (JSON.parse(data).present==true && !issue2){
            $(".row2").addClass("highlight");
            var $table = $('table');
            $table.append($(".row1"));
               var markerSymbol = {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: [255, 0, 0],

          };

              // Create a graphic and add the geometry and symbol to it
              issueGraphic = new GraphicGlobal({
                geometry: point1,
                symbol: markerSymbol
              });

              view.graphics.add(issueGraphic);

            issue2=!issue2
            color2=[255, 0, 0]

        }
        else if (JSON.parse(data).present==false && issue2){
          $(".row2").removeClass("highlight")
          issue2=!issue2
          color2=[0, 121, 191];

          issue1=!issue1
             var markerSymbol = {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: color2,

          };

              // Create a graphic and add the geometry and symbol to it
              issueGraphic = new GraphicGlobal({
                geometry: point1,
                symbol: markerSymbol
              });

              view.graphics.add(issueGraphic);
        }

    })


    $(".heartrate1").html("Heart Rate: "+  (((Math.random() * 80)).toFixed(2) + 60)  +"bpm")
     $(".temp1").html("Temp: "+   (((Math.random() * 500)).toFixed(2) + 100) +" F")
//     $(".pressure1").html("Smoke Level : "+  5 +"")
     $(".air1").html("Air Supply: "+   (1-.01*x).toFixed(2) +"hour")

     $(".heartrate2").html("Heart Rate: "+  (((Math.random() * 80)).toFixed(2) + 60)  +"bpm")
     $(".temp2").html("Temp: "+  ( ((Math.random() * 500)).toFixed(2) + 100 )+" F")
//

   x=x+1


 }, 3000);


 function setsrc1(){
    var player = videojs('video-js-big');
    player.src( {type: "rtmp/mp4", src: "rtmp://10.1.103.21:1935/live/sakshi"})
    $("#heartrate").removeClass("heartrate2")
    $("#temp").removeClass("temp2")
    $("#heartrate").addClass("heartrate1")
    $("#temp").addClass("temp1")

     // Create a symbol for drawing the point
      var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: color2,

      };

      // Create a graphic and add the geometry and symbol to it
      var pointGraphic = new GraphicGlobal({
        geometry: point2,
        symbol: markerSymbol
      });

      view.graphics.add(pointGraphic);


     var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: color1,
        outline: { // autocasts as new SimpleLineSymbol()
          color: [0, 0, 0],
          width: 2
        }
      };

      // Create a graphic and add the geometry and symbol to it
      var pointGraphic = new GraphicGlobal({
        geometry: point1,
        symbol: markerSymbol
      });

      view.graphics.add(pointGraphic);



 }

 function setsrc2(){
    var player = videojs('video-js-big');
    player.src( {type: "rtmp/mp4", src: "rtmp://10.1.103.21:1935/live/satya"})
     $("#heartrate").removeClass("heartrate1")
    $("#temp").removeClass("temp1")
    $("#heartrate").addClass("heartrate2")
    $("#temp").addClass("temp2")

     var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: color1,

      };

      // Create a graphic and add the geometry and symbol to it
      var pointGraphic = new GraphicGlobal({
        geometry: point1,
        symbol: markerSymbol
      });

      view.graphics.add(pointGraphic);

    var markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: color2,
        outline: { // autocasts as new SimpleLineSymbol()
          color: [0, 0, 0],
          width: 2
        }
      };

      // Create a graphic and add the geometry and symbol to it
      var pointGraphic = new GraphicGlobal({
        geometry: point2,
        symbol: markerSymbol
      });

      view.graphics.add(pointGraphic);



 }

