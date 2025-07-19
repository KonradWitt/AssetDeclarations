namespace AssetDeclarationsApi.DTOs
{
    public record LiabilityDTO
    {
        public string? Description { get; set; }
        public decimal? Value { get; set; }
    }
}
