namespace AssetDeclarationsApi.Entities
{
    public class Party
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Abbreviation { get; set; }

        public ICollection<Person>? Persons { get; set; }
    }
}
