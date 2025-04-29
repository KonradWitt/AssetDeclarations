namespace AssetDeclarationsApi.DTOs
{
    public record PartyDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Abbreviation { get; set; }
    }
}
