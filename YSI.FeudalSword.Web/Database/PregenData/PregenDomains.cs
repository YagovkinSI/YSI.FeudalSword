using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.Database.PregenData
{
    public static class PregenDomains
    {
        public static Domain[] Get()
        {
            var domains = new Domain[105];
            for (var i = 0; i < 105; i++)
            {
                var domain = new Domain { Id = i + 1 };
                domains[i] = domain;
            }
            return domains;
        }
    }
}
