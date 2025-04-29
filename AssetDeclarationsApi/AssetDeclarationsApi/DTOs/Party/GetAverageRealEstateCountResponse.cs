namespace AssetDeclarationsApi.DTOs.Party
{
    public record GetAverageRealEstateCountResponse
    {
        public PartyDTO? Party { get; set; }
        public double? AverageRealEstateCount { get; set; }
    }
}
