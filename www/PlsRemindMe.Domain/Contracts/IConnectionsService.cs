using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PlsRemindMe.Domain.Dtos.Connections;

namespace PlsRemindMe.Domain.Contracts
{
    public interface IConnectionsService
    {
        IList<ReminderConnectionDto> ReminderConnections(Guid userId);
        Task<IList<ReminderConnectionDto>> Create(IList<ReminderConnectionDto> othersToRemind);
        Task<ConnectionDto> Create(ConnectionDto othersToRemind);

        Task<bool> UpdateReferencedConnections(Guid userId, IList<ReminderConnectionDto> referenceConnections);
    }
}