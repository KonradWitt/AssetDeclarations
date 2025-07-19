namespace AssetDeclarationsApi.DTOs
{
    public record SecurityPositionDTO
    {
        public string? Name { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Value { get; set; }
    }
}
