using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using PlsRemindMe.Domain.Contracts;
using PlsRemindMe.Domain.Dtos.Reminders;
using PlsRemindMe.Domain.Services;

namespace PlsRemindMe.Web.Controllers.Api
{
    public class RemindersController : ApiController
    {
        private IRemindersService _remindersService = new RemindersService();
        private IConnectionsService _connectionsService = new ConnectionsService();

        [HttpPost]
        public async Task<HttpResponseMessage> Create(CreateDto dto)
        {
            //Contract.Requires<ArgumentNullException>(dto != null);

            try
            {
                dto.OwnerId = Guid.Parse("e0aed236-3177-4ff7-9a39-25bb16c8ed62");
                dto.OthersToRemind = await _connectionsService.Create(dto.OthersToRemind);
                await _connectionsService.UpdateReferencedConnections(dto.OwnerId, dto.OthersToRemind);

                var newReminders = await _remindersService.Create(dto);

                return Request.CreateResponse(HttpStatusCode.OK, newReminders);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage Reminder(Guid id)
        {
            var reminder = new ReminderDto();

            return Request.CreateResponse(HttpStatusCode.OK, reminder);
        }

        [HttpDelete]
        [ActionName("Delete")]
        public async Task<HttpResponseMessage> DeleteReminder(Guid id)
        {
            await _remindersService.DeleteReminder(id);

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet]
        public HttpResponseMessage Upcoming(Guid id)
        {
            List<ReminderDto> reminders = _remindersService.Reminder(id);

            return Request.CreateResponse(HttpStatusCode.OK, reminders);
        }

        [HttpGet]
        public HttpResponseMessage Stats(Guid id)
        {
            var stats = _remindersService.Stats(id);

            return Request.CreateResponse(HttpStatusCode.OK, stats);
        }
    }
}
