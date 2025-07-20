using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Entities;
using Azure.Core;

namespace AssetDeclarationsApi.Mappers
{
    public static class DTOToEntity
    {
        public static Person MapToEntity(this PersonDTO dto)
        {
            if (dto is null)
            {
                return null;
            }

            var person = new Person()
            {
                Id = dto.Id,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                DateOfBirth = dto.DateOfBirth ?? default,
                PlaceOfBirth = dto.PlaceOfBirth,
                ImageUrl = dto.ImageUrl,
                IsHighlight = dto.IsHighlight,
                PartyId = dto.PartyId,
                AssetDeclarations = dto.AssetDeclarations?.Select(ad => ad.MapToEntity()).ToList(),
            };

            return person;
        }


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
                Abbreviation = dto.Abbreviation,
                Persons = []
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
                Name = dto.Name,
                Quantity = dto.Quantity,
                Value = dto.Value
            };
        }
    }

}
