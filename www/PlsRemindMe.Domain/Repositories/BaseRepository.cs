using System;
using Raven.Client.Document;

namespace PlsRemindMe.Domain.Repositories
{
    public abstract class BaseRepository : IDisposable
    {
        public DocumentStore DocumentStore { get; set; }
        protected BaseRepository()
        {
            DocumentStore = new DocumentStore
                {
                    ConnectionStringName = "RavenHQ"
                };

            DocumentStore.Initialize();
        }

        public void Dispose()
        {
            if (DocumentStore != null)
            {
                DocumentStore.Dispose();
            }
        }
    }
}