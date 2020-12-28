using CourseTests.Page;
using NUnit.Framework;

namespace CourseTests.Tests
{
    public class RegistrationTest
    {
        [TestCase("username", "firstName", "lastName", "email@gmail.com", "123456")]
        public void Test(string username, string firstName, string lastName, string email, string password)
        {
            using var page = new FoodPage();
            page.Register(username, firstName, lastName, email, password);
            bool b = page.FindPass();
            Assert.IsFalse(b);
        }

        [TestCase("username", "firstName", "lastName", "email@gmail.com", "")]
        [TestCase("", "", "", "", "123456")]
        public void WrongRegistration(string username, string firstName , string lastName, string email, string password)
        {
            using var page = new FoodPage();
            page.Register(username, firstName, lastName, email, password);
            bool b = page.FindPass();
            Assert.IsTrue(b); 
        }
    }
}