using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hotel.Models{
    [Table("Hotel")]
    public class Hotels
    {
        [Key]
        [Column("ID")]    
        public int ID{get;set;}

        [StringLength(30)] 
        [Required(ErrorMessage="Neophodno je uneti naziv hotele!")]
        [Column("Naziv")]
        public string Naziv{get;set;}

        [StringLength(40)] 
        [Required(ErrorMessage="Neophodno je uneti lokaciju hotele!")]
        [Column("lokacija")]
        public string lokacija {get;set;}
        public List<Soba> Room{get;set;}

        [JsonIgnore]     
        public List<Category> Category{get;set;}

       //public virtual Category Category{get;set;}

    public Hotels()
    {
        /*Category =new List<Category>();*/
        Room=new List<Soba>();
    }
    }
}