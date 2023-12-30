import { Gost } from "./gost.js";

export class ZakazanTermin {
    constructor(id, gostID, sobaID, vreme, odlazniTermin, duzinaTermina) {
        this.id = id;
        this.gost = gostID;
        this.soba = sobaID;
        this.vreme = vreme;
        this.odlazniTermin = odlazniTermin; ///1 ako jeste, 0 je all-inclusive
        this.duzinaTermina = duzinaTermina;
    }
}