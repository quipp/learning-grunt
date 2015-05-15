
using System;

namespace PlsRemindMe.Domain.Dtos.Connections
{
    public class ReminderConnectionDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }

        public string DisplayName { get; set; }
    }
}
