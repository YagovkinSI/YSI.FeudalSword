using System;
using System.Linq;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class PublicDynastyApiModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int[] CharactersIds { get; set; }

        public PublicDynastyApiModel(Dynasty databaseItem, bool withCharacters)
        {
            Id = databaseItem.Id;
            Name = databaseItem.Name;
            CharactersIds = withCharacters
                ? databaseItem.Characters?.Select(c => c.Id).ToArray()
                : null;
        }
    }
}
