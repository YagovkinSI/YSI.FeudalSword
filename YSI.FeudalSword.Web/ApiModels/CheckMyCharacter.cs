using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class CheckMyCharacter
    {
        public CharacterApiModel Character { get; set; }
        public bool HasCharacter { get; set; }

        public CheckMyCharacter(Character character)
        {
            if (character != null)
            {
                Character = new CharacterApiModel(character);
                HasCharacter = true;
            }
        }
    }
}
