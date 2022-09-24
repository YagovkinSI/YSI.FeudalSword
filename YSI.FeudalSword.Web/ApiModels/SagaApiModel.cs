using System;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class SagaApiModel
    {
        public string GameVersion { get; set; }
        public int TurnNumber { get; set; }
        public DateTime ServerDateTime { get; set; }
    }
}
