"use strict";
class Viajes {

    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }

    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }

    getMapaEstaticoGoogle(){
        document.querySelector("main button:first-of-type").disabled = true;
        var ubicacion=document.createElement("div");
        
        var apiKey = "&key=AIzaSyBRFusV9KGN7Kmvu4YKBCitK4ymw5ofj84";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        ubicacion.innerHTML = "<img src='"+this.imagenMapa+"' alt='mapa estático google' />";
        document.querySelector("main section:first-of-type").appendChild(ubicacion);
    }

    getMapaDinamico() {
        
        var centro = {lat: 1, lng: 1};
        var img = document.createElement('div')
        var mapaGeoposicionado = new google.maps.Map(img,{
            zoom: 8,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
    
                infoWindow.setPosition(pos);
                infoWindow.setContent('Localización encontrada');
                infoWindow.open(mapaGeoposicionado);
                mapaGeoposicionado.setCenter(pos);
                document.querySelector("main section:last-of-type").appendChild(img);a
              }, function() {
                handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
              });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
        }
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: Ha fallado la geolocalización' :
                              'Error: Su navegador no soporta geolocalización');
        infoWindow.open(mapaGeoposicionado);
      }
}