using CourseTests.Page;
using NUnit.Framework;

namespace CouseWork.Tests
{
    class OrderTest
    {
        [TestCase("4")]
        public void Order(string name)
        {
            using var page = new FoodPage();
            page.SignIn("iamadmin", "iamadmin");
            page.Order(name);
        }
    }
}
