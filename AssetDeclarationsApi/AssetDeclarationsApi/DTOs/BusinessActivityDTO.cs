namespace AssetDeclarationsApi.DTOs
{
    public record BusinessActivityDTO
    (
        string? BusinessName,
        string? BusinessType,
        string? Description,
        decimal? Income,
        int? AssetDeclarationId
    );
}
