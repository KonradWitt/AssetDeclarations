namespace AssetDeclarationsApi.Entities
{
    public class BusinessActivity
    {
        public int Id { get; set; }
        public string? BusinessName { get; set; }
        public string? BusinessType { get; set; }
        public string? Description { get; set; }
        public decimal? Income { get; set; }
        public int AssetDeclarationId { get; set; }
    }

}
