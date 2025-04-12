namespace AssetDeclarationsApi.Entities
{
    public class SecurityPosition
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Value { get; set; }
        public int AssetDeclarationId { get; set; }
    }
}
