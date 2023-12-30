using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hotel.Models{
    [Table("Category")]
    public class Category
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
        [Column("opis")]
        public string opis {get;set;}

        [JsonIgnore] 
        public List<Hotels> Hotel{get;set;}

    public Category()
    {
        Hotel=new List<Hotels>();
    }
    }
}