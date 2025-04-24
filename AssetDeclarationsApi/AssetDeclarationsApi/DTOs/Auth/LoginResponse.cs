namespace AssetDeclarationsApi.DTOs.Auth
{
    public record LoginResponse
    {
        public string UserName { get; set; }
        public string Token { get; set; } = string.Empty;
    }
}
