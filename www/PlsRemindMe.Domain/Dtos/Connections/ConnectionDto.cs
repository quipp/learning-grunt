using System.Collections.Generic;

namespace PlsRemindMe.Domain.Dtos.Connections
{
    public class ConnectionDto : ReminderConnectionDto
    {

        public List<ConnectionDto> ReferencedConnections { get; set; }

    }
}