using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System;
namespace Hotel.Models
{
    public class ZakazanTermin{
        public int ID{get;set;}
        [JsonIgnore]
        public Soba Soba{get;set;}
        public int SobaID{get;set;}
        [JsonIgnore]
        public Gost Gost{get;set;}
        public int GostID{get;set;}
        [Column("Vreme")]
        public DateTime Vreme{get;set;}
        [Column("OdlazniTermin")]
        public int OdlazniTermin{get;set;}
        [Column("duzinaTermina")]
        public int duzinaTermina{get;set;}
        }
}
