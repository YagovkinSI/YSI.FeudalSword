using System;
using System.Collections.Generic;
using System.Linq;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class CharacterApiModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int WarriorCount { get; set; }
        public int? DynastyId { get; set; }
        public string UserId { get; set; }
        public int? SuzerainId { get; set; }

        public string DynastyName { get; set; }
        public string UserName { get; set; }
        public DateTime? UserLastActivity { get; set; }
        public List<TitleShortApiModel> Titles { get; set; }

        public CharacterApiModel(Character character)
        {
            Id = character.Id;
            Name = character.Name;
            WarriorCount = character.WarrioirCount;
            DynastyId = character.DynastyId;
            UserId = character.UserId;
            SuzerainId = character.SuzerainId;

            DynastyName = character.Dynasty?.Name ?? string.Empty;
            UserName = character.User?.UserName ?? string.Empty;
            UserLastActivity = character.User?.LastActivity;

            Titles = character.Titles
                .Select(t => new TitleShortApiModel(t))
                .ToList();
        }
    }
}
