namespace AssetDeclarationsApi.DTOs.Person
{
    public record GetAllAlphabeticalResponse
    {
        public string Link { get; set; }
        public string FullName { get; set; }
        public string ImageUrl { get; set; }
        public decimal NetWorth { get; set; }
        public PartyDTO Party { get; set; }
    }
}
