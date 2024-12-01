namespace AssetDeclarationsApi.Entities
{
    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int? PartyId { get; set; }

        public ICollection<AssetDeclaration> AssetDeclarations { get; set; }
    }
}
