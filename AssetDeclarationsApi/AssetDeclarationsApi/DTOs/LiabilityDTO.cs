namespace AssetDeclarationsApi.DTOs
{
    public record LiabilityDTO
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public decimal? Value { get; set; }
    }
}
