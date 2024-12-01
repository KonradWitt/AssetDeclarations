namespace AssetDeclarationsApi.Entities
{
    public class CashPosition
    {
        public int Id { get; set; }
        public string Currency { get; set; }
        public double CurrencyValue { get; set; }
        public double BaseValue { get; set; }

        public int AssetDeclarationId { get; set; }
    }
}
