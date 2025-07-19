namespace AssetDeclarationsApi.DTOs
{
    public record RealEstateDTO
    {
        public string? Description { get; set; }
        public decimal? Value { get; set; }
        public string? LegalTitle { get; set; }
    }
}
