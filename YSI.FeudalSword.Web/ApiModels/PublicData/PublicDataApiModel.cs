using System;
using System.Collections.Generic;
using System.Linq;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class PublicDataApiModel
    {
        public SagaApiModel Saga { get; set; }
        public List<PublicArmyApiModel> Armies { get; set; }
        public List<PublicUnitApiModel> Units { get; set; }

        public PublicDataApiModel(SagaApiModel saga)
        {
            Saga = saga;
        }

        internal void AddArmies(IEnumerable<Army> list)
        {
            if (Armies == null)
                Armies = new List<PublicArmyApiModel>();

            foreach (var item in list)
            {
                if (Armies.Any(a => a.Id == item.Id))
                    continue;
                var armyApiModel = new PublicArmyApiModel(item);
                Armies.Add(armyApiModel);
            }
        }

        internal void AddUnits(IEnumerable<Unit> list)
        {
            if (Units == null)
                Units = new List<PublicUnitApiModel>();

            foreach (var item in list)
            {
                if (Units.Any(a => a.Id == item.Id))
                    continue;
                var armyApiModel = new PublicUnitApiModel(item);
                Units.Add(armyApiModel);
            }
        }
    }
}
