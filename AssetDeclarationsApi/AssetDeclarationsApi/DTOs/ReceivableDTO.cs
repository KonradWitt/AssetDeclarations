namespace AssetDeclarationsApi.DTOs
{
    public record ReceivableDTO
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public decimal? Value { get; set; }
    }
}
