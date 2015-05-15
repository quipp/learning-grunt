using System;
using System.Collections.Generic;
using AutoMapper;
using PlsRemindMe.Domain.Models;

namespace PlsRemindMe.Domain.Configuration
{
    public class ForcastTypeResolver : ValueResolver<Reminder, int[]>
    {
        protected override int[] ResolveCore(Reminder source)
        {
            var startOfThisWeek = DateTime.Today.AddDays((int)DateTime.Today.DayOfWeek * -1);
            var startOfNextWeek = startOfThisWeek.AddDays(7);
            var types = new List<int>
                {
                    (int)ForcastingType.All        
                };

            var today = DateTime.Now.Date;
            var reminderDate = source.Date.Date;

            if (reminderDate.CompareTo(today) < 0)
            {
                types.Add((int)ForcastingType.Overdue);
            }
            else
            {
                types.Add((int)ForcastingType.Scheduled);
            }
            
            if (reminderDate.CompareTo(today) == 0)
            {
                types.Add( (int)ForcastingType.Today);
            }

            if (reminderDate.AddDays(-1) == today)
            {
                types.Add((int)ForcastingType.Tomorrow);
            }

            if (reminderDate.CompareTo(startOfThisWeek.Date) >= 0 &&
                reminderDate.CompareTo(startOfThisWeek.Date.AddDays(7)) < 0)
            {
                types.Add((int)ForcastingType.ThisWeek);
            }
            if (reminderDate.CompareTo(startOfNextWeek.Date) >= 0 &&
                reminderDate.CompareTo(startOfNextWeek.Date.AddDays(7)) < 0)
            {
                types.Add((int)ForcastingType.NextWeek);
            }

            if (reminderDate.Month == today.Month)
            {
                types.Add((int)ForcastingType.ThisMonth);
            }

            if (reminderDate.Month == today.AddMonths(1).Month )
            {
                types.Add((int)ForcastingType.NextMonth);
            }

            return types.ToArray();
        }
    }
}