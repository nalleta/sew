"use strict";
class Noticias {

    readInputFile(file) {
        file = file[0];
        var tipoTexto = /text.*/;
        if (file.type.match(tipoTexto)) 
        {
            var lector = new FileReader();
            
            lector.onload = function (evento) {
                var seccion = document.querySelector("main section:last-of-type");

                var result = lector.result;
                var noticias = result.split("\n");
                noticias.forEach(noticia => {
                    var articulo = document.createElement("article");
                    var componentes = noticia.split("_");

                    var enc = document.createElement("h3");
                    enc.innerText = componentes[0];
                    articulo.appendChild(enc);

                    var parrafo = document.createElement("p");
                    parrafo.innerText = componentes[1];
                    articulo.appendChild(parrafo);

                    var autoria = document.createElement("p");
                    autoria.innerText = componentes[2];
                    articulo.appendChild(autoria);

                    seccion.appendChild(articulo);
                });
            }      
            lector.readAsText(file);
        }
        else {
          errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
          }  
    }

    parseFields(){
        var seccion = document.querySelector("main section:last-of-type");
        var articulo = document.createElement("article");

        if (document.querySelector("main section:first-of-type input:first-of-type").value.trim() === "") {
            return;
        }

        var enc = document.createElement("h3");
        enc.innerText = document.querySelector("main section:first-of-type input:first-of-type").value;
        articulo.appendChild(enc);

        var parrafo = document.createElement("p");
        parrafo.innerText = document.querySelector("main section:first-of-type input:nth-of-type(2)").value;
        articulo.appendChild(parrafo);

        var autoria = document.createElement("p");
        autoria.innerText = document.querySelector("main section:first-of-type input:last-of-type").value;
        articulo.appendChild(autoria);

        seccion.appendChild(articulo);
    }
}

