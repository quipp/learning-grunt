using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PlsRemindMe.Domain.Dtos.Reminders;

namespace PlsRemindMe.Domain.Contracts
{
    public interface IRemindersService
    {
        List<ReminderDto> Reminder(Guid userId);
        List<ReminderStatDto> Stats(Guid userId);
        Task<List<ReminderDto>> Create(CreateDto dto);
        Task DeleteReminder(Guid reminderId);
    }
}