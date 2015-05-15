using AutoMapper;
using PlsRemindMe.Domain.Models;

namespace PlsRemindMe.Domain.Configuration
{
    public class DisplayNameResolve : ValueResolver<Connection, string>
    {
        protected override string ResolveCore(Connection source)
        {
            if (string.IsNullOrEmpty(source.FirstName) && !string.IsNullOrEmpty(source.EmailAddress))
            {
                return source.EmailAddress;
            }
            
            return string.Format("{0} {1}", source.FirstName, source.LastName);
        }
    }
}