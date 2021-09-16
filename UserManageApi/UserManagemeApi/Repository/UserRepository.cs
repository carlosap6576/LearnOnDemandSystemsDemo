
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using UserManageApi.Interfaces;
using UserManageApi.Model;

namespace UserManageApi.Repository
{
    public class UserRepository: INewsPreference
    {
        public UserPreferenceResponse GetUserNewsByCategory(string userId, string dbConnection)
        {
            //database work heere
            var user = new User();
            user.username = "carlos";
            user.Preferences = GetUserPrefenses(userId, dbConnection);
            var userPrefenses = new UserPreferenceResponse();
            userPrefenses.User = user;

            return userPrefenses;

        }

        public IList<NewsPreference> GetUserPrefenses(string userId, string dbConnection)
        {

            List<NewsPreference> preferences = new List<NewsPreference>();
            using (IDbConnection db = new SqlConnection(dbConnection))
            {

                preferences = db.Query<NewsPreference>("SELECT id, users.userid,username,email,name,description  FROM dbo.users  as users INNER JOIN dbo.prefernces as pre on pre.userid = users.userid WHERE users.userid =" + userId).ToList();
            }

            return preferences;
        }

    }
}
