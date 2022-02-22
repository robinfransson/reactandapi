using WebProject.Models;

namespace WebProject.Config
{
    public static class StaticObjects
    {
        private static readonly HomeData HomeData;

        public static HomeData DefaultHome => HomeData;

        static StaticObjects()
        {
            HomeData = new HomeData
            {
                Title = "My test page",
                Preamble = "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum " +
                           "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum " +
                           "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum " +
                           "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum " +
                           "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "
            };
        }
    }
}