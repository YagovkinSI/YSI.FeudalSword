using System;
using System.Linq;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class PublicUserApiModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActivity { get; set; }

        public int[] CharactersIds { get; set; }

        public PublicUserApiModel(User databaseItem)
        {
            Id = databaseItem.Id;
            UserName = databaseItem.UserName;
            Created = databaseItem.Created;
            LastActivity = databaseItem.LastActivity;
            CharactersIds = databaseItem.Characters?.Select(c => c.Id).ToArray();
        }
    }
}
