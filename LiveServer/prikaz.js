import { Hotel } from "./hotel.js";
import { Soba } from "./soba.js";

export class Prikaz {
    constructor() {
        this.kontejner = null;
        this.kontejner1 = null;
        //  this.idkategorijaa = this.idkategorijaa;
    }
    prikaz(host) {

        /*var labNaziv = document.createElement("label");
        labNaziv.innerHTML = "Unesite naziv kategorijaa:";
        host.appendChild(labNaziv);*/
        this.kontejner1 = host;

        /*var idkategorijaa = document.createElement("input");
        idkategorijaa.className = "sifrakategorijaa";
        idkategorijaa.type = "number";
        host.appendChild(idkategorijaa);*/

        var dugme = document.createElement("button");
        dugme.innerHTML = "Izaberi kategorija";
        document.body.appendChild(dugme);

        var selectA = document.createElement("select");
        selectA.name = "kategorijaSelect";
        //selectA.required = true;
        host.appendChild(selectA);

        fetch("https://localhost:5001/Hotel/Preuzimanjekategorijaa", {

            method: "GET"
        }).then(p => p.json().then(data => {
            data.forEach(kategorija => {
                var opcija = document.createElement("option");
                opcija.value = kategorija.id;
                opcija.innerHTML = kategorija.naziv;
                selectA.appendChild(opcija);
                console.log(opcija.value);
            });
        }));



        dugme.onclick = (ev) => {

            var pronadjeniDivovi = this.kontejner1.querySelectorAll(".divDisplay");
            pronadjeniDivovi.forEach(pronadjenDiv1 => {
                if (pronadjenDiv1 != null) {
                    pronadjenDiv1.remove();
                }
            })

            var asel = document.querySelector('select[name="kategorijaSelect"]').value;
            fetch("https://localhost:5001/Hotel/PreuzimanjeHotel/" + asel, {
                method: "GET"
            }).then(p => p.json().then(data => {
                data.forEach(elem => {


                    this.kontejner = divDisplay;
                    var divDisplay = document.createElement("div");
                    divDisplay.className = "divDisplay";
                    this.kontejner1.appendChild(divDisplay);


                    var divUnosPodataka = document.createElement("div");
                    divUnosPodataka.className = "divUnosPodataka";
                    divDisplay.appendChild(divUnosPodataka);


                    var divDisplayTermina = document.createElement("div");
                    divDisplayTermina.className = "divPrikaz";
                    divDisplay.appendChild(divDisplayTermina);


                    let ak = new Hotel(elem.id, elem.naziv, elem.lokacija);
                    let divHotel = document.createElement("div");
                    divHotel.className = "divHotel";
                    divDisplay.appendChild(divHotel);

                    ak.crtanjePrikazaHotela(divHotel, ak.id);
                    ak.crtanjeDodavanjeDestinacijeUnutarHotela(divUnosPodataka);
                    ak.crtanjeDodavanjeSobaaUOkviruHotela(divUnosPodataka);


                });
            }));
        }
    }
}