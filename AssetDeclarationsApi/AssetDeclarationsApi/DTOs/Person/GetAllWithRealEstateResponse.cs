using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Utilities;

namespace AssetDeclarationsApi.DTOs.Person
{
    public record GetAllWithRealEstateResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;
        public List<RealEstate>? RealEstate { get; set; }

    }
}
