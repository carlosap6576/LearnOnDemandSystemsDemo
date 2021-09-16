using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace WeatherApi.Extensions
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
