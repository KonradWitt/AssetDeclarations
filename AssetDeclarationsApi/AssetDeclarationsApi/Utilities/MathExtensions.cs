namespace AssetDeclarationsApi.Utilities
{
    public static class MathExtensions
    {
        public static decimal GetMedian(this IEnumerable<decimal> input)
        {
            var sortedList = input.OrderBy(x => x).ToList();
            int count = sortedList.Count;
            if (count == 0)
            {
                return 0;
            }

            if (count % 2 == 0)
            {
                return (sortedList[count / 2 - 1] + sortedList[count / 2]) / 2;
            }
            else
            {
                return sortedList[count / 2];
            }
        }
    }
}
