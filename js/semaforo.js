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
        var encabezado = document.createElement("h3");
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
        // Borrar los datos del formulario
        var formAntiguo = document.querySelector("main section:nth-of-type(2) form");
        if(formAntiguo != null){
            document.querySelector("main section:last-of-type h3").remove();
            formAntiguo.remove();
        }

        var texto = document.querySelector('main>p');
        texto.textContent = "";

        var section = document.querySelector('main');
        section.classList.add('load');
        var btn = document.querySelector('main>button:first-of-type');
        btn.disabled = true;
        setTimeout(()=>{this.unload_moment = Date.now();this.endSequence()}, 2000 + this.difficulty*100);
    }

    endSequence(){
        var btn = document.querySelector('main>button:last-of-type');
        btn.disabled = false;
        var section = document.querySelector('main');
        section.classList.add("unload");
    }

    stopReaction(){
        var btn = document.querySelector('main>button:last-of-type');
        btn.disabled = true;
        btn = document.querySelector('main>button:first-of-type');
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

    createRecordForm() {
        
        var lNombre = $("<label>").text("Nombre: ");
        var txfNombre = $("<input>").attr("name", "nombre");
        txfNombre.attr("required", true);
        lNombre.append(txfNombre);
        var pNombre = $("<p>");
        pNombre.append(lNombre);

        var txfApellidos = $("<input>").attr("name", "apellidos");
        txfApellidos.attr("required", true);
        var lApellidos = $("<label>").text("Apellidos: ");
        lApellidos.append(txfApellidos);
        var pApellidos = $("<p>");
        pApellidos.append(lApellidos);

        var txfTiempo = $("<input>").attr({
            "name": "tiempo",
            "value": (this.reaccion/1000),
            "readOnly": true
        });
        var lTiempo = $("<label>").text("Tiempo de reacción: ");
        lTiempo.append(txfTiempo);
        var pTiempo = $("<p>");
        pTiempo.append(lTiempo);


        var txfDificultad = $("<input>").attr({
            "name": "dificultad",
            "value": this.difficulty,
            "readOnly": true
        });
        var lDificultad = $("<label>").text("Dificultad: ");
        lDificultad.append(txfDificultad);
        var pDificultad = $("<p>");
        pDificultad.append(lDificultad);

        var form = $("<form>").attr({
            "action": "#",
            "method": "post",
            "name": "record"
        });
    
        var section = $("<section>");
        var enc = $("<h3>").text("Guarda tu récord");
    
        var subir = $("<input>").attr({
            "type": "submit",
            "value": "Guardar"
        });
        
        form.append(pNombre);
        form.append(pApellidos);
        form.append(pTiempo);
        form.append(pDificultad);
        form.append(subir);
        section.append(enc, form);
        $("main>button:nth-of-type(2)").after(section);
    }
}