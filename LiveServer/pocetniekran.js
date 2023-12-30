import { Hotel } from "./hotel.js";
import { Soba } from "./soba.js"
import { Gost } from "./gost.js";

export class PocetniEkran {
    constructor() {
        this.kontejner = null;
    }
    prikaz(host) {

        /*var divkategorija = document.createElement("div");
        divkategorija.className = "divkategorija";
        divAdd.appendChild(divkategorija); //////////////////////

        fetch("https://localhost:5001/Hotel/Preuzimanjekategorijaa", {

            method: "GET"
        }).then(p => p.json().then(data => {
            var opcija1 = document.createElement("option");
            opcija1.value = data[data.length - 1].id;
            opcija1.innerHTML = data[data.length - 1].naziv + " " + data[data.length - 1].lokacija;
            var selektAK = document.querySelector('select[name="sel"]'); //////////////////////////////////////
            selektAK.appendChild(opcija1);

        }));*/

        var mainDiv = document.createElement("div");
        mainDiv.className = "mainDiv";
        this.kontejner = mainDiv;
        host.appendChild(this.kontejner);

        var divAdd = document.createElement("div");
        divAdd.className = "divAdd";
        this.kontejner.appendChild(divAdd);


        var divHotel = document.createElement("div");
        divHotel.className = "divHotel1";
        divAdd.appendChild(divHotel);

        var divSoba = document.createElement("div");
        divSoba.className = "divSoba";
        divAdd.appendChild(divSoba);

        var divGost = document.createElement("div");
        divGost.className = "divGost";
        divAdd.appendChild(divGost);

        var divDisplay = document.createElement("div");
        divDisplay.className = "divDisplay";
        mainDiv.appendChild(divDisplay);

        var divUnosPodataka = document.createElement("div");
        divUnosPodataka.className = "divUnosPodataka";
        divDisplay.appendChild(divUnosPodataka);

        var divDisplayTermina = document.createElement("div");
        divDisplayTermina.className = "divPrikaz";
        divDisplay.appendChild(divDisplayTermina);

        let AVIOKOMPANY = new Hotel();
        AVIOKOMPANY.crtanjeDodavanjeHotel(divHotel);

        let Room = new Soba();
        Room.crtanjeDodavanjeSobaa(divSoba, 1);

        let Host = new Gost();
        Host.crtanjeDodavanjeDestinacije(divGost);

    }
}