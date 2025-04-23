using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Entities;

namespace AssetDeclarationsApi.Mappers
{
    public static class DTOToEntity
    {
        public static AssetDeclaration MapToEntity(this AssetDeclarationDTO dto)
        {
            if (dto is null)
            {
                return null;
            }

            return new AssetDeclaration
            {
                Id = dto.Id,
                Date = dto.Date ?? default,
                PersonId = dto.PersonId ?? 0,
                DocumentUrl = dto.DocumentUrl,
                NetValue = dto.NetValue ?? default,
                BusinessActivities = dto.BusinessActivities?.Select(x => x.MapToEntity()).ToList(),
                CashPositions = dto.CashPositions?.Select(x => x.MapToEntity()).ToList(),
                Incomes = dto.Incomes?.Select(x => x.MapToEntity()).ToList(),
                Liabilities = dto.Liabilities?.Select(x => x.MapToEntity()).ToList(),
                PersonalProperties = dto.PersonalProperties?.Select(x => x.MapToEntity()).ToList(),
                RealEstate = dto.RealEstate?.Select(x => x.MapToEntity()).ToList(),
                Receivables = dto.Receivables?.Select(x => x.MapToEntity()).ToList(),
                SecurityPositions = dto.SecurityPositions?.Select(x => x.MapToEntity()).ToList()
            };
        }

        public static BusinessActivity MapToEntity(this BusinessActivityDTO dto)
        {
            if (dto is null)
            {
                return null;
            }

            return new BusinessActivity
            {
                Id = dto.Id,
                BusinessName = dto.BusinessName,
                BusinessType = dto.BusinessType,
                Description = dto.Description,
                Income = dto.Income,
                AssetDeclarationId = dto.AssetDeclarationId ?? 0
            };
        }

        public static CashPosition MapToEntity(this CashPositionDTO dto)
        {
            if (dto is null)
            {
                return null;
            }

            return new CashPosition
            {
                Id = dto.Id,
                Currency = dto.Currency,
                CurrencyValue = dto.CurrencyValue,
                BaseValue = dto.BaseValue
            };
        }

        public static Income MapToEntity(this IncomeDTO dto)
        {
            if (dto is null)
            {
                return null;
            }

            return new Income
            {
                Id = dto.Id,
                Description = dto.Description,
                YearlyValue = dto.YearlyValue
            };
        }

        public static Liability MapToEntity(this LiabilityDTO dto)
        {
            if (dto is null)
            {
                return null;
            }

            return new Liability
            {
                Id = dto.Id,
                Description = dto.Description,
                Value = dto.Value
            };
        }

        public static Party MapToEntity(this PartyDTO dto)
        {
            if (dto is null)
            {
                return null;
            }

            return new Party
            {
                Id = dto.Id,
                Name = dto.Name ?? string.Empty,
                Persons = new List<Person>() // Default initialization; modify as needed
            };
        }

        public static PersonalProperty MapToEntity(this PersonalPropertyDTO dto)
        {
            if (dto is null)
            {
                return null;
            }

            return new PersonalProperty
            {
                Id = dto.Id,
                Description = dto.Description,
                Value = dto.Value
            };
        }

        public static RealEstate MapToEntity(this RealEstateDTO dto)
        {
            if (dto is null)
            {
                return null;
            }

            return new RealEstate
            {
                Id = dto.Id,
                Description = dto.Description,
                Value = dto.Value,
                LegalTitle = dto.LegalTitle
            };
        }

        public static Receivable MapToEntity(this ReceivableDTO dto)
        {
            if (dto is null)
            {
                return null;
            }

            return new Receivable
            {
                Id = dto.Id,
                Description = dto.Description,
                Value = dto.Value
            };
        }

        public static SecurityPosition MapToEntity(this SecurityPositionDTO dto)
        {
            if (dto is null)
            {
                return null;
            }

            return new SecurityPosition
            {
                Id = dto.Id,
                Name = dto.Name,
                Quantity = dto.Quantity,
                Value = dto.Value
            };
        }
    }

}
