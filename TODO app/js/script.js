/*
 *	Todo aplikacija
 *	Dodaj, ukloni te označi obavljenim zadatak
 */

 /* samopozivajuća funkcija: omogućiti će nam da ograničimo doseg njenih članova */
 (function(){
    "use strict";

    /*	funkcija konstruktora */
    function Todo(){
        /* dohvaćanje pojedini HTML elemenata -> konstante dostupne samo unutar funkcije konstruktora Todo() */
		const polje = document.querySelector("input"),
        gumbicDodaj = document.querySelector("button"),
        lista = document.querySelector("ul");

        /* deklaracija funkcija za upravljanje listom -> dostupne samo unutar funkcije konstruktora Todo() */
        function oznaciObavljenim(event) {
			// const gumbicOznaci = this;
			const gumbicOznaci = event.target;
			gumbicOznaci.parentNode.classList.toggle("obavljeno");
		}

        function ukloniStavku(event) {
			const gumbicUkloni = event.target;
			gumbicUkloni.parentNode.remove();
			polje.focus();
		}

        function dodajGumbicUkloni(stavka) {
			const gumbicUkloni = document.createElement("div");
			
			gumbicUkloni.className = "gumbic-ukloni";
			gumbicUkloni.addEventListener("click", ukloniStavku);
			stavka.appendChild(gumbicUkloni);
		}

        function dodajGumbicOznaci(stavka) {
			const gumbicOznaci = document.createElement("input");
			
			gumbicOznaci.setAttribute("type", "checkbox");
			gumbicOznaci.addEventListener("click", oznaciObavljenim);
			// stavka.prepend(gumbicOznaci);
			stavka.insertBefore(gumbicOznaci, stavka.firstChild);
		}

        function kreirajStavku(text) {
			const stavka = document.createElement("li");
			
			stavka.innerText = text;
			dodajGumbicUkloni(stavka);
			dodajGumbicOznaci(stavka);
			return stavka;
		}

        function dodajStavku() {
			const text = polje.value.trim();
			if(text != ""){
				const stavka = kreirajStavku(text);
				lista.appendChild(stavka);
				polje.value = "";
				polje.focus();
			}
			else{
				alert("Upišite opis zadatka.");
				polje.focus();
			}
		}

        /* deklaracija metode -> dostupna preko objekta koji će se kreirati iz funkcije konstruktora */
		this.init = function() {
			gumbicDodaj.addEventListener("click", dodajStavku);
		};
    }

    /* kreiranje objekta iz funkcije konstruktora */
	const todo = new Todo();
    
    /* poziv metode init() -> nakon što se učita cijela stranica s vanjskim resursima */
	window.addEventListener("load", todo.init);

 })();