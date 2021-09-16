using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NewsApi.Extensions;
using NewsApi.Model;
using NewsApi.Repository;

namespace NewsApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NewsController : ControllerBase
    {
        private const string _controllerName = "NewsController";
        private readonly IDistributedCache _cache;
        private readonly ILogger<NewsController> _logger;
        private readonly IConfiguration configuration;
        private string _appDataKey = $"{_controllerName}_{DateTime.Now:yyyyMMdd}";

        public NewsController(ILogger<NewsController> logger, IConfiguration config, IDistributedCache distributedCache)
        {
            configuration = config;
            _logger = logger;
            _cache = distributedCache;
        }

        [HttpGet]
        public async Task<NewsResponse> Get([FromQuery] string category)
        {
            var cognitiveUrl = configuration.GetSection("CongnitiveNewsUrl").Value;
            var cognitiveNewsKey = configuration.GetSection("CongnitiveNewsKey").Value;
            var newsRepository = new NewsRepository();
            var data = new NewsResponse();

            if (!string.IsNullOrWhiteSpace(category))
            {
                _appDataKey = $"{_appDataKey}_{category}";
                data = await _cache.GetRecordAsync<NewsResponse>(_appDataKey);
                if (data is not null) return data;
                data = newsRepository.GetNewsByCategory(category, cognitiveNewsKey, cognitiveUrl);
                await _cache.SetRecordAsync(_appDataKey, data);
            }

            return data;
        }
    }
}