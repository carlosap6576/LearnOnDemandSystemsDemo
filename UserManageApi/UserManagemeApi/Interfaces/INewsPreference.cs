using UserManageApi.Model;
namespace UserManageApi.Interfaces
{
    public interface INewsPreference
    {
        UserPreferenceResponse GetUserNewsByCategory(string userId, string dbConnection);
    }
}
