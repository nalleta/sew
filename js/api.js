
class Relaciones{
    constructor() {
        this.elementos = [
            { circuito: "Sakhir", pais: "Bahrein" },
            { circuito: "Jeddah", pais: "Arabia Saudí" },
            { circuito: "Albert Park", pais: "Australia" },
            { circuito: "Suzuka", pais: "Japón" },
            { circuito: "Shanghái", pais: "China" },
            { circuito: "Miami International Autodrome", pais: "Estados Unidos" },
            { circuito: "Autódromo Enzo e Dino Ferrari", pais: "Italia" },
            { circuito: "Monte Carlo", pais: "Mónaco" },
            { circuito: "Circuito Gilles Villeneuve", pais: "Canadá" },
            { circuito: "Montmeló", pais: "España" },
            { circuito: "Red Bull Ring", pais: "Austria" },
            { circuito: "Silverstone", pais: "Reino Unido" },
            { circuito: "Hungaroring", pais: "Hungría" },
            { circuito: "Spa-Francorchamps", pais: "Bélgica" },
            { circuito: "Zandvoort", pais: "Países Bajos" },
            { circuito: "Monza", pais: "Italia" },
            { circuito: "Bakú", pais: "Azerbaiyán" },
            { circuito: "Marina Bay", pais: "Singapur" },
            { circuito: "Circuito de Las Américas", pais: "Estados Unidos" },
            { circuito: "Autódromo Hermanos Rodríguez", pais: "México" },
            { circuito: "Autódromo de Interlagos", pais: "Brasil" },
            { circuito: "Las Vegas Street Circuit", pais: "Estados Unidos" },
            { circuito: "Losail", pais: "Catar" },
            { circuito: "Yas Marina", pais: "Emiratos Árabes Unidos" }
        ];

        document.addEventListener(
            "keydown",
            (e) => {
              if (e.key === "Enter") {
                this.toggleFullScreen();
              }
            },
            false,
        );

        this.restart();
    }

    restart(){
        Array.from($("main section:nth-of-type(3) article")).forEach(element => {
            element.remove();
        });
        Array.from($("main section:nth-of-type(4) article")).forEach(element => {
            element.remove();
        });
        
        this.shuffleElements();

        this.paises = this.elementos.map(elemento => elemento.pais);
        this.circuitos = this.elementos.map(elemento => elemento.circuito);

        this.shuffleComponents();
        this.initListeners();
    }

    shuffleElements(){
        let currentIndex = this.elementos.length;
        while (currentIndex !== 0) {
            // Pick a remaining element
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element
            let temporaryValue = this.elementos[currentIndex];
            this.elementos[currentIndex] = this.elementos[randomIndex];
            this.elementos[randomIndex] = temporaryValue;
        }

        if(this.elementos.length>24){
            this.elementos = this.elementos.slice(0,24);
        }

        this.numberOfElementsCompleted = 0;

    }

    shuffleComponents(){

        let currentIndex = this.paises.length;
        while (currentIndex !== 0) {
            // Pick a remaining element
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element
            let temporaryValue = this.paises[currentIndex];
            this.paises[currentIndex] = this.paises[randomIndex];
            this.paises[randomIndex] = temporaryValue;
        }

        currentIndex = this.elementos.length;
        while (currentIndex !== 0) {
            // Pick a remaining element
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element
            let temporaryValue = this.circuitos[currentIndex];
            this.circuitos[currentIndex] = this.circuitos[randomIndex];
            this.circuitos[randomIndex] = temporaryValue;
        }
    }

    initListeners(){
        var section1 = document.querySelector("main section:nth-of-type(3)");
        var section2 = document.querySelector("main section:nth-of-type(4)");

        this.circuitos.forEach(element => {
            var article = document.createElement("article");
            var p = document.createElement("h5");
            article.draggable = true;
            p.innerText = element;

            article.addEventListener('dragstart', this.dragStart.bind(this));
            
            // Eventos móviles
            article.addEventListener("touchstart", this.handleTouchStart.bind(this));
            article.addEventListener("touchmove", this.handleTouchMove.bind(this));
            article.addEventListener("touchend", this.handleTouchEnd.bind(this));

            article.appendChild(p)
            section1.appendChild(article);
        });

        this.paises.forEach(element => {
            var article = document.createElement("article");
            article.draggable = true;
            
            article.addEventListener('dragover', this.dragOver);
            article.addEventListener('drop', this.drop.bind(this));

            // Eventos móviles
            article.addEventListener("touchmove", this.handleTouchMoveOver.bind(this));
            article.addEventListener("touchend", this.handleTouchEndDrop.bind(this));

            var p = document.createElement("h5");
            p.innerText = element;

            article.appendChild(p)
            section2.appendChild(article);
        });
    }

    handleTouchEnd(e) {
        e.preventDefault();
        var finMovimiento = e.changedTouches[0];
        var articlePais = document.elementFromPoint(finMovimiento.clientX, finMovimiento.clientY);
        var xpos = finMovimiento.clientX;
        while(articlePais.tagName === "H5"){
            articlePais = document.elementFromPoint(xpos++, finMovimiento.clientY);
        }
        // Si lo ha soltado en un elemento y es un artículo es donde deseamos
        if (articlePais && articlePais.tagName === "ARTICLE") {
            var circuito = this.elementoTocado.innerText;
            var pais = articlePais.innerText;
            this.elementos.forEach(elemento => {
                if(elemento.pais === pais && elemento.circuito === circuito){
                    this.elementoTocado.remove();
                    articlePais.remove();
                }
            });
        }

        this.elementoTocado = null;
        this.registroMovimientoTouchX = 0;
        this.registroMovimientoTouchY = 0;
    }

    handleTouchMove(e) {
        e.preventDefault();
    }
    handleTouchMoveOver(e) {
        e.preventDefault();
    }
    handleTouchEndDrop(e) {
        e.preventDefault(); 
    }
    handleTouchStart(e) {
        e.preventDefault(); // Evita comportamiento por defecto
        this.elementoTocado = e.currentTarget; // Guarda el artículo tocado
    }

    drop(event) {
        event.preventDefault();
        this.elementos.forEach(elemento => {
            if(elemento.pais === event.currentTarget.innerText && elemento.circuito === event.dataTransfer.getData('text/plain')){
                Array.from($("main section:nth-of-type(3) article")).forEach(element => {
                    if(element.innerText === event.dataTransfer.getData('text/plain')){
                        event.currentTarget.remove();
                        element.remove();
                        this.numberOfElementsCompleted++;
                    }
                });
            }
        });
    }

    toggleFullScreen() {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }

    dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.innerText);
    }

    readInputFile(file) {
        file = file[0];
        var tipoTexto = /text.*/;
        if (file.type.match(tipoTexto)) 
        {
            var lector = new FileReader();
            lector.onload = function () {
                var result = lector.result;
                var lineas = result.split("\n");
                this.elementos = [];
                lineas.forEach(linea => {
                    linea = linea.trim("\r");
                    var componentes = linea.split("_");
                    this.elementos = this.elementos.concat([{ circuito: componentes[0], pais: componentes[1] }]);
                });
                this.restart();
            }.bind(this);
            lector.readAsText(file);
        }
        else {
          errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }  
    }
}
