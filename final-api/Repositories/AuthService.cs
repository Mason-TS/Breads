using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using final_api.Migrations;
using final_api.Models;
using Microsoft.IdentityModel.Tokens;
using bcrypt = BCrypt.Net.BCrypt;

namespace final_api.Repositories;

public class AuthService : IAuthService
{
    private static SocialDbContext _context;
    private static IConfiguration _config;

    public AuthService(SocialDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    public IEnumerable<User> GetAllUsers()
    {
        return _context.Users.ToList();
    }

    public User? GetUserByUsername(string username)
    {
        return _context.Users.SingleOrDefault(u => u.Username == username);
    }

    public User UpdateUser(User newUser)
{
    var originalUser = _context.Users.SingleOrDefault(u => u.Username == newUser.Username);

    if (originalUser != null)
    {
        // Update other properties as before...
        originalUser.FirstName = newUser.FirstName;
        originalUser.LastName = newUser.LastName;
        originalUser.State = newUser.State;
        originalUser.City = newUser.City;
        originalUser.Bio = newUser.Bio;
        originalUser.Gender = newUser.Gender;

        _context.SaveChanges();
    }
    else
    {
        // User with the specified ID not found
        return null;
    }

    return originalUser;
}



    public User CreateUser(User user)
    {
        
        var passwordHash = bcrypt.HashPassword(user.Password);
        user.Password = passwordHash;
        
        _context.Add(user);
        _context.SaveChanges();
        return user;
    }

    public string SignIn(string username, string password)
    {
        var user = _context.Users.SingleOrDefault(x => x.Username == username);
        var verified = false;

        if (user != null) {
            verified = bcrypt.Verify(password, user.Password);
        }

        if (user == null || !verified)
        {
            return String.Empty;
        }
        
        return BuildToken(user);
    }

    private string BuildToken(User user) {
    // var secretBase64 = _config.GetValue<string>("TokenSecret");
    // var secretKey = Convert.FromBase64String(secretBase64);

    var secret = _config.GetValue<String>("TokenSecret");
    var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

    // var signingKey = new SymmetricSecurityKey(secretKey);
        
        // Create Signature using secret signing key
        var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        // Create claims to add to JWT payload
        var claims = new Claim[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
            new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName ?? ""),
            new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName ?? ""),

        };

        // Create token
        var jwt = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddMinutes(5),
            signingCredentials: signingCredentials);
        
        // Encode token
        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

        return encodedJwt;
    }

    

    
}