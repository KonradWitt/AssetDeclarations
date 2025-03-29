using AssetDeclarationsApi.Utilities;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetDeclarationsApi.Entities
{
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }

        public string ImageUrl { get; set; }

        public int? PartyId { get; set; }
        public Party? Party { get; set; }

        public ICollection<AssetDeclaration> AssetDeclarations { get; set; }

        public bool IsHighlight { get; set; }

        [NotMapped]
        public string Link
        {
            get => Name?.Trim().ToLower().ReplacePolishLetters().Replace(' ', '-');
        }
    }
}
