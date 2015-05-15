using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using PlsRemindMe.Domain.Contracts;
using PlsRemindMe.Domain.Dtos.Connections;
using PlsRemindMe.Domain.Services;

namespace PlsRemindMe.Web.Controllers.Api
{
    public class ConnectionsController: ApiController
    {
        private IConnectionsService _connectionsService = new ConnectionsService();

        [HttpGet]
        public HttpResponseMessage ReminderConnections(Guid id)
        {
            var connections = _connectionsService.ReminderConnections(id);

            return Request.CreateResponse(HttpStatusCode.OK, connections);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> Create(ConnectionDto connection)
        {
            var newConnection = await _connectionsService.Create(connection);

            return Request.CreateResponse(HttpStatusCode.OK, newConnection);
        }
    }
}