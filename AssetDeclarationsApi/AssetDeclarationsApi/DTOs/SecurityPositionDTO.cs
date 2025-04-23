namespace AssetDeclarationsApi.DTOs
{
    public record SecurityPositionDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Value { get; set; }
    }
}
