namespace AssetDeclarationsApi.DTOs
{
    public record PersonalPropertyDTO
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public decimal? Value { get; set; }
    }
}
