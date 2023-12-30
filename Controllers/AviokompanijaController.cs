using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Hotel.Models;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HotelController:ControllerBase
    {
        public HotelContext Context{get;set;}
        public HotelController(HotelContext context)
        {
            Context=context;
        }

        [Route("Preuzimanjekategorijaa")]
        [HttpGet]
        public async Task<JsonResult> Preuzimanjekategorijaa()
        {
                  
            var kategorijai=await Context.Category.ToListAsync();
            //Where(x=>x.Hotel.ID == idHotel).ToListAsync();
            return new JsonResult(kategorijai);
               
        }


        [Route("DodavanjeHotela")]
        [HttpPost]
        public async Task<ActionResult> AddHotel([FromBody]Hotels hotel)
        {
            if(hotel.Naziv != " "){
                Context.Hotels.Add(hotel);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodata hotel!");}
            else 
                return BadRequest("Nije ispravan naziv Hotela");
        }


        [Route("PreuzimanjeHotel/{idkategorijaa}")]
        [HttpGet]
         public async Task<JsonResult> GetHotel(int idkategorijaa)
        {
           var kategorija=await Context.Category.Where(x=>x.ID==idkategorijaa).FirstAsync(); ///N M VEZA
           var hotel=await Context.Hotels.Where(x=>x.Category.Contains(kategorija)).Include(x=>x.Room).ToListAsync();
           return new JsonResult(hotel);
        }

        [Route("BrisanjeHotela/{id}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteHotel(int id)
        {
            var hotel=await Context.Hotels.FindAsync(id);
            if (hotel!=null) {
                var sobai=await Context.Room.Where(x=>x.Hotel==hotel).ToListAsync();
                if (sobai!=null){
                    sobai.ForEach(soba=>{
                    Context.Room.Remove(soba);
                });  
                Context.Hotels.Remove(hotel);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana hotel i sobai te hotele!"); 
                }
                else return Ok("Uspesno obrisana hotel ali nema sobaa te hotele!"); 
            }
            else
                {
                return BadRequest("Nije uspesno obrisana Hotel");
                }
        }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
        [Route("DodavanjeSobaa/{idHotel}")]
        [HttpPost]
        public async Task<ActionResult> AddSoba(int idHotel,[FromBody] Soba soba)
        {
            var hotel=await Context.Hotels.FindAsync(idHotel);
            if (hotel!=null){
                soba.Hotel=hotel;
                if ((soba.kodniNaziv!=" ")&&(soba.brojSedista<8)&&(soba.brojSedista>0))
                {
                    Context.Room.Add(soba);
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno dodat soba u hotelu!");
                }
                else return BadRequest("Nije uspesno dodat soba jer nije dobar kodni naziv ili je broj sedista van opsega 1 do 7");
            }
            else return BadRequest("Nije uspesno dodat soba");
        }
        
        [Route("BrisanjeSobaa/{id}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteSoba(int id)
        {
            var soba1=await Context.Room.FindAsync(id);
            if (soba1!= null) {
                Context.Room.Remove(soba1);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisan soba!");
            }
            else return BadRequest("Brisanje sobaa koji ne postoji u bazi");
        }
    
        [Route("PreuzimanjeSobaaIzHotela/{idHotel}")]
        [HttpGet]
        public async Task<JsonResult> PreuzimanjeSobaaIzHotela(int idHotel)
        {
                  
            var sobai=await Context.Room.Where(x=>x.Hotel.ID == idHotel).ToListAsync();
            return new JsonResult(sobai);
                
        }

        [Route("PreuzimanjePoslednjegSobaaIzHotela/{idHotel}")]
        [HttpGet]
        public async Task<JsonResult> PreuzimanjePoslednjegSobaaIzHotela(int idHotel)
        {
            var sobai=await Context.Room.Where(x=>x.Hotel.ID == idHotel).ToListAsync();

            return new JsonResult(sobai[sobai.Count-1]);
        }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        [Route("DodavanjeGost")]
        [HttpPost]
        public async Task<ActionResult> AddGost([FromBody] Gost gost)
        {
            if (gost.Naziv=="") {
                return BadRequest("Dodavanje goste neuspesno");
            }
            else {
                Context.Host.Add(gost);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodata gost!");
            }
        }
        
        [Route("PreuzimanjeGost")]
        [HttpGet]
         public async Task<JsonResult> GetGost()
        {
           var gost=await Context.Host.ToListAsync();
           if (gost!=null)
            {
               return new JsonResult(gost);
            } 
            else 
            return new JsonResult("");
        }
        

        [Route("PreuzimanjePoslednjeDodateDestinacije")]
        [HttpGet]
         public async Task<JsonResult> GetDestinaciju()
        {
           var gost=await Context.Host.ToListAsync();
               return new JsonResult(gost[gost.Count-1]);
      

        }


        
        [Route("PreuzimanjeDestinacije/{idGost}")]
        [HttpGet]
         public async Task<JsonResult> GetGostWithID(int idGost)
        {
           var gost=await Context.Host.FindAsync(idGost);
           return new JsonResult(gost);
        }
       
        [Route("PreuzmiZakazanTerminZaSobaZaVremenskiInterval/{idSoba}/{vreme1}/{vreme2}")]
        [HttpGet]
        public async Task<JsonResult> PreuzmiZakazanTerminZaSobaZaVremenskiInterval(int idSoba,DateTime vreme1,DateTime vreme2)
        {
            var zakazanTermin=await Context.HostRoom.Where(x=>x.Soba.ID==idSoba && (x.Vreme>=vreme1 && x.Vreme<=vreme2)).ToListAsync();///////////////////
            
            return new JsonResult(zakazanTermin);
        }


        [Route("PreuzmiZakazanTerminZaSoba/{idSoba}")]
        [HttpGet]
        public async Task<JsonResult> PreuzmiZakazanTerminZaSoba(int idSoba)
        {
            var zakazanTermin=await Context.HostRoom.Where(x=>x.Soba.ID==idSoba).ToListAsync();
            
            return new JsonResult(zakazanTermin);
        }
     
        [Route("DodelaDestinacijeIZakazivanjeTerminaSobaa/{idGost}/{idSoba}/{Vreme}")] 
        [HttpPost] 
        public async Task<ActionResult> DodelaDestinacijeIZakazivanjeTerminaSobaa(int idGost,int idSoba,DateTime Vreme,[FromBody] ZakazanTermin zakTermin)
        {
            var gostPronadjena=await Context.Host.Where(x=>x.ID==idGost).FirstAsync();
            var sobaPronadjen= await Context.Room.Where(x=>x.ID==idSoba).FirstAsync();

            if (gostPronadjena == null) 
               return BadRequest("Nije pronadjena gost!");
            else{
                if (sobaPronadjen==null)  
                    return BadRequest("Nije pronadjen soba!");
                else 
                {
                    DateTime DT = new DateTime(2020,01,01,8,0,0);
                    if ((Vreme>DT) && (zakTermin.duzinaTermina>1) && (zakTermin.duzinaTermina<365) && ((zakTermin.OdlazniTermin==1) || (zakTermin.OdlazniTermin==0)))
                    {
                    ZakazanTermin zakazanTermin=new ZakazanTermin();
                    zakazanTermin.Gost=gostPronadjena;
                    zakazanTermin.Soba=sobaPronadjen;
                    zakazanTermin.Vreme=Vreme;
                    zakazanTermin.OdlazniTermin=zakTermin.OdlazniTermin;
                    zakazanTermin.duzinaTermina=zakTermin.duzinaTermina;
                    Context.HostRoom.Add(zakazanTermin);
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno zakazan let!");
                    }
                    else 
                    return BadRequest("Datum leta nije u opsegu koji se prati!");
                }
            }
        }
        
        [Route("izmenaZakazanogTermina/{idGostSoba}/{vreme}/{gostID}/{duzinaTermina}")]
        [HttpPut]
        public async Task<ActionResult> izmenaZakazanogTermina(int idGostSoba,DateTime vreme,int gostID,int duzinaTermina)
        {
            var da=await Context.HostRoom.FindAsync(idGostSoba);
            if (da!=null)
            {
                da.Vreme=vreme;
                da.GostID=gostID;
                da.duzinaTermina=duzinaTermina;
                Context.HostRoom.Update(da);
                await Context.SaveChangesAsync();
                return Ok("Uspesno unete izmene za zakazan let!");
            }
            else
               return BadRequest("Nije pronadjen zakazan let u bazi!");

        }   
        
        [Route("brisanjeZakazanogTermina/{idGostSoba}")]
        [HttpDelete]
            public async Task<ActionResult> DeleteZakazanogTermina(int idGostSoba)
        {
            var zakazanTermin =await Context.HostRoom.FindAsync(idGostSoba);
            if (zakazanTermin!=null){
                Context.HostRoom.Remove(zakazanTermin);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisan zakazan let!");
            } 
            else 
            {
                Console.WriteLine("Greska prilikom brisanja zakazanog leta");
                return BadRequest("Nije pronadjen zakazan let u bazi!"); 
            }
        }
     }
}