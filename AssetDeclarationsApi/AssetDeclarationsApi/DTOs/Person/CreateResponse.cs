using AssetDeclarationsApi.Entities;
using AssetDeclarationsApi.Utilities;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetDeclarationsApi.DTOs.Person
{
    public record CreateResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;

        public DateTime? DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        public int? PartyId { get; set; }

        public ICollection<AssetDeclarationDTO>? AssetDeclarations { get; set; }
    }
}
