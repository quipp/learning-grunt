using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

using PlsRemindMe.Domain.Contracts;
using PlsRemindMe.Domain.Dtos.Connections;
using PlsRemindMe.Domain.Models;
using PlsRemindMe.Domain.Repositories;

namespace PlsRemindMe.Domain.Services
{
    public class ConnectionsService : IConnectionsService
    {
        private ConnectionsRepository _connectionRepository = new ConnectionsRepository();
        public IList<ReminderConnectionDto> ReminderConnections(Guid userId)
        {
            //Contract.Requires<ArgumentOutOfRangeException>(userId > 0);

            var mappedConnections = _connectionRepository.UserConnections(userId)
                                 .Select(Mapper.Map<Connection, ReminderConnectionDto>)
                                 .ToList();

            return mappedConnections;

            //return new List<ReminderConnectionDto>
            //    {
            //        new ReminderConnectionDto{Id = Guid.NewGuid(), EmailAddress = "Derik@graudo.com", FirstName = "Derik", LastName = "Whittaker"},
            //        new ReminderConnectionDto{Id = Guid.NewGuid(), EmailAddress = "Tiffany@graudo.com", FirstName = "Tiffany", LastName = "Whittaker"},
            //        new ReminderConnectionDto{Id = Guid.NewGuid(), EmailAddress = "Ryan@graudo.com", FirstName = "Ryan", LastName = "Whittaker"},
            //        new ReminderConnectionDto{Id = Guid.NewGuid(), EmailAddress = "Brendan@graudo.com", FirstName = "Brendan", LastName = "Whittaker"},

            //    };
        }

        public async Task<IList<ReminderConnectionDto>> Create(IList<ReminderConnectionDto> othersToRemind)
        {
            if ( othersToRemind == null ||!othersToRemind.Any()) { return new List<ReminderConnectionDto>(); }

            foreach (var connectionDto in othersToRemind.Where(x => x.Id == Guid.Empty))
            {
                var foundExisting = _connectionRepository.Find(connectionDto.EmailAddress);
                if (foundExisting != null)
                {
                    connectionDto.Id = foundExisting.Id;
                }
                else
                {
                    Connection connection = Mapper.Map<ReminderConnectionDto, Connection>(connectionDto);
                    var newConnection = await _connectionRepository.Create(connection);
                    connectionDto.Id = newConnection.Id;   
                }
            }

            return othersToRemind;
        }

        public async Task<ConnectionDto> Create(ConnectionDto connection)
        {
            if (connection == null) { throw new NullReferenceException("Connection was null");}

            var mappedConnection = Mapper.Map<ConnectionDto, Connection>(connection);

            if (connection.Id == Guid.Empty) { connection.Id = Guid.NewGuid(); }

            var result = await _connectionRepository.Create(mappedConnection);

            var mappedConnectionDto = Mapper.Map<Connection, ConnectionDto>(result);

            return mappedConnectionDto;
        }

        public async Task<bool> UpdateReferencedConnections(Guid userId, IList<ReminderConnectionDto> referenceConnections )
        {
            if (!referenceConnections.Any()) { return true; }

            var connections = referenceConnections.Select(Mapper.Map<ReminderConnectionDto, Connection>);

            await _connectionRepository.UpdateReferencedConnections(userId, connections);

            return false;
        }
    }
}