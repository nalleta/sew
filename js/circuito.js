"use strict";
class Circuito{
  procesaArchivos(files){
    var tipoXML = /.xml$/;
    var tipoKML = /.kml$/;
    var tipoSVG = /.svg$/;
    Array.from(files).forEach(archivo => {
      if(archivo.name.match(tipoXML)){
        this.leerArchivoXML(archivo);
      }else if(archivo.name.match(tipoKML)){
        this.leerArchivoKML(archivo);
      }else if(archivo.name.match(tipoSVG)){
        this.leerArchivoSVG(archivo);
      }
    });
  }

  leerArchivoXML(archivo) 
  { 
    //Solamente toma un archivo
    //var archivo = document.getElementById("archivoTexto").files[0];
    //Solamente admite archivos de tipo texto
    var tipoTexto = /.xml$/;
    if (archivo.type.match(tipoTexto)) 
    {
          let lector = new FileReader();
          lector.onload = function (evento) {

            var datos = $.parseXML(lector.result);
            var circuito = $("circuitos circuito", datos);
            var seccion = document.querySelector("main section:last-of-type");

            var enc = document.createElement("h4");
            enc.textContent = $("nombre", circuito).text();

            var localizacion = document.createElement("p");
            localizacion.textContent = "Localización: " + $("localidad", circuito).text() + ", " + $("pais", circuito).text();

            var longitud = document.createElement("p");
            longitud.textContent = "Longitud: " + $("longitud", circuito).text() + " " + $("longitud", circuito).attr("magnitud");

            var anchura = document.createElement("p");
            anchura.textContent = "Anchura media: " + $("anchura", circuito).text() + " " + $("longitud", circuito).attr("magnitud");

            var nvueltas = document.createElement("p");
            nvueltas.textContent = "Número de vueltas: " + $("vueltas", circuito).text() + " vueltas";
            
            var fecha = document.createElement("p");
            fecha.textContent = "Fecha de la carrera en España: " + $("fecha", circuito).text() + " a las " + $("hora", circuito).text();

            seccion.appendChild(enc);
            seccion.appendChild(localizacion);
            seccion.appendChild(longitud);
            seccion.appendChild(anchura);
            seccion.appendChild(nvueltas);
            seccion.appendChild(fecha);

            enc = document.createElement("h5");
            enc.textContent = "Coordenadas del circuito";
            seccion.appendChild(enc);

            var p = document.createElement("p");

            enc.textContent = "Coordenadas iniciales: lon-" + $("coordenadas", circuito).attr("longitud") + 
                              ", lat-" + $("coordenadas", circuito).attr("latitud") + 
                              ", alt-" + $("coordenadas", circuito).attr("altitud") ;
                              
            seccion.appendChild(p);

            var tramos = $("tramos", circuito);
            for(var i = 1 ; i<=$("tramos tramo", circuito).length ; i++){
              var tramo = $("tramo:nth-of-type("+(i+1)+")", tramos);
              enc = document.createElement("p");
              enc.textContent = "Segmento " + i;
              seccion.appendChild(enc);
              p = document.createElement("p");
              p.textContent = "Tramo: " + tramo.attr("numero");
              seccion.appendChild(p);

              p = document.createElement("p");
              var dist = $("distancia", tramo);
              p.textContent = "Distancia del segmento: " + dist.text() + dist.attr("magnitud");
              seccion.appendChild(p);

              p = document.createElement("p");
              var coord = $("coordenadas", tramo);
              p.textContent = "Coordenadas iniciales: lon: " + coord.attr("longitud") + 
                              ", lat: " + coord.attr("latitud") + 
                              ", alt: " + coord.attr("altitud") ;
              seccion.appendChild(p);
            }

            enc = document.createElement("h5");
            enc.textContent = "Fuentes";
            seccion.appendChild(enc);

            var nav = document.createElement("nav");
            for(var i = 0 ; i<$("fuente", circuito).length ; i++){
              enc = document.createElement("h6");
              enc.textContent = "Enlace número "+i;
              seccion.appendChild(enc);
              //console.log($("fuente:nth-of-type("+(i+1)+")", circuito));
              var enlace = $("fuente:nth-of-type("+(i+1)+")", circuito);
              var a = document.createElement("a");
              a.textContent = "Enlace";
              a.href = enlace.text();
              seccion.appendChild(a);
            }
            seccion.appendChild(nav);

            enc = document.createElement("h5");
            enc.textContent = "Multimedia";
            seccion.appendChild(enc);

            enc = document.createElement("h6");
            enc.textContent = "Imágenes";
            seccion.appendChild(enc);

            for(var i = 0 ; i<$("fotografia", circuito).length ; i++){
              enc = document.createElement("h6");
              enc.textContent = "Imágen " + (i+1);
              
              var foto = $("fotografia:nth-of-type("+(i+1)+")", circuito);
              var img = document.createElement("img");
              img.src = foto.text();
              img.alt = "Imagen relacionada con el circuito " + i;
              seccion.appendChild(enc);
              seccion.appendChild(img);
            }


            enc = document.createElement("h6");
            enc.textContent = "Vídeos";
            seccion.appendChild(enc);

            for(var i = 0 ; i<$("video", circuito).length ; i++){
              var foto = $("video:nth-of-type("+(i+1)+")", circuito);
              var v = document.createElement("video");
              v.src = foto.text();
              v.alt = "Video relacionado con el circuito número " + i;
              v.controls = true;
              seccion.appendChild(v);
            }
          }      
        lector.readAsText(archivo);
      }
        
  };

  leerArchivoKML(archivo) {
    var coordenadas;
    let lector = new FileReader();
    lector.onload = function (evento) {

      var enc = document.createElement("h4");
      enc.textContent = "Tu mapa del circuito";
      $("main section:last-of-type").append(enc);

      var datos = $.parseXML(lector.result);
      coordenadas = Array.from($("kml document placemark linestring coordinates", datos).text().split("\n").slice(1,-1));
      //console.log(coordenadas);
      var centro = {
        lat: parseFloat(coordenadas[0].split(",")[1])
        , lng: parseFloat(coordenadas[0].split(",")[0])
      };

      var img = document.createElement('div')
      var mapaGeoposicionado = new google.maps.Map(img,{
          zoom: 10,
          center: centro,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      coordenadas = coordenadas.map(element => ({
          lat: parseFloat(element.split(",")[1]), 
          lng: parseFloat(element.split(",")[0])
      }));

      coordenadas.forEach(element => {
          new google.maps.Marker({
          position: element,
          title: "Parte del circuito"
        }).setMap(mapaGeoposicionado);
      });

      const mapPath = new google.maps.Polyline({
        path: coordenadas,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      mapPath.setMap(mapaGeoposicionado);
      $("main section:last-of-type").append(img);
    }
    
    lector.readAsText(archivo);
  };

  leerArchivoSVG(archivo){
    let lector = new FileReader();
    lector.onload = () => {
      var seccion = $("section:last-of-type");
      var enc = document.createElement("h3");
      enc.textContent = "Altimetría de tu circuito";
      seccion.append(enc);
      seccion.append(lector.result);
    }
    lector.readAsText(archivo)
  }
}