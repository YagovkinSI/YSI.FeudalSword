using System.Collections.Generic;
using System.Linq;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class CheckMyCommands
    {
        public List<CommandApiModel> Commands { get; set; }

        public CheckMyCommands(List<Command> commands)
        {
            Commands = commands
                .Select(c => new CommandApiModel(c))
                .ToList();
        }
    }
}
