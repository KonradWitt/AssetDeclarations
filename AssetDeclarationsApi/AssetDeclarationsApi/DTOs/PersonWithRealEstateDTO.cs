using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Utilities;

namespace AssetDeclarationsApi.DTOs
{
    public class PersonWithRealEstateDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Link { get => Name?.Trim().ToLower().ReplacePolishLetters().Replace(' ', '-'); }

        public List<RealEstate> RealEstate {get; set;}
    }
}
