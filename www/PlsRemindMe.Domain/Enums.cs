
namespace PlsRemindMe.Domain
{
    public enum ReminderStatuses {
        Scheduled = 1,
        Overdue = 2
    }

    public enum FrequencyTypes{
        Once = 1,
        Weekly = 2,
        BiWeekly = 3,
        Monthly = 4,
        BiMonthly = 5,
        Quarterly = 6,
        SemiAnnually = 7,
        Yearly = 8
    }

    public enum ReminderPriorityTypes
    {
        Normal = 1,
        High = 2,
        Urgent = 3,
        HairsOnFire = 4
    }

    public enum ForcastingType
    {
        All = 1,
        Today = 2,
        Tomorrow = 3,
        ThisWeek = 4,
        NextWeek = 5,
        ThisMonth = 6,
        NextMonth = 7,
        Overdue = 98,
        Scheduled = 99
    }
}
