using CourseTests.Page;
using NUnit.Framework;

namespace CouseWork.Tests
{
    class LeaveFeedbackTest
    {
        [TestCase("5feedback", "Good food")]
        public void FeedbackTest(string position, string feedbacktext)
        {
            using var page = new FoodPage();
            page.SignIn("iamadmin", "iamadmin");
            page.LeaveFeedback(position, feedbacktext);
        }
    }
}
