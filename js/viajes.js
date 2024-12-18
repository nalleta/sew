"use strict";
class Viajes {

    constructor (){
        this.iniciaCarrusel();
    }

    initMaps(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
        $("main>button").attr("disabled", true);
    }

    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.pos = {
            lat: this.latitud,
            lng: this.longitud
          };
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed; 
              
        this.getMapaEstaticoGoogle();
        this.getMapaDinamico();
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
        var ubicacion=document.createElement("img");
        
        var apiKey = "&key=AIzaSyBRFusV9KGN7Kmvu4YKBCitK4ymw5ofj84";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        ubicacion.setAttribute("src", this.imagenMapa);
        ubicacion.setAttribute("alt", "mapa estático google");
        //$("main section:first-of-type").append(ubicacion);
        document.querySelector("main section:first-of-type").appendChild(ubicacion);
    }

    getMapaDinamico() {
        
        var centro = {lat: 1, lng: 1};
        var img = document.createElement('div');
        var mapaGeoposicionado = new google.maps.Map(img,{
            zoom: 8,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
            infoWindow.setPosition(this.pos);
            infoWindow.setContent('Localización encontrada');
            infoWindow.open(mapaGeoposicionado);
            mapaGeoposicionado.setCenter(this.pos);
            document.querySelector("main section:nth-of-type(2)").appendChild(img);
            
            /*
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
    
                infoWindow.setPosition(pos);
                infoWindow.setContent('Localización encontrada');
                infoWindow.open(mapaGeoposicionado);
                mapaGeoposicionado.setCenter(pos);
                document.querySelector("main section:last-of-type").appendChild(img);
              }, function() {
                handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
              });*/

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

    iniciaCarrusel(){
        var imgs = document.querySelectorAll("main button+section+section+article img")
        var btNext = document.querySelector("main button+section+section+article button:first-of-type")
        var btPrev = document.querySelector("main button+section+section+article button:last-of-type")

        var index = 0
        var maxIndex = imgs.length -1

        btNext.onclick = function(){
            if(index == maxIndex){
                index = 0
            }
            else{
                index++
            }   
            this.desplazarImagenes(imgs,index)
        }.bind(this)


        btPrev.onclick = function(){
            if(index == 0){
                index = maxIndex
            }
            else{
                index--
            }   
            this.desplazarImagenes(imgs,index)
        }.bind(this)

    }

    desplazarImagenes(fotos, index){
        fotos.forEach((foto, i) => {
            var trans = 100 * (i - index);
            $(foto).css('transform', 'translateX(' + trans + '%)')
        })
    }
}