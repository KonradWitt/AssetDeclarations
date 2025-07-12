using FastEndpoints;

namespace AssetDeclarationsApi.Endpoints
{
    public abstract class EndpointBase<TRequest, TResponse> : Endpoint<TRequest, TResponse> where TRequest : notnull
    {
        protected string Route = null!;

        public EndpointBase()
        {
            Route = RouteBuilder.GenerateRoute(GetType());
        }
    }

    public abstract class EndpointBase<TResponse> : EndpointWithoutRequest<TResponse>
    {
        protected string Route = null!;

        public EndpointBase()
        {
            Route = RouteBuilder.GenerateRoute(GetType());
        }
    }

    public static class RouteBuilder
    {
        public static string GenerateRoute(Type type)
        {
            return $"{type.Namespace!.Split('.').Last()}/{type.Name}";
        }
    }
}
