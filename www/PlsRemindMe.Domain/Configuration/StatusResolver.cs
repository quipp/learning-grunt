using System;
using AutoMapper;
using PlsRemindMe.Domain.Models;

namespace PlsRemindMe.Domain.Configuration
{
    public class StatusResolver : ValueResolver<Reminder, int>
    {
        protected override int ResolveCore(Reminder source)
        {
            var today = DateTime.Now.Date;

            if (source.Date.Date.CompareTo(today) < 0)
            {
                return (int) ReminderStatuses.Overdue;
            }

            return (int)ReminderStatuses.Scheduled;
        }
    }
}