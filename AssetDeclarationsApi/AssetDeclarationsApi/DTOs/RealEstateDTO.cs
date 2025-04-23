namespace AssetDeclarationsApi.DTOs
{
    public record RealEstateDTO
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public decimal? Value { get; set; }
        public string? LegalTitle { get; set; }
    }
}
