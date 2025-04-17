namespace AssetDeclarationsApi.Entities
{
    public class CashPosition
    {
        public int Id { get; set; }
        public string? Currency { get; set; }
        public decimal? CurrencyValue { get; set; }
        public decimal? BaseValue { get; set; }

        public int AssetDeclarationId { get; set; }
    }
}
