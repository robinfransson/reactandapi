using System.Collections.Generic;
using Backend.Models;

namespace WebProject.Models
{
    public class HomeData
    {
        public string Title { get; set; }
        public string Preamble { get; set; }
        public IEnumerable<Product> Products { get; } = GenerateProducts();

        private static IEnumerable<Product> GenerateProducts()
        {
            for (var i = 0; i < 20; i++)
            {
                yield return new Product()
                {
                    Id = i,
                    Name = $"Product {i}",
                    Description = "Test product"
                };
            }
        }
    }
}