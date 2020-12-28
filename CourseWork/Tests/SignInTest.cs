using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

using CourseTests.Page;

namespace CouseWork.Tests
{
    class SignInTest
    {
        [TestCase("iamadmin", "iamadmin")]
        public void SignIn(string username, string password)
        {
            using var page = new FoodPage();
            page.SignIn(username, password);
            bool b = page.FindSignOut();
            Assert.IsTrue(b);
        }

        [TestCase("", "iamadmin")]
        [TestCase("iamadmin", "")]
        public void WrongSignIn(string username, string password)
        {
            using var page = new FoodPage();
            page.SignIn(username, password);
            bool b = page.FindSignOut();
            Assert.IsFalse(b);
        }
    }
}
