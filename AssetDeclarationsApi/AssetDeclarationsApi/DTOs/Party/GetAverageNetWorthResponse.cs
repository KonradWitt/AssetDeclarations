namespace AssetDeclarationsApi.DTOs.Party
{
    public record GetAverageNetWorthResponse
    {
        public PartyDTO? Party { get; set; }
        public decimal? AverageNetWorth { get; set; }
    }
}
