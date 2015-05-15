namespace PlsRemindMe.Domain.Dtos.Reminders
{
    public class ReminderStatDto
    {
        public string Name { get; set; }
        public int Count { get; set; }
        public int StatType { get; set; }

        public bool Selected { get; set; }
    }
}