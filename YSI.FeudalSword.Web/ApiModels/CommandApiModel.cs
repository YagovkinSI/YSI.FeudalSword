using System;
using System.Collections.Generic;
using System.Linq;
using YSI.FeudalSword.Web.Database.Enums;
using YSI.FeudalSword.Web.Database.Models;

namespace YSI.FeudalSword.Web.ApiModels
{
    public class CommandApiModel
    {
        public int Id { get; set; }
        public int CharacterId { get; set; }
        public enCommandType CommandType { get; set; }
        public int CommandTargetId { get; set; }

        public CommandApiModel(Command command)
        {
            Id = command.Id;
            CharacterId = command.CharacterId;
            CommandType = command.CommandType;
            CommandTargetId = command.CommandTargetId;
        }
    }
}
