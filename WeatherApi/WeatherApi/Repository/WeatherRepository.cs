using WeatherApi.Interfaces;
using WeatherApi.Model;
using RestSharp;
using Newtonsoft.Json;
namespace WeatherApi.Repository
{
    public class WeatherRepository : IWeather
    {
        public WeatherResponse GetWeatherByCityAndState(string city, string state, string baseurl)
        {
            var url = baseurl.Replace("{{city}}", city).Replace("{{state}}", state);
            var client = new RestClient(url);
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            var openWeatherResponse = client.Execute<WeatherResponse>(request);
            var response = JsonConvert.DeserializeObject<WeatherResponse>(openWeatherResponse.Content);
            return response;
        }
    }
}
