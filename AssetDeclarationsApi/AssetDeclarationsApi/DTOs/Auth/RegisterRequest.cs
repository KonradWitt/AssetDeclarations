namespace AssetDeclarationsApi.DTOs.Auth
{
    public record RegisterRequest
    {
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
