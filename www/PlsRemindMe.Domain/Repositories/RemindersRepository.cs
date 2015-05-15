using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PlsRemindMe.Domain.Models;
using Raven.Client.Linq;

namespace PlsRemindMe.Domain.Repositories
{
    public class RemindersRepository : BaseRepository
    {
        public IList<Reminder> Reminders(Guid userId)
        {
            using (var session = DocumentStore.OpenSession())
            {
                var reminders = (from reminder in session.Query<Reminder>()
                                 where reminder.OwnerId == userId
                                 orderby reminder.Date
                                 select reminder).ToList();
                return reminders;
            }
            //var reminders = new List<Reminder>
            //    {
            //        new Reminder{Id = Guid.NewGuid(), Title = "Change Air Filter", Description = "Need to buy a new filter before i can replace them.", Date = DateTime.Now.AddDays(0), ReminderDate = DateTime.Now.AddDays(13), Time = "06:00 PM", Frequency = (int)Domain.FrequencyTypes.Monthly, Priority = (int)Domain.ReminderPriorityTypes.High},
            //        new Reminder{Id = Guid.NewGuid(), Title = "Derik Hair Cut", Description = "Man my rug should be looking like crap by now", Date = DateTime.Now.AddDays(-3), ReminderDate = DateTime.Now.AddDays(13), Time = "06:00 PM", Frequency = (int)Domain.FrequencyTypes.Once, Priority = (int)Domain.ReminderPriorityTypes.HairsOnFire},
            //        new Reminder{Id = Guid.NewGuid(), Title = "Ryan Hair Cut", Description = "", Date = DateTime.Now.AddDays(1), ReminderDate = DateTime.Now.AddDays(8), Time = "06:00 PM", Frequency = (int)Domain.FrequencyTypes.Quarterly, Priority = (int)Domain.ReminderPriorityTypes.High},
            //        new Reminder{Id = Guid.NewGuid(), Title = "Enclave Oil Change", Description = "", Date = DateTime.Now.AddDays(15), ReminderDate = DateTime.Now.AddDays(13), Time = "07:00 PM", Frequency = (int)Domain.FrequencyTypes.Yearly, Priority = (int)Domain.ReminderPriorityTypes.High},
            //        new Reminder{Id = Guid.NewGuid(), Title = "Mow Yard", Description = "", Date = DateTime.Now.AddDays(15), ReminderDate = DateTime.Now.AddDays(13), Time = "06:00 PM", Frequency = (int)Domain.FrequencyTypes.Monthly, Priority = (int)Domain.ReminderPriorityTypes.High},
            //        new Reminder{Id = Guid.NewGuid(), Title = "Call Travel Agent", Description = "", Date = DateTime.Now.AddDays(33), ReminderDate = DateTime.Now.AddDays(13), AllDay = true, Frequency = (int)Domain.FrequencyTypes.Monthly, Priority = (int)Domain.ReminderPriorityTypes.High},
            //        new Reminder{Id = Guid.NewGuid(), Title = "Plan Trip to Moms", Description = "", Date = DateTime.Now.AddDays(45), ReminderDate = DateTime.Now.AddDays(13), AllDay = true, Frequency = (int)Domain.FrequencyTypes.Monthly, Priority = (int)Domain.ReminderPriorityTypes.High},
            //        new Reminder{Id = Guid.NewGuid(), Title = "Change Air Filter", Description = "", Date = DateTime.Now.AddDays(15), ReminderDate = DateTime.Now.AddDays(13), Time = "06:30 PM", Frequency = (int)Domain.FrequencyTypes.Monthly, Priority = (int)Domain.ReminderPriorityTypes.High},
            //        new Reminder{Id = Guid.NewGuid(), Title = "Call About Mobile Phones", Description = "Need to change the billing information", Date = DateTime.Now.AddDays(15), Time = "06:00 PM", ReminderDate = DateTime.Now.AddDays(0), Frequency = (int)Domain.FrequencyTypes.Once, Priority = (int)Domain.ReminderPriorityTypes.HairsOnFire},
            //        new Reminder{Id = Guid.NewGuid(), Title = "Call the babysitter", Description = "", Date = DateTime.Now.AddDays(2), ReminderDate = DateTime.Now.AddDays(13), Time = "06:00 PM", Frequency = (int)Domain.FrequencyTypes.Once, Priority = (int)Domain.ReminderPriorityTypes.High},
            //        new Reminder{Id = Guid.NewGuid(), Title = "Buy more propane for the grill", Description = "Need small tanks for the portable grill", Date = DateTime.Now.AddDays(15), Time = "06:00 PM", ReminderDate = DateTime.Now.AddDays(2), Frequency = (int)Domain.FrequencyTypes.Once, Priority = (int)Domain.ReminderPriorityTypes.High},
 
            //    };

            //return reminders.OrderBy(x => x.Date).ToList();
        }

        public async Task Create(Reminder newReminder)
        {
            using (var session = DocumentStore.OpenAsyncSession())
            {
                await session.StoreAsync(newReminder);
                await session.SaveChangesAsync();
            }
        }

        public async Task Delete(Guid reminderId)
        {
            using (var session = DocumentStore.OpenAsyncSession())
            {
                var foundReminder = await session.LoadAsync<Reminder>(reminderId);
                session.Delete(foundReminder);
                await session.SaveChangesAsync();

            }
        }
    }
}
