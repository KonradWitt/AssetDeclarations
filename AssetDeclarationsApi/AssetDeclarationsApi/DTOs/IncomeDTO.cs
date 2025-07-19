namespace AssetDeclarationsApi.DTOs
{
    public record IncomeDTO
    {
        public string? Description { get; set; }
        public decimal? YearlyValue { get; set; }
    }
}
