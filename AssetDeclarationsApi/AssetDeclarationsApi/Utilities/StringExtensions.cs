using System.Text;

namespace AssetDeclarationsApi.Utilities
{
    public static class StringExtensions
    {
        private static Dictionary<char, char> _polishReplacements = new Dictionary<char, char>()
        {
            { 'ą', 'a' },
            { 'Ą', 'A' },
            { 'ć', 'c' },
            { 'Ć', 'C' },
            { 'ę', 'e' },
            { 'Ę', 'E' },
            { 'ł', 'l' },
            { 'Ł', 'L' },
            { 'ń', 'n' },
            { 'Ń', 'N' },
            { 'ó', 'o' },
            { 'Ó', 'O' },
            { 'ś', 's' },
            { 'Ś', 'S' },
            { 'ź', 'z' },
            { 'Ź', 'Z' },
            { 'ż', 'z' },
            { 'Ż', 'Z' }
        };

        public static string ReplacePolishLetters(this string str)
        {
            var sb = new StringBuilder(str.Length);

            foreach (var ch in str)
            {
                sb.Append(_polishReplacements.ContainsKey(ch) ? _polishReplacements[ch] : ch);
            }

            return sb.ToString();
        }
    }
}
