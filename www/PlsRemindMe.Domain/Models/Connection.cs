using System;
using System.Collections.Generic;

namespace PlsRemindMe.Domain.Models
{
    public class Connection : ReminderConnection
    {
        public Connection()
        {
            ReferencedConnections = new List<Connection>();
        }

        public List<Connection> ReferencedConnections { get; set; }
    }
}