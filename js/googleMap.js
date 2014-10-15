var currentPos;//La pos courante -> retour geolocalisation
        var map;
        var pos;
        var markers = [];
        var tabJson = [];
        var i=0;

            //Var simon
            var points = [];
            var hullPoints = [];
            var polyline;


        function initialize() {
          var mapOptions = {
            zoom: 17
          };
          map = new google.maps.Map(document.getElementById('map-canvas'),
              mapOptions);
                
          // Try HTML5 geolocation
          if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            pos = new google.maps.LatLng(position.coords.latitude,
                                               position.coords.longitude);                                
            console.log("My pos:"+pos);                                 
            currentPos = pos;
                
                var myPos = new google.maps.Marker({
                position: pos,
                map: map
              });
            /*
            google.maps.event.addListener(myPos, 'click', function(){
              myPos.setMap(null);//Position courante
            });
            */
            map.setCenter(pos);
            //------------------------------------------------------
                var contentString = '<div id="infoCurrentPos">'+'Curent Position'+'<br/>'+
                                     myPos.position   
                                    +'</div>';
                var infowindow = new google.maps.InfoWindow({//Creation fenetre qui apparait si mouseover
                    content: contentString
                });                
                google.maps.event.addListener(myPos, 'mouseover', function() {
                  infowindow.open(map,myPos);//Event mouseover sur le marker de geolocalisation
            });//
                google.maps.event.addListener(myPos, 'mouseout', function() {
                  infowindow.close(map,myPos);//Event mouseover sur le marker de geolocalisation
            });//
            }, function() {
              handleNoGeolocation(true);
            });

            //Simon
             google.maps.event.addListener(map, "click", function(evt) {
                  if (evt.latLng) {
                    var location = evt.latLng;
                    addMarker(location);
                    points.push(location);
                    calculateConvexHull();     
              }
              });//SImon
          } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
          }
          infoWindow = new google.maps.InfoWindow();
        }//FIN_INITIALIZE

        //Liste des fonctions
        // Add a marker to the map and push to the array.
        /*Version Romain
        function addMarker(location) {
          var marker = new google.maps.Marker({
            position: location,
            map: map
          });
          markers.push(marker);
          tabJson.push({"lat":marker.position.k, "long":marker.position.B });
          //console.log(marker.position.B);
          google.maps.event.addListener(marker, 'click', function(){
          marker.setMap(null);
          });

        }*/
        //---------------------------------------------------------------
        /**
        * Permet l'ajout de marker sur la carte
        * Chaque marker est 'surveillé' sur l'evenement click et dragend* 
        * @param {type} location */
        function addMarker(location){
            //var html = "marker "+marker_number;
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                draggable:true,
                zIndex: Math.round(location.lat()*-100000)<<5
                });
                markers.push(marker);//utiliser lors de delete
                tabJson.push({"lat":marker.position.k, "long":marker.position.B });//Pour le json
                google.maps.event.addListener(marker, 'click', function() {
                var contentString = html + "<br>"+marker.getPosition().toUrlValue()+"<br><a href='javascript:removeMarker(new google.maps.LatLng("+marker.getPosition().toUrlValue()+"));'>Remove Marker</a>";
                infowindow.setContent(contentString); 
                infowindow.open(map,marker);
                });
            google.maps.event.addListener(marker, 'dragend', function() { calculateConvexHull(); } );
            return marker;
        }
        /*
         * Sets the map on all markers in the array.
         * @param {type} map
         */ 
        function setAllMap(map) {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);    
          }
        }
        // Removes the markers from the map, but keeps them in the array.
        function clearMarkers(){
          setAllMap(null);
        }
        // Shows any markers currently in the array.
        function showMarkers() {
          setAllMap(map);
        }
        // Deletes all markers in the array by removing references to them.
        function deleteMarkers() {
          clearMarkers();
          markers = [];
          //-----Simon
          calculateConvexHull();
        }
        /**
         * Permet l'ajout de marker sur la map depuis un obj json
         * @param {type} oJSON
         */
        function addMarkerFromDB(oJSON) {
          var myLatlng = new google.maps.LatLng(oJSON.lat,oJSON.long);
          addMarker(myLatlng);      
        }
        /**
         * Paramètre la carte si la geolocalistaion n'est pas active
         * @param {type} errorFlag
         */
        function handleNoGeolocation(errorFlag) {
          if (errorFlag) {
            var content = 'Error: The Geolocation service failed.';
          } else {
            var content = 'Error: Your browser doesn\'t support geolocation.';
          }
          var options = {
            map: map,
            position: new google.maps.LatLng(60, 105),
            content: content
          };

          var infowindow = new google.maps.InfoWindow(options);
          map.setCenter(options.position);
        }
        //Ajax
        //-------------------------------------------------
        /**
         * Appel ajax qui permet de sauver les coordonnées GPS
         * des markers sdans la BD
         * @returns {undefined}
         */
        function setter(){
         var oJson = {"obj":tabJson};
        console.log( oJson );
        $.ajax({
            "url": "save.php",
            "type": "POST",
            "dataType": "html",
            "data": oJson,
            "success": function (){
                  console.log("Transfert OK");
            }
        });
        }

        /**
        * Appel ajax qui permet de récuperer les coordonnées GPS
         *des markers sauvegardés dans la BD
         * @returns {undefined}
         */
        function getter(){//Sauve les infos ds la BD
        $.ajax({
            "url": "get.php",
            "type": "POST",
            "data": "",
            "dataType": "json",
            "success": function(data){
                        for(i=0; i<data.sizeOftab;i++){
                            addMarkerFromDB(data.tabOfJson[i]);
                            console.log(data.tabOfJson[i]);
                        }               
            }
        });
        }

        //---------------------Partie Simon----------------------------
             function calculateConvexHull() {
              if (polyline) polyline.setMap(null);
             // document.getElementById("hull_points").innerHTML = "";
              points = [];
              for (var i=0; i < markers.length; i++) {
                points.push(markers[i].getPosition());
              }
              points.sort(sortPointY);
              points.sort(sortPointX);
              DrawHull();
        }

             function sortPointX(a,b) { return a.lng() - b.lng(); }
             function sortPointY(a,b) { return a.lat() - b.lat(); }

             function DrawHull() {
             hullPoints = [];
             chainHull_2D( points, points.length, hullPoints );
             polyline = new google.maps.Polygon({
              map: map,
              paths:hullPoints, 
              fillColor:'#000',
              strokeWidth:2, 
              fillOpacity:0.5, 
              strokeColor:"#0000FF",
              strokeOpacity:0.5
             });
        }


        function creerRectangle(){
            //console.log(pos);
             var limites = new google.maps.LatLngBounds(
              new google.maps.LatLng(48.114767,-1.680908),
              new google.maps.LatLng(48.132494,-1.672401)    
                );

          var rectangle = new google.maps.Rectangle({
            bounds: limites,
            draggable: true,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            geodesic: true,
            editable: true
          });
          rectangle.setMap(map); 
        }

        google.maps.event.addDomListener(window, 'load', initialize);
        