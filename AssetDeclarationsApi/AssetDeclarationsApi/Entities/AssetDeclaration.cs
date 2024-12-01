namespace AssetDeclarationsApi.Entities
{
    public class AssetDeclaration
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int PersonId { get; set; }

        public ICollection<CashPosition> CashPositions { get; set; }
        public ICollection<SecurityPosition> SecurityPositions { get; set; }
        public ICollection<RealEstate> RealEstate { get; set; }
        public ICollection<Liability> Liabilities { get; set; }
        public ICollection<PersonalProperty> PersonalProperties { get; set; }
        public ICollection<Income> Incomes { get; set; }
    }
}
