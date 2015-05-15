using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PlsRemindMe.Domain.Contracts;
using PlsRemindMe.Domain.Dtos.Connections;
using PlsRemindMe.Domain.Dtos.Reminders;
using PlsRemindMe.Domain.Models;
using PlsRemindMe.Domain.Repositories;

namespace PlsRemindMe.Domain.Services
{
    public class RemindersService : IRemindersService
    {
        public RemindersRepository _remindersRepository = new RemindersRepository();
        public async Task<List<ReminderDto>> Create(CreateDto dto)
        {
            var newReminders = new List<ReminderDto>();

            var reminderConnections = dto.OthersToRemind.Select(Mapper.Map<ReminderConnectionDto, ReminderConnection>).ToList();
            
            for(var i = 1; i <= dto.Occurrences; i++ )
            {
                var newReminder = Mapper.Map<CreateDto, Reminder>(dto);
                newReminder.Date = CalculateOccurrenceDate(dto.Date, i, dto.Frequency);
                newReminder.OthersToRemind = reminderConnections;
                
                await _remindersRepository.Create(newReminder);

                var mappedDto = Mapper.Map<Reminder, ReminderDto>(newReminder);        
                
                newReminders.Add(mappedDto);
            }

            return newReminders.OrderByDescending(x => x.Date).ToList();
        }

        public async Task DeleteReminder(Guid reminderId)
        {
            await _remindersRepository.Delete(reminderId);
        }

        public List<ReminderDto> Reminder(Guid userId)
        {
            var reminders = _remindersRepository.Reminders(userId);

            var mappedReminders = reminders.Select(Mapper.Map<Reminder, ReminderDto>);

            return mappedReminders.ToList();
        }

        public List<ReminderStatDto> Stats(Guid userId)
        {
            var reminders = _remindersRepository.Reminders(userId);
            var mappedReminders = reminders.Select(Mapper.Map<Reminder, ReminderDto>).ToList();

            var total = mappedReminders.Count();
            var scheduled = mappedReminders.Count(x => x.Status == (int) ReminderStatuses.Scheduled);
            var overdue = total - scheduled;
            var today = mappedReminders.Count(x => x.ForcastTypes.Contains((int) ForcastingType.Today));
            var tommorrow = mappedReminders.Count(x => x.ForcastTypes.Contains((int)ForcastingType.Tomorrow));
            var thisWeek = mappedReminders.Count(x => x.ForcastTypes.Contains((int)ForcastingType.ThisWeek));
            var nextWeek = mappedReminders.Count(x => x.ForcastTypes.Contains((int)ForcastingType.NextWeek));
            var thisMonth = mappedReminders.Count(x => x.ForcastTypes.Contains((int)ForcastingType.ThisMonth));
            var nextMonth = mappedReminders.Count(x => x.ForcastTypes.Contains((int)ForcastingType.NextMonth));

            var stats = new List<ReminderStatDto>
                {
                    new ReminderStatDto{Name = "All", Count = total, StatType = (int) ForcastingType.All, Selected = true},
                    new ReminderStatDto{Name = "Overdue", Count = overdue, StatType = (int) ForcastingType.Overdue},
                    new ReminderStatDto{Name = "Scheduled", Count = scheduled, StatType = (int) ForcastingType.Scheduled},
                    new ReminderStatDto{Name = "Today", Count = today, StatType = (int) ForcastingType.Today},
                    new ReminderStatDto{Name = "Tommorrow", Count = tommorrow, StatType = (int) ForcastingType.Tomorrow},
                    new ReminderStatDto{Name = "This Week", Count = thisWeek, StatType = (int) ForcastingType.ThisWeek},
                    new ReminderStatDto{Name = "Next Week", Count = nextWeek, StatType = (int) ForcastingType.NextWeek},
                    new ReminderStatDto{Name = "This Month", Count = thisMonth, StatType = (int) ForcastingType.ThisMonth},
                    new ReminderStatDto{Name = "Next Month", Count = nextMonth, StatType = (int) ForcastingType.NextMonth},
                };

            return stats;
        }

        private DateTime CalculateOccurrenceDate(DateTime originalDate, int occurrenceNumber, int frequencyType)
        {
            if (occurrenceNumber == 1) { return originalDate; }

            var adjustedOccurrence = occurrenceNumber - 1;
            
            switch (frequencyType)
            {
                case (int)FrequencyTypes.Weekly:
                    return originalDate.AddDays(7 * adjustedOccurrence);
                 
                case (int)FrequencyTypes.BiWeekly:
                    return originalDate.AddDays(14 * adjustedOccurrence);

                case (int)FrequencyTypes.Monthly:
                    return originalDate.AddMonths(adjustedOccurrence);
             
                case (int)FrequencyTypes.Quarterly:
                    return originalDate.AddMonths(3*adjustedOccurrence);

                case (int)FrequencyTypes.Yearly:
                    return originalDate.AddYears(adjustedOccurrence);
            }

            return originalDate;
        }
   
    }
}
