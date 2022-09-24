using System;

namespace YSI.FeudalSword.Web.Helpers
{
    public class CountHelper
    {
        public static int Round(int count)
        {
            if (count <= 0)
                return 0;

            var countCalc = count * 10;
            var magnitude = -1;

            while (countCalc > 100)
            {
                countCalc = (int)Math.Round(countCalc / 10.0);
                magnitude++;
            }
            
            if (countCalc <=10)
                return (int)Math.Round(10 * Math.Pow(10, magnitude));
            else if (countCalc <=17)
                return (int)Math.Round(15 * Math.Pow(10, magnitude));
            else if (countCalc <= 33)
                return (int)Math.Round(30 * Math.Pow(10, magnitude));
            else if (countCalc <= 59)
                return (int)Math.Round(50 * Math.Pow(10, magnitude));
            else
                return (int)Math.Round(100 * Math.Pow(10, magnitude));
        }
    }
}
