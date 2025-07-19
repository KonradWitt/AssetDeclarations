namespace AssetDeclarationsApi.DTOs
{
    public record ReceivableDTO
    {
        public string? Description { get; set; }
        public decimal? Value { get; set; }
    }
}
