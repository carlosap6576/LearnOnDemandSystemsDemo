using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using UserManageApi.Extensions;
using UserManageApi.Repository;
using UserManageApi.Model;
namespace UserManageApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private const string _controllerName = "UserController";
        private readonly IDistributedCache _cache;
        private readonly ILogger<UserController> _logger;
        private readonly IConfiguration configuration;
        private string _appDataKey = $"{_controllerName}_{DateTime.Now:yyyyMMdd}";

        public UserController(ILogger<UserController> logger, IConfiguration config, IDistributedCache distributedCache)
        {
            configuration = config;
            _logger = logger;
            _cache = distributedCache;
        }

        [HttpGet]
        public async Task<UserPreferenceResponse> Get([FromQuery] string userId)
        {
            var sqlConnection = configuration.GetConnectionString("Sql");
            var userRepository = new UserRepository();
            var data = new UserPreferenceResponse();

            if (!string.IsNullOrWhiteSpace(userId))
            {
                _appDataKey = $"{_appDataKey}_{userId}";
                data = await _cache.GetRecordAsync<UserPreferenceResponse>(_appDataKey);
                if (data is not null) return data;
                data = userRepository.GetUserNewsByCategory(userId, sqlConnection);
                await _cache.SetRecordAsync(_appDataKey, data);
            }

            return data;
        }
    }
}