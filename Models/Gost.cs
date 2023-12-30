using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hotel.Models{
    [Table("Gost")]
    public class Gost
    {
        [Key]
        [Column("ID")]    
        public int ID{get;set;}

        [StringLength(30)] 
        [Required(ErrorMessage="Neophodno je uneti naziv goste!")]
        [Column("Naziv")]
        public string Naziv{get;set;}

        [StringLength(30)] 
        [Required(ErrorMessage="Neophodno je uneti zemlju gost!")]
        [Column("zemlja")]
        public string zemlja{get;set;}

        [StringLength(30)] 
        [Column("jmbg")]
        public string jmbg{get;set;}
        
        public List<ZakazanTermin> ZakazanTermin {get;set;}
        public Gost()
        {
            ZakazanTermin=new List<ZakazanTermin>();
        }
    }
}