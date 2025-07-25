﻿namespace AssetDeclarationsApi.DTOs
{
    public record CashPositionDTO
    {
        public string? Currency { get; set; }
        public decimal? CurrencyValue { get; set; }
        public decimal? BaseValue { get; set; }
    }
}
