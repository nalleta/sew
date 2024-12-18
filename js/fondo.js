"use strict";
class Fondo {

    constructor(nPais, nCapital, nombreCircuito) {
        this.nombrePais = nPais;
        this.nombreCapital = nCapital;
        this.nombreCircuito = nombreCircuito;
    }

    getNombrePais() {
        return this.nombrePais;
    }

    getNombreCapital() {
        return this.nombreCapital;
    }

    getNombreCircuito() {
        return this.nombreCircuito
    }

    getImagenCircuito() {
        $.getJSON("https://api.flickr.com/services/rest/", 
            {
                method: "flickr.photos.search",
                api_key: "2764a1e3ff08e9112da7499028915f0f",
                tags: this.nombreCircuito,
                format: "json",
                nojsoncallback: "?"
            })
            .done(function(data) {
                var selectedPhoto = data.photos.photo[Math.floor(Math.random() * data.photos.photo.length)];
                
                var photoUrl = `https://live.staticflickr.com/${selectedPhoto.server}/${selectedPhoto.id}_${selectedPhoto.secret}_b.jpg`;
                
                $("body").css("background-image", `url(\"${photoUrl}\")`);
                $("body").css("background-size", "cover");
                $("body").css("height", "100vh");
                $("body").css("background-repeat", "no-repeat");
                $("body").css("background-position", "center center");

                
                //$("body").css("background-origin", "padding-box");
                
            });
    }
}