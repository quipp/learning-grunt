using System;
using System.Collections.Generic;
using PlsRemindMe.Domain.Dtos.Connections;

namespace PlsRemindMe.Domain.Models
{
    public class Reminder
    {
        public Guid Id { get; set; }
        public Guid OwnerId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ReminderDate { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public bool AllDay { get; set; }
        public bool NotifyByEmail { get; set; }
        public bool NotifyBySms { get; set; }
        public bool NotifyByCall { get; set; }
        public int Frequency { get; set; }
        public int Occurrences { get; set; }
        public int Priority { get; set; }

        public IList<ReminderConnection> OthersToRemind { get; set; }
    }
}
