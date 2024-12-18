"use strict";
class Semaforo {
    constructor() {
        this.levels = [0.2,0.5,0.8]
        this.lights = 4;
        this.unload_moment = null;
        this.click_moment = null;
        this.randomDificulty()
        this.createStructure();
    }

    randomDificulty(){
        this.difficulty = this.levels[Math.floor(Math.random() * this.levels.length)];
    }

    createStructure(){
        var main = document.querySelector("main");
        var encabezado = document.createElement("h2");
        encabezado.textContent = "Juego del Semáforo";
        main.appendChild(encabezado);

        for(let i = 0 ; i<this.lights ; i++){
            var div = document.createElement("div");
            main.appendChild(div)
        }

        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.textContent = "Comenzar";
        btn.disabled = false;
        
        btn.onclick = this.initSequence.bind(this);
        main.appendChild(btn);

        btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.textContent = "Reacción";
        btn.disabled = true;
        //btn.addEventListener()
        
        btn.onclick = this.stopReaction.bind(this);
        main.appendChild(btn);
        
        var texto = document.createElement("p");
        main.appendChild(texto);

    }

    initSequence(){
        var texto = document.querySelector('main p');
        texto.textContent = "";

        var main = document.querySelector('main');
        main.classList.add('load');
        var btn = document.querySelector('main button:first-of-type');
        btn.disabled = true;
        setTimeout(()=>{this.unload_moment = Date.now();this.endSequence()}, 2000 + this.difficulty*100);
    }

    endSequence(){
        var btn = document.querySelector('main button:last-of-type');
        btn.disabled = false;
        var main = document.querySelector('main');
        main.classList.add("unload");
    }

    stopReaction(){
        var btn = document.querySelector('main button:last-of-type');
        btn.disabled = true;
        btn = document.querySelector('main button:first-of-type');
        btn.disabled = false;
        this.click_moment = Date.now();
        this.reaccion = this.click_moment - this.unload_moment;

        var texto = document.querySelector('main p');
        texto.textContent = "Has tardado un total de: " + this.reaccion.toString() + " ms";
        
        var main = document.querySelector('main');
        main.classList.remove("load");
        main.classList.remove("unload");

        this.createRecordForm();
    }

    createRecordForm(){
        var txfNombre = document.createElement("input");
        var txfApellidos = document.createElement("input");
        var txfTiempo = document.createElement("input");
        var txfDificultad = document.createElement("input");
        var form = document.createElement("form");
        var section = document.createElement("section");
        var enc = document.createElement("h3");
        enc.textContent = "Guarda tu récord"

        txfTiempo.textContent = this.reaccion.toString();
        txfTiempo.disabled = true;

        txfDificultad.textContent = this.difficulty.toString();
        txfDificultad.disabled = true;

        form.appendChild(txfNombre);
        form.appendChild(txfApellidos);
        form.appendChild(txfTiempo);
        form.appendChild(txfDificultad);
        section.appendChild(enc);
        section.appendChild(form);
        document.querySelector("main").appendChild(section);
    }
}