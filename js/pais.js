"use strict";
class Pais {

    constructor(nPais, nCapital, cPoblacion) {
        this.nombrePais = nPais;
        this.nombreCapital = nCapital;
        this.cantidadPoblacion = cPoblacion;
        this.initOthers();
    }

    initOthers() {
        this.nombreCircuito = "ALbert Park"
        this.tipoGobierno = "Monarquia constitucional federal";
        this.longitudMeta = 144.9689850;
        this.altitudMeta = 4.8980248;
        this.latitudMeta = -37.8500634;
        this.religion = "Cristianismo";
    }

    init() {
        this.nombrePais = "Australia";
        this.nombreCapital = "Canberra";
        this.nombreCircuito = "ALbert Park"
        this.cantidadPoblacion = 26020805;
        this.tipoGobierno = "Monarquia constitucional federal";
        this.longitudMeta = 144.9689850;
        this.altitudMeta = 4.8980248;
        this.latitudMeta = -37.8500634;
        this.religion = "Cristianismo";
    }

    getNombrePais() {
        return this.nombrePais;
    }
    getNombreCircuito() {
        return this.nombrePais;
    }

    getNombreCapital() {
        return this.nombreCapital;
    }

    getInfoSecundaria() {
        return "<ol><li>Nombre del circuito: " + this.nombreCircuito + "</li><li>Población total: " + this.cantidadPoblacion + "</li><li>Tipo de gobierno: " + this.tipoGobierno + "</li><li>Religión mayoritaria: " + this.religion + "</li></ol>";
    }

    getCoordenadas() {
        document.write("<p>Las coordenadas de la meta del circuito son:</p><p>Longitud = " + this.longitudMeta + ", latitud = " + this.latitudMeta + ", altitud = " + this.altitudMeta + ".</p>");
    }

    
    getInfoMeteorologia() {
        $.ajax({
            url:"https://api.openweathermap.org/data/2.5/forecast?lat=-37.8500761&lon=144.9689996&units=metric&mode=xml&appid=ba2e04a9805c8d7ad6e8045605b86ab6",
            method:"GET",
            success: function(data){
                var section = $("section:last-of-type");
                var registros = $("forecast time", data);
                var section = document.createElement("section");
                var enc = document.createElement("h3");
                enc.textContent = "Información meteorológica del circuito";
                section.appendChild(enc);
                
                for(let i = 0 ; i < registros.length ; i++){
                    var element = registros[i];
                    if($(element).attr("from").split("T")[1]==="00:00:00"){
                        
                        var art = document.createElement("article");
                        var h = document.createElement("h4");
                        var maxTemp = document.createElement("p");
                        var minTemp = document.createElement("p");
                        var humedad = document.createElement("p");
                        var icono = document.createElement("img");
                        var lluvia = document.createElement("p");
                        
                        h.textContent = "Día: " + element.getAttribute("from").split("T")[0] + " - Hora: " + element.getAttribute("from").split("T")[1];
                        minTemp.textContent = "Temperatura mínima: " + $("temperature",element).attr("min") + "°C";
                        maxTemp.textContent = "Temperatura máxima: " + $("temperature",element).attr("max")  + "°C";
                        humedad.textContent = "Humedad: " + $("humidity",element).attr("value") + $("humidity",element).attr("unit");
                        lluvia.textContent = "Cantidad de lluvia del día: no encontrada";
                        
                        icono.setAttribute("src", "https://openweathermap.org/img/wn/" + $("symbol",element).attr("var") + "@2x.png")
                        icono.setAttribute("alt", "La descripción climática es " + $("symbol",element).attr("name"));

                        art.appendChild(h);
                        art.appendChild(icono);
                        art.appendChild(minTemp);
                        art.appendChild(maxTemp);
                        art.appendChild(humedad);
                        art.appendChild(lluvia);
                        section.appendChild(art);
                        
                    }
                }
                document.querySelector("main").appendChild(section);
            },
            error: function(error) {
                console.log(error);
            }
        })
            
    }
}