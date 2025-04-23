using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Utilities;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetDeclarationsApi.DTOs.Person
{
    public record GetResponse
    {
        public int Id { get; set; }
        public string LastName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;

        public DateTime? DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        public PartyDTO? Party { get; set; }

        public ICollection<AssetDeclarationDTO>? AssetDeclarations { get; set; }
    }
}
