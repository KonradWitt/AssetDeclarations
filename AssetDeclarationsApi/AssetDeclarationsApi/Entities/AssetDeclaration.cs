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

        public List<CashPosition> CashPositions { get; set; }
        public List<SecurityPosition> SecurityPositions { get; set; }
        public List<RealEstate> RealEstate { get; set; }
        public List<Liability> Liabilities { get; set; }
        public List<PersonalProperty> PersonalProperties { get; set; }
        public List<Income> Incomes { get; set; }
        public List<Receivable> Receivables { get; set; }
        public List<BusinessActivity> BusinessActivities { get; set; }

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
