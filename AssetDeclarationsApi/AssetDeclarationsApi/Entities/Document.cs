namespace AssetDeclarationsApi.Entities
{
    public class Document
    {
        public int Id { get; set; }
        public byte[] Content { get; set; }
        public int AssetDeclarationId { get; set; }
    }
}
