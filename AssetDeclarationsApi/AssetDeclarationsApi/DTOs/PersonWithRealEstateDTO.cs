using AssetDeclarationsApi.Entities;

namespace AssetDeclarationsApi.DTOs
{
    public class PersonWithRealEstateDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<RealEstate> RealEstate {get; set;}
    }
}
