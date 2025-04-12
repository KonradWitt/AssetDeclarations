namespace AssetDeclarationsApi.Entities
{
    public class Receivable
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal? Value { get; set; }
        public int AssetDeclarationId { get; set; }
    }
}
