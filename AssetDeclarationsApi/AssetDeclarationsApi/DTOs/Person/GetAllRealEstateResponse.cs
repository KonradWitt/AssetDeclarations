namespace AssetDeclarationsApi.DTOs.Person
{
    public record GetAllRealEstateResponse
    {
        public RealEstateDTO RealEstate { get; set; }
        public int PersonId { get; set; }
        public string PersonFullName { get; set; }
        public string PersonLink { get; set; }
    }
}
