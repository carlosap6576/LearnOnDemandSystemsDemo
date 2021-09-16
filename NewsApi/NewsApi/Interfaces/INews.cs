using NewsApi.Model;

namespace NewsApi.Interfaces
{
    public interface INews
    {
        NewsResponse GetNewsByCategory(string category, string apiKey, string apiBaseurl);
    }
}