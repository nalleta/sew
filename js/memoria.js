"use strict";
class Memoria {
    constructor() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        this.cartas = [
            {
                element:"RedBull",
                enlace:"https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"
            },{
                element:"RedBull",
                enlace:"https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"
            }, {
                element:"McLaren",
                enlace:"https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"
            }, {
                element:"McLaren",
                enlace:"https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"
            }, {
                element:"Alpine",
                enlace:"https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"
            }, {
                element:"Alpine",
                enlace:"https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"
            }, {
                element:"AstonMartin",
                enlace:"https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"
            }, {
                element:"AstonMartin",
                enlace:"https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"
            }, {
                element:"Ferrari",
                enlace: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"
            }, {
                element:"Ferrari",
                enlace: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"
            }, {
                element:"Mercedes",
                enlace:"https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"
            }, {
                element:"Mercedes",
                enlace:"https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"
            },
        ]

        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    shuffleElements(){
        let currentIndex = this.cartas.length;
        while (currentIndex !== 0) {
            // Pick a remaining element
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element
            let temporaryValue = this.cartas[currentIndex];
            this.cartas[currentIndex] = this.cartas[randomIndex];
            this.cartas[randomIndex] = temporaryValue;
        }
    }

    unflipCards(){
        this.lockBoard = true;
        setTimeout(()=>{
            this.firstCard.removeAttribute("data-state");
            this.secondCard.removeAttribute("data-state");
            this.resetBoard();
        }, 1600);
    }
    
    resetBoard(){
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch(){
        if(this.firstCard.getAttribute("data-element") === this.secondCard.getAttribute("data-element")){
            this.disableCards();
        }else{
            this.unflipCards();
        }
    }

    disableCards(){
        this.firstCard.setAttribute("data-state", "revealed")
        this.secondCard.setAttribute("data-state", "revealed");
        this.resetBoard();
    }

    createElements(){
        var secction = document.querySelector("main section:last-of-type");
        this.cartas.forEach(carta => {
            var article = document.createElement("article");
            var encabezado = document.createElement("h3");
            var img = document.createElement("img");
            encabezado.textContent = "Tarjeta de memoria";
            img.src = carta.enlace;
            img.alt = carta.element
            article.setAttribute("data-element", carta.element)
            article.appendChild(encabezado);
            article.appendChild(img);
            secction.appendChild(article);
        });
    }
    
    addEventListeners(){
        var articulos = document.querySelectorAll("main section:last-of-type article");
        articulos.forEach(articulo => {
            articulo.addEventListener("click", this.flipCard.bind(articulo, this))
        });
    }

    flipCard(game){
        if(game.lockBoard || this.getAttribute("data-state") == "revealed" || this === this.firstCard) return;

        this.setAttribute("data-state", "flip") 
        if(!game.hasFlippedCard){
            game.hasFlippedCard = true;
            game.firstCard = this;
        }else{
            game.secondCard = this;
            game.checkForMatch();
        }
    }
}
