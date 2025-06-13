using FastEndpoints;

namespace AssetDeclarationsApi.Endpoints
{
    public abstract class EndpointBase<TRequest, TResponse> : Endpoint<TRequest, TResponse> where TRequest : notnull
    {
        protected string Route = null!;

        public EndpointBase()
        {
            InitializeRoute();
        }

        private void InitializeRoute()
        {
            Route = $"{GetType().Namespace!.Split('.').Last()}/{GetType().Name}";
        }
    }

    public abstract class EndpointBase<TResponse> : EndpointWithoutRequest<TResponse>
    {
        protected string Route = null!;

        public EndpointBase()
        {
            InitializeRoute();
        }

        private void InitializeRoute()
        {
            Route = $"{GetType().Namespace!.Split('.').Last()}/{GetType().Name}";
        }
    }
}
