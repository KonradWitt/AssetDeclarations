﻿namespace AssetDeclarationsApi.DTOs.Person
{
    public record GetHighlightsResponse
    {
        public string? FullName { get; set; } = string.Empty;
        public string? Link { get; set; } = string.Empty;
        public string? ImageUrl { get; set; } = string.Empty;
        public decimal NetWorth { get; set; }
    }
}
