using System.Text.Json;
using System.Threading.Tasks;

namespace NewsApi.Extensions
{
    public static class StringExtensions
    {
        public static async Task<T> GetAppDataAsync<T>(this string fineName)
        {
            if (string.IsNullOrEmpty(fineName)) return default;

            return JsonSerializer.Deserialize<T>("strData");
        }
    }
}