namespace AssetDeclarationsApi.DTOs
{
    public record BusinessActivityDTO
    (
        int Id,
        string? BusinessName,
        string? BusinessType,
        string? Description,
        decimal? Income,
        int? AssetDeclarationId
    );
}
