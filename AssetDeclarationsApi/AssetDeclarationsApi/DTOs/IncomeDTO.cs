namespace AssetDeclarationsApi.DTOs
{
    public record IncomeDTO
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public decimal? YearlyValue { get; set; }
    }
}
