using AssetDeclarationsApi.Utilities;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetDeclarationsApi.Entities
{
    public class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }

        public string ImageUrl { get; set; }

        public int? PartyId { get; set; }
        public Party? Party { get; set; }

        public ICollection<AssetDeclaration> AssetDeclarations { get; set; }

        public bool IsHighlight { get; set; }

        [NotMapped]
        public string FullName { get => FirstName + ' ' + LastName; }


        [NotMapped]
        public string Link
        {
            get => FullName?.Trim().ToLower().ReplacePolishLetters().Replace(' ', '-');
        }
    }
}
