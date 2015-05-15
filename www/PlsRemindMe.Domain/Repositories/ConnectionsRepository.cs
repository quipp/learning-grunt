using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PlsRemindMe.Domain.Dtos.Connections;
using PlsRemindMe.Domain.Models;
using Raven.Client.Linq;

namespace PlsRemindMe.Domain.Repositories
{
    public class ConnectionsRepository : BaseRepository
    {

        public Connection Find(string emailAddress)
        {
            using (var session = DocumentStore.OpenSession())
            {
                var foundConnection = (from c in session.Query<Connection>()
                                       where c.EmailAddress == emailAddress
                                       select c
                                      ).FirstOrDefault();

                return foundConnection;
            }
        }

        public async Task<Connection> Create(Connection reminderConnection)
        {
            using (var session = DocumentStore.OpenAsyncSession())
            {
                await session.StoreAsync(reminderConnection);
                await session.SaveChangesAsync();
                var updatedConnection = await session.LoadAsync<Connection>(reminderConnection.Id);

                return updatedConnection;
            }
        }

        public List<Connection> UserConnections(Guid userId)
        {
            using (var session = DocumentStore.OpenSession())
            {
                var foundConnection = session.Load<Connection>(userId);

                if (foundConnection == null) { return new List<Connection>();}

                return foundConnection.ReferencedConnections ?? new List<Connection>();
            }
        }

        public async Task UpdateReferencedConnections(Guid userId, IEnumerable<Connection> connections)
        {
            using (var session = DocumentStore.OpenAsyncSession())
            {
                var connection = await session.LoadAsync<Connection>(userId);
                
                foreach (var referencedConnection in connections)
                {
                    if (connection.ReferencedConnections.All(x => x.Id != referencedConnection.Id))
                    {
                        connection.ReferencedConnections.Add(referencedConnection);
                    }
                }

                await session.SaveChangesAsync();

                return;
            }
        }
    }
}