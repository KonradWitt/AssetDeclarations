namespace AssetDeclarationsApi.DTOs.RealEstate
{
    public record GetAllResponse
    {
        public PersonDTO? Person { get; set; }
        public RealEstateDTO? RealEstate { get; set; }
    }
}
