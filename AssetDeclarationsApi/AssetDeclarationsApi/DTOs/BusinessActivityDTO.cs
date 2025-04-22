namespace AssetDeclarationsApi.DTOs
{
    public record BusinessActivityDto
    (
        int Id,
        string? BusinessName,
        string? BusinessType,
        string? Description,
        decimal? Income,
        int? AssetDeclarationId
    );
}
