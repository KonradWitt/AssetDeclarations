namespace AssetDeclarationsApi.DTOs.RealEstate
{
    public record GetAllGroupedByPersonsResponse
    {
        public PersonDTO? Person { get; set; }
        public int RealEstateCount{ get; set; }
    }
}
