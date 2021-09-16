using System.Threading.Tasks;
using WeatherApi.Model;

namespace WeatherApi.Interfaces
{
    public interface IWeather
    {
        WeatherResponse GetWeatherByCityAndState(string city, string state, string url);
    }
}
