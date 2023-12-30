import { Hotel } from "./hotel.js";
import { PocetniEkran } from "./pocetniekran.js";
import { Prikaz } from "./prikaz.js";

var dodaj1 = new PocetniEkran();


var labNaziv = document.createElement("label");
labNaziv.innerHTML = "Unesite naziv kategorijaa:";
document.body.appendChild(labNaziv);

var input = document.createElement("input");
input.className = "sifrakategorijaa";
input.type = "number";
document.body.appendChild(input);

var dugme = document.createElement("button");
dugme.innerHTML = "Izaberi kategorija";
document.body.appendChild(dugme);

/*var rbkategorijaa = divHotel.querySelector(".redniBrojkategorijaa").value;*/

dugme.onclick = (ev) => {

    dodaj1.prikaz(document.body, input.value);

}