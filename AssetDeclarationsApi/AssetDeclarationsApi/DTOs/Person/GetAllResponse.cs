namespace AssetDeclarationsApi.DTOs.Person
{
    public record GetAllResponse
    {
        public List<GetAllReponsePersonDTO> Persons { get; set; } = new();
    }

    public record GetAllReponsePersonDTO
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;
    }
}
