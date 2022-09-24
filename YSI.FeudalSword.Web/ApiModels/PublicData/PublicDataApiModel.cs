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
        public List<PublicDomainApiModel> Domains { get; set; }
        public List<PublicUserApiModel> Users { get; set; }
        public List<PublicTitleApiModel> Titles { get; set; }
        public List<PublicCharacterApiModel> Characters { get; set; }
        public List<PublicDynastyApiModel> Dynasties { get; set; }

        public PublicDataApiModel(SagaApiModel saga)
        {
            Saga = saga;
        }

        internal void AddArmies(IEnumerable<Army> list)
        {
            if (Armies == null)
                Armies = new List<PublicArmyApiModel>();
            var apiList = Armies;

            foreach (var item in list)
            {
                if (item == null)
                    continue;
                if (apiList.Any(a => a.Id == item.Id))
                    continue;
                var apiModel = new PublicArmyApiModel(item);
                apiList.Add(apiModel);
            }
        }

        internal void AddUnits(IEnumerable<Unit> list)
        {
            if (Units == null)
                Units = new List<PublicUnitApiModel>();
            var apiList = Units;

            foreach (var item in list)
            {
                if (item == null)
                    continue;
                if (apiList.Any(a => a.Id == item.Id))
                    continue;
                var apiModel = new PublicUnitApiModel(item);
                apiList.Add(apiModel);
            }
        }

        internal void AddDomains(IEnumerable<Domain> list)
        {
            if (Domains == null)
                Domains = new List<PublicDomainApiModel>();
            var apiList = Domains;

            foreach (var item in list)
            {
                if (item == null)
                    continue;
                if (apiList.Any(a => a.Id == item.Id))
                    continue;
                var apiModel = new PublicDomainApiModel(item);
                apiList.Add(apiModel);
            }
        }

        internal void AddUsers(List<User> list)
        {
            if (Users == null)
                Users = new List<PublicUserApiModel>();
            var apiList = Users;

            foreach (var item in list)
            {
                if (item == null)
                    continue;
                if (apiList.Any(a => a.Id == item.Id))
                    continue;
                var apiModel = new PublicUserApiModel(item);
                apiList.Add(apiModel);
            }
        }

        internal void AddTitles(IEnumerable<Title> list)
        {
            if (Titles == null)
                Titles = new List<PublicTitleApiModel>();
            var apiList = Titles;

            foreach (var item in list)
            {
                if (item == null)
                    continue;
                if (apiList.Any(a => a.Id == item.Id))
                    continue;
                var apiModel = new PublicTitleApiModel(item);
                apiList.Add(apiModel);
            }
        }

        internal void AddCharacters(IEnumerable<Character> list)
        {
            if (Characters == null)
                Characters = new List<PublicCharacterApiModel>();
            var apiList = Characters;

            foreach (var item in list)
            {
                if (item == null)
                    continue;
                if (apiList.Any(a => a.Id == item.Id))
                    continue;
                var apiModel = new PublicCharacterApiModel(item);
                apiList.Add(apiModel);
            }
        }

        internal void AddDynasties(IEnumerable<Dynasty> list)
        {
            if (Dynasties == null)
                Dynasties = new List<PublicDynastyApiModel>();
            var apiList = Dynasties;

            foreach (var item in list)
            {
                if (item == null)
                    continue;
                if (apiList.Any(a => a.Id == item.Id))
                    continue;
                var apiModel = new PublicDynastyApiModel(item);
                apiList.Add(apiModel);
            }
        }
    }
}
