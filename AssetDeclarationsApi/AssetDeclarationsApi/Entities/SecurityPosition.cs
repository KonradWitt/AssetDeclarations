namespace AssetDeclarationsApi.Entities
{
    public class SecurityPosition
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double? Quantity { get; set; }
        public double? Value { get; set; }
        public int AssetDeclarationId { get; set; }
    }
}
