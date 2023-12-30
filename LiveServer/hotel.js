import { Soba } from "./soba.js"
export class Hotel {
    constructor(id, naziv, lokacija) {
        this.id = id;
        this.naziv = naziv;
        this.lokacija = lokacija;
        this.sobai = new Array();
        this.kontejner = null;
        this.unosKontejner = null; ///sluzi za pamcenje levog diva za unos
    }

    crtanjeDodavanjeHotel(divHotel) {
        var h3 = document.createElement("h3");
        h3.innerHTML = "Kreiranje hotele";
        divHotel.appendChild(h3);

        var newLine = document.createElement("br");
        divHotel.appendChild(newLine);

        var labNaziv = document.createElement("label");
        labNaziv.innerHTML = "Unesite naziv hotela:";
        divHotel.appendChild(labNaziv);

        newLine = document.createElement("br");
        divHotel.appendChild(newLine);

        var input = document.createElement("input");
        input.className = "nazivHotel";
        input.type = "text";
        divHotel.appendChild(input);

        newLine = document.createElement("br");
        divHotel.appendChild(newLine);

        var lablokacija = document.createElement("label");
        lablokacija.innerHTML = "Unesite lokaciju sedišta hotele:";
        divHotel.appendChild(lablokacija);

        newLine = document.createElement("br");
        divHotel.appendChild(newLine);

        input = document.createElement("input");
        input.className = "lokacijaHotel";
        input.type = "text";
        divHotel.appendChild(input);

        newLine = document.createElement("br");
        divHotel.appendChild(newLine);

        var labIzborkategorijaa = document.createElement("label");
        labIzborkategorijaa.innerHTML = "Izaberite sifru kategorijaa";
        divHotel.appendChild(labIzborkategorijaa);

        newLine = document.createElement("br");
        divHotel.appendChild(newLine)

        input = document.createElement("input");
        input.className = "redniBrojkategorijaa";
        input.type = "number";
        divHotel.appendChild(input);


        newLine = document.createElement("br");
        divHotel.appendChild(newLine);

        var dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj hotel";
        dugme.className = "DodavanjeHotela";
        divHotel.appendChild(dugme);

        var rbkategorijaa = document.querySelector(".sifrakategorijaa").value;

        dugme.onclick = (ev) => {
            var naziv = divHotel.querySelector(".nazivHotel").value;
            var lokacija = divHotel.querySelector(".lokacijaHotel").value;
            //   var rbkategorijaa = divHotel.querySelector(".redniBrojkategorijaa").value;

            if ((naziv != "") && (lokacija != "")) {
                fetch("https://localhost:5001/Hotel/DodavanjeHotela", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "naziv": naziv,
                        "lokacija": lokacija
                    })
                }).then(p => {
                    if (p.ok) {
                        fetch("https://localhost:5001/Hotel/PreuzimanjeHotel/" + rbkategorijaa, {

                            method: "GET"
                        }).then(p => p.json().then(data => {
                            var opcija1 = document.createElement("option");
                            opcija1.value = data[data.length - 1].id;
                            opcija1.innerHTML = data[data.length - 1].naziv + " " + data[data.length - 1].lokacija;
                            var selektAK = document.querySelector('select[name="sel"]'); //////////////////////////////////////
                            selektAK.appendChild(opcija1);

                        }));
                        alert("Uspesno dodata i ucitana hotel!");
                    } else {
                        alert("Nepravilno uneti podaci");
                    }
                })
            } else alert("Nepravilno uneti podaci");
        }
    }

    crtanjeDodavanjeSobaaUOkviruHotela(divUnosPodataka) {
        var h3 = document.createElement("h3");
        h3.innerHTML = "Uključivanje sobaa";
        divUnosPodataka.appendChild(h3);
        this.unosKontejner = divUnosPodataka;

        var newLine = document.createElement("br");

        var labNaziv = document.createElement("label");
        labNaziv.innerHTML = "Unesite naziv sobe:";
        divUnosPodataka.appendChild(labNaziv);

        var input = document.createElement("input");
        input.className = "nazivSobaa";
        input.type = "text";
        divUnosPodataka.appendChild(input);

        var labSedista = document.createElement("label");
        labSedista.innerHTML = "Unesite broj sprata";
        divUnosPodataka.appendChild(labSedista);

        input = document.createElement("input");
        input.className = "brojSedista";
        input.type = "number";
        divUnosPodataka.appendChild(input);

        var labtip = document.createElement("label");
        labtip.innerHTML = "Izaberite tip sobe:";
        divUnosPodataka.appendChild(labtip);

        var selectTipSobaa = document.createElement("select");
        selectTipSobaa.name = "vrstaSobaa1";
        selectTipSobaa.required = true;
        divUnosPodataka.appendChild(selectTipSobaa);

        let tipoviSobaa = ["jednokrevetna", "dvokrevetna", "trokrevetna", "cetvorokrevetna"];

        /*let tipoviSobaa = ["Boeing 737", "Boeing 747", "Boeing 757", "Boeing 767", "Boeing 777", "Boeing 787", "Airbus 220", "Airbus 310", "Airbus 320", "Airbus 330", "Airbus 340", "Airbus 350", "Airbus 380"];
         */
        tipoviSobaa.forEach((tipSobaa, i) => {

            let opcija = document.createElement("option");
            opcija.value = tipoviSobaa[i];
            opcija.innerHTML = tipSobaa;
            selectTipSobaa.appendChild(opcija);
        })

        newLine = document.createElement("br");
        divUnosPodataka.appendChild(newLine);

        var dugme = document.createElement("button");
        dugme.innerHTML = "Otvaranje sobe za goste";
        dugme.className = "dodajSoba";
        divUnosPodataka.appendChild(dugme);

        newLine = document.createElement("br");
        divUnosPodataka.appendChild(newLine);

        var dugmeUcitajSobae = document.createElement("button");
        dugmeUcitajSobae.className = "dugmeUcitajSobae";
        dugmeUcitajSobae.innerHTML = "Učitavanje sobaa";
        divUnosPodataka.appendChild(dugmeUcitajSobae);

        var divPrikazSobaaZaRezervisanje = document.createElement("div");
        divPrikazSobaaZaRezervisanje.className = "divPrikazSobaaZaRezervisanje";
        divUnosPodataka.appendChild(divPrikazSobaaZaRezervisanje);

        dugme.onclick = (ev) => {

            var nazivSobaa = divUnosPodataka.querySelector(".nazivSobaa").value;
            var brojSedista = divUnosPodataka.querySelector(".brojSedista").value;
            var modelA = divUnosPodataka.querySelector('select[name="vrstaSobaa1"]').value;
            var idAk = this.id;

            if ((nazivSobaa != "") && (brojSedista != "")) {
                fetch("https://localhost:5001/Hotel/DodavanjeSobaa/" + idAk, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "kodniNaziv": nazivSobaa,
                        "brojSedista": brojSedista,
                        "model": modelA,
                    })
                }).then(p => {
                    if (p.ok) {

                        fetch("https://localhost:5001/Hotel/PreuzimanjePoslednjegSobaaIzHotela/ " + this.id, {
                            method: "GET"
                        }).then(p => p.json().then(data => {

                            let soba1 = new Soba(data.id, data.kodniNaziv, data.brojSedista, data.model);
                            soba1.prikaz(this.kontejner);
                            this.sobai.push(soba1);
                        }));
                        let dugmeUcitajSobae = this.unosKontejner.querySelector(".dugmeUcitajSobae");
                        this.pravljenjeTermina(divPrikazSobaaZaRezervisanje, dugmeUcitajSobae); ///

                        dugmeUcitajSobae.disabled = false;
                    } else {
                        alert("Nastala je greska prilikom dodavanja");
                    }
                });
            } else alert("Neophodno je uneti ispravne podatke!");
        }

        this.pravljenjeTermina(divPrikazSobaaZaRezervisanje, dugmeUcitajSobae);

    }
    crtanjeDodavanjeDestinacijeUnutarHotela(divGost) {
        var h3 = document.createElement("h3");
        h3.innerHTML = "Dodajte nove goste";
        divGost.appendChild(h3);

        var newLine = document.createElement("br");
        divGost.appendChild(newLine);

        var labNaziv = document.createElement("label");
        labNaziv.innerHTML = "Unesite naziv gosta:";
        divGost.appendChild(labNaziv);

        var input = document.createElement("input");
        input.className = "nazivGosta";
        input.type = "text";
        divGost.appendChild(input);


        var labzemlja = document.createElement("label");
        labzemlja.innerHTML = "Unesite adresu i državu gosta:";
        divGost.appendChild(labzemlja);

        input = document.createElement("input");
        input.className = "zemljaGosta";
        input.type = "text";
        divGost.appendChild(input);

        var labjmbg = document.createElement("label");
        labjmbg.innerHTML = "jmbg:";
        divGost.appendChild(labjmbg);

        input = document.createElement("input");
        input.className = "jmbg";
        input.type = "text";
        divGost.appendChild(input);

        var dugme = document.createElement("button");
        dugme.innerHTML = "Dodaj gosta";
        dugme.className = "DodavanjeGost";

        divGost.appendChild(newLine);

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
                        "Naziv": nazivGosta,
                        "zemlja": zemlja,
                        "jmbg": jmbg,
                    })
                }).then(p => {
                    if (p.ok) {

                        let divCheckGost = document.querySelector(".divCheck");
                        (divCheckGost.parentNode).appendChild(divCheckGost);

                        fetch("https://localhost:5001/Hotel/PreuzimanjePoslednjeDodateDestinacije", {
                            method: "GET"
                        }).then(p => p.json().then(data => {

                            var cekGost = document.createElement("input");
                            cekGost.type = "checkbox";
                            cekGost.value = data.id;
                            divCheckGost.appendChild(cekGost);

                            var labGost = document.createElement("label");
                            labGost.innerHTML = data.naziv;
                            divCheckGost.appendChild(labGost);

                        }));
                    } else {
                        alert("Greska prilikom dodavanja goste!");
                    }
                });
            }
        }
    }
    pravljenjeTermina(divPrikazSobaaZaRezervisanje, dugmeUcitajSobae) {
        var pronadjenDiv = this.unosKontejner.querySelector(".divPrikazSobaaZaRezervisanje1");
        if (pronadjenDiv != null) {
            pronadjenDiv.remove();
        }

        var divPrikazSobaaZaRezervisanje1 = document.createElement("div");
        divPrikazSobaaZaRezervisanje1.className = "divPrikazSobaaZaRezervisanje1";
        divPrikazSobaaZaRezervisanje.appendChild(divPrikazSobaaZaRezervisanje1);

        var h4 = document.createElement("h4");
        h4.innerHTML = "Kreiranje leta";
        divPrikazSobaaZaRezervisanje1.appendChild(h4);

        var newLine = document.createElement("br");
        divPrikazSobaaZaRezervisanje1.appendChild(newLine);

        var labGost = document.createElement("label");
        labGost.innerHTML = "Izbor gost:";
        labGost.className = "labGost";
        divPrikazSobaaZaRezervisanje1.appendChild(labGost);

        newLine = document.createElement("br");
        divPrikazSobaaZaRezervisanje1.appendChild(newLine);

        var divPrikazGost = document.createElement("div");
        divPrikazGost.className = "divPrikazGost";
        divPrikazSobaaZaRezervisanje1.appendChild(divPrikazGost);

        var divCheckGost = document.createElement("div");
        divCheckGost.className = "divCheck";
        divPrikazGost.appendChild(divCheckGost);

        fetch("https://localhost:5001/Hotel/PreuzimanjeGost", {
            method: "GET"
        }).then(p => p.json().then(data => {
            data.forEach(gost => {
                var cekGost = document.createElement("input");
                cekGost.type = "checkbox";
                cekGost.value = gost.id;
                divCheckGost.appendChild(cekGost);

                var labGost = document.createElement("label");
                labGost.innerHTML = gost.naziv;
                divCheckGost.appendChild(labGost);

            });
        }));
        newLine = document.createElement("br");
        divPrikazSobaaZaRezervisanje1.appendChild(newLine);

        newLine = document.createElement("br");
        divPrikazSobaaZaRezervisanje1.appendChild(newLine);
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        dugmeUcitajSobae.onclick = (ev) => {

            var divIzborSobaa = document.createElement("div");
            divIzborSobaa.className = "divIzborSobaa" + this.id;
            divIzborSobaa.innerHTML = "Izbor sobaa:"
            divPrikazSobaaZaRezervisanje1.appendChild(divIzborSobaa);

            fetch("https://localhost:5001/Hotel/PreuzimanjeSobaaIzHotela/" + this.id, {

                method: "GET"
            }).then(p => p.json().then(data => {
                data.forEach(soba => {
                    var divCheck = document.createElement("div");
                    divCheck.className = "soba" + soba.id; ///div nazvan po Sobau koji se tu ispisuje( zbog brisanja)
                    divIzborSobaa.appendChild(divCheck);

                    var cb = document.createElement("input");
                    cb.type = "checkbox";
                    cb.name = "soba";
                    cb.value = soba.id;
                    divCheck.appendChild(cb);

                    var labkodniNaziv = document.createElement("label");
                    labkodniNaziv.innerHTML = soba.kodniNaziv;
                    labkodniNaziv.className = "labRadio";
                    divCheck.appendChild(labkodniNaziv);

                    var br = document.createElement("br");
                    divCheck.appendChild(br);

                    var labOdlazni = document.createElement("label");
                    labOdlazni.innerHTML = "polupansion";
                    labOdlazni.className = "polupansion";
                    divCheck.appendChild(labOdlazni);

                    var rbOdlazni = document.createElement("input");
                    rbOdlazni.type = "radio";
                    rbOdlazni.name = "odlazniDolazni" + soba.id;
                    rbOdlazni.value = "polupansion" + soba.id;
                    divCheck.appendChild(rbOdlazni);

                    var labDolazni = document.createElement("label");
                    labDolazni.innerHTML = "all-inclusive";
                    labDolazni.className = "all-inclusive";
                    divCheck.appendChild(labDolazni);

                    var rbDolazni = document.createElement("input");
                    rbDolazni.type = "radio";
                    rbDolazni.name = "odlazniDolazni" + soba.id; ///mora isti class name da im bude
                    rbDolazni.value = "all-inclusive" + soba.id;
                    divCheck.appendChild(rbDolazni);

                    var br = document.createElement("br");
                    divCheck.appendChild(br);
                });
            }));
            var br = document.createElement("br");
            divPrikazSobaaZaRezervisanje1.appendChild(br);

            var labOdDol = document.createElement("label");
            labOdDol.innerHTML = "Unos vremena i dužine boravka";
            divPrikazSobaaZaRezervisanje1.appendChild(labOdDol);

            var input = document.createElement("input");
            input.type = "date";
            input.className = "datum";
            input.name = "datum";
            divPrikazSobaaZaRezervisanje1.appendChild(input); //

            var input = document.createElement("input");
            input.type = "time";
            input.className = "vreme";
            input.name = "vreme";
            divPrikazSobaaZaRezervisanje1.appendChild(input);

            var input1 = document.createElement("input");
            input1.type = "input";
            input1.className = "duzina";
            input1.name = "duzina";
            divPrikazSobaaZaRezervisanje1.appendChild(input1);
            //////////////////////////////////////////////////////
            var br = document.createElement("br");
            divPrikazSobaaZaRezervisanje1.appendChild(br);
            dugmeUcitajSobae.disabled = true;

            var dugmeDodajTerminTerminaZaSoba = document.createElement("button");
            dugmeDodajTerminTerminaZaSoba.innerHTML = "Dodaj vreme leta za soba";
            dugmeDodajTerminTerminaZaSoba.className = "dodajterminletazasoba";
            dugmeDodajTerminTerminaZaSoba.disabled = false;
            divPrikazSobaaZaRezervisanje1.appendChild(dugmeDodajTerminTerminaZaSoba);

            dugmeDodajTerminTerminaZaSoba.onclick = (ev) => {
                divCheckGost = this.unosKontejner.querySelector(".divCheck");
                if (divCheckGost.querySelector('input[type="checkbox"]:checked') != null) {
                    var gostIzabranaID = divCheckGost.querySelector('input[type="checkbox"]:checked').value;
                } else alert("Nije izabrana nijedna gost!");

                var sobaIzabranID = divIzborSobaa.querySelector('input[type="checkbox"]:checked').value;

                let dt = this.unosKontejner.querySelector('input[name="datum"]').value;
                let vr = this.unosKontejner.querySelector('input[name="vreme"]').value;
                let duzinaTermina = this.unosKontejner.querySelector('input[name="duzina"]').value;

                let datumIVreme = dt + " " + vr;
                let polupansion = this.unosKontejner.querySelector('input[name="odlazniDolazni' + sobaIzabranID + '"]:checked').value;
                var odlazniYN = 0;
                var odDol = "sletanja";
                if (polupansion.substring(0, 7) == "polupansion") {
                    odlazniYN = 1;
                    odDol = "poletanja";
                    labOdDol.innerHTML = " Unos vremena " + odDol + " i dužine trajanja  ";
                } else labOdDol.innerHTML = " Unos vremena " + odDol + " i dužine trajanja ";

                fetch("https://localhost:5001/Hotel/DodelaDestinacijeIZakazivanjeTerminaSobaa/ " + gostIzabranaID + " / " + sobaIzabranID + " / " + datumIVreme, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({

                        "odlazniTermin": odlazniYN,
                        "duzinaTermina": duzinaTermina,
                    })

                }).then(p => {
                    if (p.ok) {
                        this.uzmimanjeSobaaIzHotelaIDocrtavanje(sobaIzabranID);

                    } else {
                        alert("Nastala je greska, najverovatnije niste uneli datum u opsegu koji je se prati ili je trajanje vece od 365!");
                    }
                });
            }
        }
    }

    crtanjePrikazaHotela(host) {
        let divNaslov = document.createElement("div");
        divNaslov.className = "divNaslov";
        host.appendChild(divNaslov);

        let divKompanija = document.createElement("div");
        divKompanija.className = "divAvio";
        this.kontejner = divKompanija;
        host.appendChild(this.kontejner);

        let labNaziv = document.createElement("label");
        labNaziv.className = "labNaziv";
        labNaziv.innerHTML = this.naziv;
        divNaslov.appendChild(labNaziv);

        let lablokacija = document.createElement("label");
        lablokacija.className = "lablokacija";
        lablokacija.innerHTML = this.lokacija;
        divNaslov.appendChild(lablokacija);

        let dugmeObrisi = document.createElement("button");
        dugmeObrisi.innerHTML = "obriši";
        dugmeObrisi.className = "dugmeObrisi";
        divNaslov.appendChild(dugmeObrisi);

        dugmeObrisi.onclick = (ev) => {
            fetch("https://localhost:5001/Hotel/BrisanjeHotela/" + this.id, {
                method: "DELETE"
            }).then(p => {
                if (p.ok) {
                    this.kontejner.parentNode.parentNode.style.display = "none";
                } else {
                    alert("Doslo je do greske!");
                }
            });
        }
        this.uzimanjeSobaaIzHotelaIcrtanje(divKompanija);


    }
    uzimanjeSobaaIzHotelaIcrtanje(divHotel) {
        fetch("https://localhost:5001/Hotel/PreuzimanjeSobaaIzHotela/" + this.id, {

            method: "GET"
        }).then(p => p.json().then(data => {

            data.forEach(el => {

                let soba = new Soba(el.id, el.kodniNaziv, el.brojSedista, el.model);
                soba.prikaz(divHotel);

                this.sobai.push(soba); /////doda svaki nacrtani soba u niz sobaa
            })
        }));
    }
    uzmimanjeSobaaIzHotelaIDocrtavanje(idSobaaKojiSeUpdatuje) {

        let i = 0;
        this.sobai.forEach(el => {
            let soba = new Soba(el.id, el.kodniNaziv, el.brojSedista, el.model);
            var decaDivovi = (this.kontejner).childNodes;
            if (el.id == idSobaaKojiSeUpdatuje) {
                (decaDivovi[i].parentNode).removeChild(decaDivovi[i]);
                (this.sobai).splice(i, 1);
                soba.prikaz(this.kontejner);
                (this.sobai).push(el);

            }
            i++;
        })
    }
}