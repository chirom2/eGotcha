<!DOCTYPE html>
<html>
  <head>
    <title>GoogleMaps</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
     <!-- Bootstrap core CSS -->
    <link href="../../livrable/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="../../livrable/css/starter-template.css" rel="stylesheet">
    <link href="../../livrable/css/cover.css" rel="stylesheet">
    <style>
      #map-canvas {
        height: 800px;
      }
      #infoCurrentPos{
          color: black;
      }
    </style>
    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="../../assets/js/ie-emulation-modes-warning.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
    <script src="../../livrable/js/jquery-1.11.1.js"></script>
    <script src="../../livrable/js/convex_hull.js"></script>
    <script src="../../livrable/js/googleMap.js"></script>
  </head>
  <body>
      <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">    
             <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#" onclick="initialize();">eGotcha Project</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li ><a class="active"href="#">Show Markers</a></li>
            <li><a class="active"href="#"  onclick="clearMarkers();">Hide Markers</a></li>
            <li><a class="active"href="#" onclick="deleteMarkers();">Delete Markers</a></li>
            <li><a class="active"href="#" onclick="getter();">Display Marker from DB</a></li>
            <li><a class="active"href="#" onclick="setter();">Save Marker on DB</a></li>
            <li><a class="active"href="#" onclick="calculateConvexHull();">Afficher Polygon</a></li>
            <li><a class="active"href="#" onclick="creerRectangle();">Create Polygon</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
          
    </div>      
      <div class="inner cover">            
            <div id="map-canvas"></div>          
      </div>
    
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="../../livrable/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>