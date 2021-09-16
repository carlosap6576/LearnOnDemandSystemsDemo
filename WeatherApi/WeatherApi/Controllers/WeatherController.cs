using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WeatherApi.Model;
using Microsoft.Extensions.Configuration;
using WeatherApi.Repository;
using Microsoft.Extensions.Caching.Distributed;
using WeatherApi.Extensions;

namespace WeatherApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherController : ControllerBase
    {
        private const string _controllerName = "WeatherController";
        private string _appDataKey = $"{_controllerName}_{DateTime.Now:yyyyMMdd}";
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IConfiguration configuration;
        private readonly IDistributedCache _cache;
        public WeatherController(ILogger<WeatherForecastController> logger, IConfiguration config, IDistributedCache distributedCache)
        {
            configuration = config;
            _logger = logger;
            _cache = distributedCache;
        }

        [HttpGet]
        public async Task<WeatherResponse> Get([FromQuery] string city, [FromQuery] string state)
        {
            var openWeatherUrl = configuration.GetSection("OpenWeatherApiUrl").Value;
            var weatherRepository = new WeatherRepository();
            var data = new WeatherResponse();
            if (!string.IsNullOrWhiteSpace(city) && !string.IsNullOrWhiteSpace(state))
            {
                _appDataKey = $"{_appDataKey}_{city}_{state}";
                data = await _cache.GetRecordAsync<WeatherResponse>(_appDataKey);
                if (data is not null) return data;
                data = weatherRepository.GetWeatherByCityAndState(city, state, openWeatherUrl);
                await _cache.SetRecordAsync(_appDataKey, data);
            }

            return data;

        }
    }
}
