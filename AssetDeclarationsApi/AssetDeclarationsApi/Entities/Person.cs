using AssetDeclarationsApi.Utilities;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetDeclarationsApi.Entities
{
    public class Person
    {
        private string _firstName;
        private string _lastName;

        public int Id { get; set; }
        public string FirstName
        {
            get => _firstName;
            set
            {
                _firstName = value;
                UpdateLink();
            }
        }
        public string LastName
        {
            get => _lastName;
            set
            {
                _lastName = value;
                UpdateLink();
            }
        }
        public string Link { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }

        public string ImageUrl { get; set; }

        public int? PartyId { get; set; }
        public Party? Party { get; set; }

        public ICollection<AssetDeclaration> AssetDeclarations { get; set; }

        public bool IsHighlight { get; set; }

        [NotMapped]
        public string FullName { get => FirstName + ' ' + LastName; }


        private void UpdateLink()
        {
            Link = FullName?.Trim().ToLower().ReplacePolishLetters().Replace(' ', '-');
        }
    }
}
