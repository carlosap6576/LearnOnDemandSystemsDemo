using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Distributed;

namespace NewsApi.Extensions
{
    public static class DistributedCacheExtensions
    {
        public static async Task SetRecordAsync<T>(this IDistributedCache cache,
            string key,
            T value,
            TimeSpan? absoluteExpireTime = null,
            TimeSpan? unusedExpiredTime = null)
        {
            var options = new DistributedCacheEntryOptions();
            //default to one minute if you don't pass the value
            options.AbsoluteExpirationRelativeToNow = absoluteExpireTime ?? TimeSpan.FromMinutes(15);
            //if don't use cached item for x time expire it
            options.SlidingExpiration = unusedExpiredTime;

            var jdata = JsonSerializer.Serialize(value);
            await cache.SetStringAsync(key, jdata, options);
        }

        public static async Task<T> GetRecordAsync<T>(this IDistributedCache cache, string key)
        {
            var json = await cache.GetStringAsync(key);
            if (json is null) return default;

            return JsonSerializer.Deserialize<T>(json);
        }
    }
}