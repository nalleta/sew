"use strict";
class Agenda {

    constructor() {
        this.url = "https://api.jolpi.ca/ergast/f1/2024/races.json";
    }
    
    getCarreras() {
        $("button").attr("disabled","disabled");
        $.ajax({
            url:this.url,
            method:"GET",
            success: function(data){
                var carreras = data.MRData.RaceTable.Races;
                var seccion = document.createElement("section");
                var titulo = document.createElement("h2");
                titulo.textContent = "Próximas carreras";
                seccion.appendChild(titulo);
                carreras.forEach(element => {
                    var article = document.createElement("article");

                    var enc = document.createElement("h3");
                    enc.textContent = element.raceName;

                    var nombre = document.createElement("p");
                    nombre.textContent = "Nombre del circuito: " + element.Circuit.circuitName;
                    var coordenadas = document.createElement("p");
                    coordenadas.textContent = "Coordenadas: latitud " + element.Circuit.Location.lat + ", longitud " + element.Circuit.Location.long;
                    var fecha = document.createElement("p");
                    fecha.textContent = "Fecha: " + element.date;
                    var hora = document.createElement("p");
                    hora.textContent = "Hora: " + element.time;

                    article.appendChild(enc);
                    article.appendChild(nombre);
                    article.appendChild(coordenadas);
                    article.appendChild(fecha);
                    article.appendChild(hora);
                    seccion.appendChild(article);
                });
             $("main").append(seccion);
                
            },
            error: function(error) {
                console.log(error);
            }
        })
            
    }
}