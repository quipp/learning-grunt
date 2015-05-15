using System;
using AutoMapper;
using PlsRemindMe.Domain.Dtos.Connections;
using PlsRemindMe.Domain.Dtos.Reminders;
using PlsRemindMe.Domain.Models;

namespace PlsRemindMe.Domain.Configuration
{
    public class Mapping
    {
        public void Init()
        {
            Mapper.CreateMap<Reminder, ReminderDto>()
                .ForMember(d => d.Status, o => o.ResolveUsing<StatusResolver>())
                .ForMember(d => d.ForcastTypes, o => o.ResolveUsing<ForcastTypeResolver>())
                ;

            Mapper.CreateMap<CreateDto, Reminder>()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.ReminderDate, o => o.Ignore());

            Mapper.CreateMap<ReminderConnection, ReminderConnectionDto>()
                .ForMember(d => d.DisplayName, o => o.Ignore());

            Mapper.CreateMap<ReminderConnectionDto, ReminderConnection>();
            Mapper.CreateMap<ReminderConnectionDto, Connection>()
                .ForMember(d => d.ReferencedConnections, o => o.Ignore());

            Mapper.CreateMap<Connection, ConnectionDto>()
                .ForMember(d => d.DisplayName, o => o.ResolveUsing<DisplayNameResolve>());

            Mapper.CreateMap<Connection, ReminderConnectionDto>()
                .ForMember(d => d.DisplayName, o => o.ResolveUsing<DisplayNameResolve>());

            Mapper.CreateMap<ConnectionDto, Connection>();
                

            Mapper.AssertConfigurationIsValid();
        }
    }
}
