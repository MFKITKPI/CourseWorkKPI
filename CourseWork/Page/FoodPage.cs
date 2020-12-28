using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using System.Linq;

namespace CourseTests.Page
{
    public class FoodPage : IDisposable
    {
        private const int DefaultWaitTimeoutSeconds = 1;

        private readonly IWebDriver _driver;

        public FoodPage()
        {
            var firefoxOptions = new FirefoxOptions
            {
                BrowserExecutableLocation = (@"C:\Program Files\Mozilla Firefox\firefox.exe")
            };
            _driver = new FirefoxDriver(firefoxOptions);
            _driver.Navigate().GoToUrl(@"http://localhost:8080/");
        }

        public void Register(string username, string firstName, string lastName, string email, string password)
        {
            _driver.FindElement(By.CssSelector(".registration")).Click();
            _driver.FindElement(By.Id("username")).SendKeys(username);
            _driver.FindElement(By.Id("first_name")).SendKeys(firstName);
            _driver.FindElement(By.Id("last_name")).SendKeys(lastName);
            _driver.FindElement(By.Id("email")).SendKeys(email);
            _driver.FindElement(By.Id("password")).SendKeys(password);
            _driver.FindElement(By.CssSelector("div:nth-child(6) > .cancelPerfButs")).Click();
        }

        public void SignIn(string username, string password)
        {
            _driver.FindElement(By.CssSelector(".login")).Click();
            _driver.FindElement(By.Id("usernameLog")).SendKeys(username);
            _driver.FindElement(By.Id("passwordLog")).SendKeys(password);
            _driver.FindElement(By.CssSelector("div:nth-child(4) > .cancelPerfButs")).Click();
        }

        public void LeaveFeedback(string position, string feedbacktext)
        {
            _driver.FindElement(By.Id("orderpage")).Click();
            _driver.FindElement(By.Id(position)).Click();
            _driver.FindElement(By.Id("textareaFeedback")).SendKeys(feedbacktext);
            _driver.FindElement(By.Id("5submitFeedback")).Click();
        }

        public void SignOut()
        {
            if (_driver.FindElements(By.Id("currentUser")).Count > 0) _driver.FindElement(By.Id("currentUser")).Click();
        }

        public void Order(string name)
        {
            _driver.FindElement(By.Id($"{name}")).Click();
        }

        public bool FindPass()
        {
            return _driver.FindElements(By.CssSelector("div:nth-child(6) > .cancelPerfButs")).Count > 0;
        }

        public bool FindSignOut()
        {
            return _driver.FindElements(By.Id("currentUser")).Count > 0;
        }

        public void Dispose()
        {
            _driver?.Dispose();
        }
    }

}