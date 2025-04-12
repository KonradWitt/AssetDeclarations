using System.ComponentModel.DataAnnotations.Schema;

namespace AssetDeclarationsApi.Entities
{
    public class AssetDeclaration
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int PersonId { get; set; }
        public string DocumentUrl { get; set; }
        public decimal NetValue { get; set; }

        public ICollection<CashPosition> CashPositions { get; set; }
        public ICollection<SecurityPosition> SecurityPositions { get; set; }
        public ICollection<RealEstate> RealEstate { get; set; }
        public ICollection<Liability> Liabilities { get; set; }
        public ICollection<PersonalProperty> PersonalProperties { get; set; }
        public ICollection<Income> Incomes { get; set; }
        public ICollection<Receivable> Receivables { get; set; }
        public ICollection<BusinessActivity> BusinessActivities { get; set; }

        public void CalculateNetValue()
        {
            decimal sum = 0;

            sum += CashPositions?.Sum(x => x?.BaseValue ?? default) ?? default;
            sum += SecurityPositions?.Sum(x => x?.Value ?? default) ?? default;
            sum += RealEstate?.Sum(x => x?.Value ?? default) ?? default;
            sum += PersonalProperties?.Sum(x => x?.Value ?? default) ?? default;
            sum += Receivables?.Sum(x => x?.Value ?? default) ?? default;

            sum -= Liabilities?.Sum(x => x?.Value ?? default) ?? default;

            NetValue = sum;
        }
    }
}
