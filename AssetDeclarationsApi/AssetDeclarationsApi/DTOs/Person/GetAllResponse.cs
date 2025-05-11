namespace AssetDeclarationsApi.DTOs.Person
{
    public record GetAllResponse
    {
        public string FullName { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;
    }
}
