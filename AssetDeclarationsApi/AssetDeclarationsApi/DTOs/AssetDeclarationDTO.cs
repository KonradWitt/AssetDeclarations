using AssetDeclarationsApi.Entities;

namespace AssetDeclarationsApi.DTOs
{
    public class AssetDeclarationDTO
    {
        public int Id { get; set; }
        public DateTime? Date { get; set; }
        public int? PersonId { get; set; }
        public string? DocumentUrl { get; set; }
        public decimal? NetValue { get; set; }

        public List<CashPositionDTO>? CashPositions { get; set; } = new();
        public List<SecurityPositionDTO>? SecurityPositions { get; set; } = new();
        public List<RealEstateDTO>? RealEstate { get; set; } = new();
        public List<LiabilityDTO>? Liabilities { get; set; } = new();
        public List<PersonalPropertyDTO>? PersonalProperties { get; set; } = new();
        public List<IncomeDTO>? Incomes { get; set; } = new();
        public List<ReceivableDTO>? Receivables { get; set; } = new();
        public List<BusinessActivityDTO>? BusinessActivities { get; set; } = new();
    }
}
