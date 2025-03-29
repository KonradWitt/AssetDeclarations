using System.ComponentModel.DataAnnotations.Schema;

namespace AssetDeclarationsApi.Entities
{
    public class AssetDeclaration
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int PersonId { get; set; }

        public string DocumentUrl { get; set; }

        public ICollection<CashPosition> CashPositions { get; set; }
        public ICollection<SecurityPosition> SecurityPositions { get; set; }
        public ICollection<RealEstate> RealEstate { get; set; }
        public ICollection<Liability> Liabilities { get; set; }
        public ICollection<PersonalProperty> PersonalProperties { get; set; }
        public ICollection<Income> Incomes { get; set; }
        public ICollection<Receivable> Receivables { get; set; }
        public ICollection<BusinessActivity> BusinessActivities { get; set; }

        [NotMapped]
        public double NetValue
        {
            get => CalculateNetValue();
        }

        private double CalculateNetValue()
        {
            var netValue = 0.0;

            netValue += CashPositions?.Sum(x => x?.BaseValue ?? default) ?? default;
            netValue += SecurityPositions?.Sum(x => x?.Value ?? default) ?? default;
            netValue += RealEstate?.Sum(x => x?.Value ?? default) ?? default;
            netValue += Liabilities?.Sum(x => x?.Value ?? default) ?? default;

            return Math.Round(netValue);
        }
    }
}
