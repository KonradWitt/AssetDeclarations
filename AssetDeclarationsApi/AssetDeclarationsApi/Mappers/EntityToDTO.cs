﻿using AssetDeclarationsApi.DTOs;
using AssetDeclarationsApi.Entities;

namespace AssetDeclarationsApi.Mappers;

public static class EntityToDTO
{

    public static PersonDTO MapToDTO(this Person p)
    {
        if (p is null)
        {
            return null;
        }

        return new PersonDTO()
        {
            Id = p.Id,
            FirstName = p.FirstName,
            LastName = p.LastName,
            FullName = p.FullName,
            Link = p.Link,
            DateOfBirth = p.DateOfBirth,
            PlaceOfBirth = p.PlaceOfBirth,
            ImageUrl = p.ImageUrl,
            IsHighlight = p.IsHighlight,
            PartyId = p.PartyId,
            Party = p.Party?.MapToDTO(),
            AssetDeclarations = p.AssetDeclarations?.Select(ad => ad.MapToDTO()).ToList()
        };
    }


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
            Name = party.Name,
            Abbreviation = party.Abbreviation
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
            Name = securityPosition.Name,
            Quantity = securityPosition.Quantity,
            Value = securityPosition.Value
        };
    }

}
