import { ZakazanTermin } from "./zakazanTermin.js";
export class Gost {
    constructor(id, naziv, zemlja, jmbg) {
        this.id = id;
        this.naziv = naziv;
        this.zemlja = zemlja;
        this.jmbg = jmbg; ////
        this.kontejner = null;
    }

    crtanjeDodavanjeDestinacije(divGost) {
            var h2 = document.createElement("h2");
            h2.innerHTML = "Kreiranje goste";
            divGost.appendChild(h2);

            var newLine = document.createElement("br");
            divGost.appendChild(newLine);

            var labNaziv = document.createElement("label");
            labNaziv.innerHTML = "Unesite naziv goste:";
            divGost.appendChild(labNaziv);

            newLine = document.createElement("br");
            divGost.appendChild(newLine);

            var input = document.createElement("input");
            input.className = "nazivGosta";
            input.type = "text";
            divGost.appendChild(input);

            newLine = document.createElement("br");
            divGost.appendChild(newLine);

            var labzemlja = document.createElement("label");
            labzemlja.innerHTML = "Unesite adresu i državu gosta:";
            divGost.appendChild(labzemlja);

            newLine = document.createElement("br");
            divGost.appendChild(newLine);

            input = document.createElement("input");
            input.className = "zemljaGosta";
            input.type = "text";
            divGost.appendChild(input);

            newLine = document.createElement("br");
            divGost.appendChild(newLine);

            var labjmbg = document.createElement("label");
            labjmbg.innerHTML = "jmbg:";
            divGost.appendChild(labjmbg);

            newLine = document.createElement("br");
            divGost.appendChild(newLine);

            input = document.createElement("input");
            input.className = "jmbg";
            input.type = "text";
            divGost.appendChild(input);

            newLine = document.createElement("br");
            divGost.appendChild(newLine);

            var dugme = document.createElement("button");
            dugme.innerHTML = "Dodaj gost";
            dugme.className = "DodavanjeGost";

            divGost.appendChild(dugme);

            dugme.onclick = (ev) => {
                var nazivGosta = divGost.querySelector(".nazivGosta").value;
                var zemlja = divGost.querySelector(".zemljaGosta").value;
                var jmbg = divGost.querySelector(".jmbg").value;

                if ((nazivGosta == "") || (zemlja == "") || (jmbg == "")) {
                    alert("Neophodno je uneti pravilne podatke"); /////////////////////
                } else {
                    fetch("https://localhost:5001/Hotel/DodavanjeGost", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "naziv": nazivGosta,
                            "zemlja": zemlja,
                            "jmbg": jmbg,
                        })
                    }).then(p => {
                        if (p.ok) {
                            alert("Uspesno ste dodali gostu!");
                        } else {
                            alert("Greska prilikom dodavanja goste!");
                        }
                    });
                }
            }
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////
    iscrtavanjePodatakaODestinaciji(divTermin, destSobaID, novTermin, odlazniTermin, novaduzinaTermina) {
        let podaciOTerminovimaOdredjenogSobaa = document.createElement("div");
        podaciOTerminovimaOdredjenogSobaa.className = "podaciOTerminovimaOdredjenogSobaa";
        divTermin.appendChild(podaciOTerminovimaOdredjenogSobaa)
        this.kontejner = podaciOTerminovimaOdredjenogSobaa;

        if (odlazniTermin == 1)
            this.kontejner.style.backgroundColor = "lightblue";
        else if (odlazniTermin == 0)
            this.kontejner.style.backgroundColor = "gold"

        var lab = document.createElement("label");
        lab.innerHTML = "naziv goste";
        podaciOTerminovimaOdredjenogSobaa.appendChild(lab);

        var select = document.createElement("select");
        select.className = "selectDestinacije";
        select.style.display = "none"
        podaciOTerminovimaOdredjenogSobaa.appendChild(select);

        fetch("https://localhost:5001/Hotel/PreuzimanjeGost", {

            method: "GET"
        }).then(p => p.json().then(data => {
            data.forEach(gost => {
                let option = document.createElement("option");
                option.value = gost.id;
                option.innerHTML = gost.naziv;
                select.appendChild(option);
            });
        }));
        /////////////////////////////////////////////////////////////////
        var inputNaziv = document.createElement("input");
        inputNaziv.value = this.naziv;
        podaciOTerminovimaOdredjenogSobaa.appendChild(inputNaziv);
        inputNaziv.className = "inputNaziv";

        var lab = document.createElement("label");
        lab.innerHTML = "adresa i zemlja gosta";
        podaciOTerminovimaOdredjenogSobaa.appendChild(lab);

        var inputZemlja = document.createElement("input");
        inputZemlja.value = this.zemlja;
        podaciOTerminovimaOdredjenogSobaa.appendChild(inputZemlja);
        inputZemlja.className = "inputZemlja";

        var lab = document.createElement("label");
        lab.innerHTML = "jmbg";
        podaciOTerminovimaOdredjenogSobaa.appendChild(lab);

        var inputjmbg = document.createElement("input");
        inputjmbg.value = this.jmbg;
        podaciOTerminovimaOdredjenogSobaa.appendChild(inputjmbg);
        inputjmbg.className = "inputAirport";

        var lab = document.createElement("label");
        var poletanjesletanje = (odlazniTermin == 1) ? "poletanja " : "sletanja";
        lab.innerHTML = "vreme " + poletanjesletanje;
        podaciOTerminovimaOdredjenogSobaa.appendChild(lab);

        var inputVreme = document.createElement("input");
        inputVreme.value = novTermin;
        inputVreme.type = "datetime";
        inputVreme.className = "inputVreme";

        console.log(odlazniTermin);

        var inputDuzina = document.createElement("input");
        inputDuzina.value = novaduzinaTermina;
        inputDuzina.type = "input";
        inputDuzina.className = "inputDuzina";

        podaciOTerminovimaOdredjenogSobaa.appendChild(inputVreme);

        var lab = document.createElement("label");
        lab.innerHTML = "trajanje boravka u danima";
        podaciOTerminovimaOdredjenogSobaa.appendChild(lab);
        podaciOTerminovimaOdredjenogSobaa.appendChild(inputDuzina);

        let dugmeUpdate = document.createElement("button");
        dugmeUpdate.innerHTML = "Izmena"; ///////////////////////////////////////

        podaciOTerminovimaOdredjenogSobaa.appendChild(dugmeUpdate);

        let dugmeSave = document.createElement("button");
        dugmeSave.innerHTML = "Sacuvaj"; /////////////////////////////////////
        dugmeSave.style.display = "none";
        podaciOTerminovimaOdredjenogSobaa.appendChild(dugmeSave);

        let dugmeObrisi = document.createElement("button");
        dugmeObrisi.innerHTML = "Brisanje";
        podaciOTerminovimaOdredjenogSobaa.appendChild(dugmeObrisi);

        dugmeObrisi.onclick = (ev) => {
            fetch("https://localhost:5001/Hotel/brisanjeZakazanogTermina/" + destSobaID, {
                method: "DELETE"
            }).then(p => {
                if (p.ok) {
                    this.kontejner.style.display = "none";
                } else {
                    alert("Doslo je do greske!");
                }
            });
        }

        inputVreme.disabled = true;
        inputjmbg.disabled = true;
        inputZemlja.disabled = true;
        inputNaziv.disabled = true;
        inputDuzina.disabled = true;

        dugmeUpdate.onclick = (ev) => { ///////////
            inputVreme.disabled = false;
            inputDuzina.disabled = false;
            select.style.display = "block";
            inputNaziv.style.display = "none";
            dugmeUpdate.style.display = "none";
            dugmeSave.style.display = "block";

            dugmeSave.onclick = (ev) => {
                let novoVreme = this.kontejner.querySelector(".inputVreme").value;
                let gostNoviID = this.kontejner.querySelector(".selectDestinacije").value; //!
                let gostNovi = this.kontejner.querySelector(".selectDestinacije")[gostNoviID - 1].text;
                let novaduzinaTermina = this.kontejner.querySelector(".inputDuzina").value;
                //   console.log(gostNovi);
                fetch("https://localhost:5001/Hotel/izmenaZakazanogTermina/" + destSobaID + "/" + novoVreme + "/" + gostNoviID + "/" + novaduzinaTermina, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(p => {
                    if (p.ok) {
                        fetch("https://localhost:5001/Hotel/PreuzimanjeDestinacije/" + gostNoviID, {
                            method: "GET"
                        }).then(p => p.json().then(data => {
                            let preuzetaGost = new Gost(data.id, data.naziv, data.zemlja, data.jmbg);
                            inputZemlja.value = preuzetaGost.zemlja;
                            inputjmbg.value = preuzetaGost.jmbg;
                        }));;
                        inputNaziv.value = gostNovi;
                        inputVreme.innerHTML = novoVreme.value;
                        inputDuzina.innerHTML = novaduzinaTermina.value;

                        inputNaziv.style.display = "block";
                        select.style.display = "none";
                        inputZemlja.style.display = "block";
                        dugmeSave.style.display = "none";
                        dugmeUpdate.style.display = "block";
                        inputVreme.disabled = true;
                        inputDuzina.disabled = true;
                        inputjmbg.disabled = true;
                        inputZemlja.disabled = true;
                        inputNaziv.disabled = true;
                    } else {
                        alert("Izmena nije uspesna");
                    }
                });
            }
        }

    }
}