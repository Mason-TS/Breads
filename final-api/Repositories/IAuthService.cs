using final_api.Models;
using System.Collections.Generic;

namespace final_api.Repositories;

public interface IAuthService
{
    User CreateUser(User user);
    string SignIn(string username, string password);

    IEnumerable<User> GetAllUsers();

    User? GetUserByUsername(string username);

    User UpdateUser (User user);
}