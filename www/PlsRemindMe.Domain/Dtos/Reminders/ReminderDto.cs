using System;
using System.Collections.Generic;
using PlsRemindMe.Domain.Dtos.Connections;

namespace PlsRemindMe.Domain.Dtos.Reminders
{
    public class ReminderDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime ReminderDate { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public bool AllDay { get; set; }
        public bool NotifyByEmail { get; set; }
        public bool NotifyBySms { get; set; }
        public bool NotifyByCall { get; set; }
        public int Status { get; set; }
        public int Frequency { get; set; }
        public int Priority { get; set; }
        public int[] ForcastTypes { get; set; }

        public List<ReminderConnectionDto> OthersToRemind { get; set; }
    }
}