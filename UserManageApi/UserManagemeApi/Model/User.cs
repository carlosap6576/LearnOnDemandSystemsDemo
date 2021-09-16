using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserManageApi.Model
{
    public class User
    {
        #region Properties
        public int id { get; set; }
        public string userId { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public IList<User> Users { get; set; } = new List<User>();
        public IList<NewsPreference> Preferences { get; set; } = new List<NewsPreference>();

        #endregion
    }
}
