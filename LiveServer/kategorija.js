/*import { Soba } from "./soba.js"*/
export class Category {
    constructor(id, naziv, lokacija) {
        this.id = id;
        this.naziv = naziv;
        this.opis = opis;
        this.sobai = new Array();
        this.kontejner = null;
        this.unosKontejner = null; ///sluzi za pamcenje levog diva za unos
    }
}