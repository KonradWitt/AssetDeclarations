namespace AssetDeclarationsApi.Entities
{
    public class Income
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal? YearlyValue { get; set; }
        public int AssetDeclarationId { get; set; }
    }
}
