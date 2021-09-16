using NewsApi.Interfaces;
using NewsApi.Model;
using Newtonsoft.Json;
using RestSharp;

namespace NewsApi.Repository
{
    public class NewsRepository : INews
    {
        public NewsResponse GetNewsByCategory(string category, string apiKey, string apiBaseurl)
        {
            var url = apiBaseurl.Replace("{{category}}", category);
            var client = new RestClient(url);
            var request = new RestRequest(Method.GET);
            client.Timeout = -1;
            request.AddHeader("Ocp-Apim-Subscription-Key", apiKey);
            var openWeatherResponse = client.Execute<NewsResponse>(request);
            var response = JsonConvert.DeserializeObject<NewsResponse>(openWeatherResponse.Content);
            return response;
        }
    }
}