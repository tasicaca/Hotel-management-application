using Microsoft.EntityFrameworkCore;

namespace Hotel.Models
{
    public class HotelContext:DbContext
    {
       
        public DbSet<Gost> Host{get;set;}
        public DbSet<ZakazanTermin> HostRoom{get;set;}
        public DbSet<Hotels> Hotels{get;set;}
        public DbSet<Soba> Room{get;set;}
        public DbSet<Category> Category{get;set;}
        public HotelContext(DbContextOptions options):base(options)
        {

        }

    }
}
