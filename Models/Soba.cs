using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hotel.Models{
    [Table("Soba")]
    public class Soba
    {
        [Key]
        [Column("ID")]    
        public int ID{get;set;}

        [Column("kodniNaziv")]
        [StringLength(30)] 
        [Required(ErrorMessage="Neophodno je uneti naziv sobaa!")]
        public string kodniNaziv{get;set;}

        [StringLength(30)] 
        [Required(ErrorMessage="Neophodno je uneti model!")]
        [Column("model")]
        public string model{get;set;}

        [Column("brojSedista")]
        public int brojSedista{get;set;}
        
        [JsonIgnore]     
        public virtual Hotels Hotel{get;set;}
        
        public List<ZakazanTermin> ZakazanTermin{get;set;}
        public Soba()
        {
            ZakazanTermin=new List<ZakazanTermin>();
        }

    }
}
