using System.Text;

namespace AssetDeclarationsApi.Utilities
{
    public static class StringExtensions
    {
        private static Dictionary<char, char> _polishReplacements = new Dictionary<char, char>()
        {
            { 'ą', 'a' },
            { 'ć', 'c' },
            { 'ę', 'e' },
            { 'ł', 'l' },
            { 'ń', 'n' },
            { 'ó', 'o' },
            { 'ś', 's' },
            { 'ź', 'z' },
            { 'ż', 'z' }
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
