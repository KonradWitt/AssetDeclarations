using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Utilities;

namespace AssetDeclarationsApi.DTOs
{
    public class PersonWithRealEstateDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get => FirstName + ' ' + LastName; }


        public string Link { get => FullName?.Trim().ToLower().ReplacePolishLetters().Replace(' ', '-'); }


        public List<RealEstate> RealEstate { get; set; }
    }
}
