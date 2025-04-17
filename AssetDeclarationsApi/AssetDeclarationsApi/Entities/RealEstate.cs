namespace AssetDeclarationsApi.Entities
{
    public class RealEstate
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public decimal? Value { get; set; }
        public string? LegalTitle { get; set; }

        public int AssetDeclarationId { get; set; }
    }
}
