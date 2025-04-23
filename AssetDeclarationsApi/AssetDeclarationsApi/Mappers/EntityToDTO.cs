using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Entities;

namespace AssetDeclarationsApi.Mappers;

public static class EntityToDTO
{
    public static AssetDeclarationDTO MapToDTO(this AssetDeclaration ad)
    {
        if (ad is null)
        {
            return null;
        }

        return new AssetDeclarationDTO()
        {
            Id = ad.Id,
            Date = ad.Date,
            PersonId = ad.PersonId,
            DocumentUrl = ad.DocumentUrl,
            NetValue = ad.NetValue,
            BusinessActivities = ad.BusinessActivities?.Select(x => x.MapToDTO()).ToList(),
            CashPositions = ad.CashPositions?.Select(x => x.MapToDTO()).ToList(),
            Incomes = ad.Incomes?.Select(x => x.MapToDTO()).ToList(),
            Liabilities = ad.Liabilities?.Select(x => x.MapToDTO()).ToList(),
            PersonalProperties = ad.PersonalProperties?.Select(x => x.MapToDTO()).ToList(),
            RealEstate = ad.RealEstate?.Select(x => x.MapToDTO()).ToList(),
            Receivables = ad.Receivables?.Select(x => x.MapToDTO()).ToList(),
            SecurityPositions = ad.SecurityPositions?.Select(x => x.MapToDTO()).ToList()
        };
    }

    public static BusinessActivityDTO MapToDTO(this BusinessActivity ba)
    {
        if (ba is null)
        {
            return null;
        }

        return new BusinessActivityDTO(
            ba.Id,
            ba.BusinessName,
            ba.BusinessType,
            ba.Description,
            ba.Income,
            ba.AssetDeclarationId
        );
    }

    public static CashPositionDTO MapToDTO(this CashPosition cp)
    {
        if (cp is null)
        {
            return null;
        }

        return new CashPositionDTO
        {
            Id = cp.Id,
            Currency = cp.Currency,
            CurrencyValue = cp.CurrencyValue,
            BaseValue = cp.BaseValue
        };
    }

    public static IncomeDTO MapToDTO(this Income income)
    {
        if (income is null)
        {
            return null;
        }

        return new IncomeDTO
        {
            Id = income.Id,
            Description = income.Description,
            YearlyValue = income.YearlyValue
        };
    }

    public static LiabilityDTO MapToDTO(this Liability liability)
    {
        if (liability is null)
        {
            return null;
        }

        return new LiabilityDTO
        {
            Id = liability.Id,
            Description = liability.Description,
            Value = liability.Value
        };
    }

    public static PartyDTO MapToDTO(this Party party)
    {
        if (party is null)
        {
            return null;
        }

        return new PartyDTO
        {
            Id = party.Id,
            Name = party.Name
        };
    }

    public static PersonalPropertyDTO MapToDTO(this PersonalProperty property)
    {
        if (property is null)
        {
            return null;
        }

        return new PersonalPropertyDTO
        {
            Id = property.Id,
            Description = property.Description,
            Value = property.Value
        };
    }

    public static RealEstateDTO MapToDTO(this RealEstate realEstate)
    {
        if (realEstate is null)
        {
            return null;
        }

        return new RealEstateDTO
        {
            Id = realEstate.Id,
            Description = realEstate.Description,
            Value = realEstate.Value,
            LegalTitle = realEstate.LegalTitle
        };
    }

    public static ReceivableDTO MapToDTO(this Receivable receivable)
    {
        if (receivable is null)
        {
            return null;
        }

        return new ReceivableDTO
        {
            Id = receivable.Id,
            Description = receivable.Description,
            Value = receivable.Value
        };
    }

    public static SecurityPositionDTO MapToDTO(this SecurityPosition securityPosition)
    {
        if (securityPosition is null)
        {
            return null;
        }

        return new SecurityPositionDTO
        {
            Id = securityPosition.Id,
            Name = securityPosition.Name,
            Quantity = securityPosition.Quantity,
            Value = securityPosition.Value
        };
    }

}
