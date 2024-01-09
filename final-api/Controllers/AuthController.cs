using final_api.Repositories;
using Microsoft.AspNetCore.Mvc;
using final_api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace final_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly IAuthService _authService;

    public AuthController(ILogger<AuthController> logger, IAuthService service)
    {
        _logger = logger;
        _authService = service;
    }

    [HttpPost]
    [Route("register")]
    public ActionResult CreateUser(User user) 
    {
        if (user == null || !ModelState.IsValid) {
            return BadRequest();
        }
        _authService.CreateUser(user);
        return NoContent();
    }

    [HttpGet]
    [Route("login")]
    public ActionResult<string> SignIn(string username, string password) 
    {
        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
        {
            return BadRequest();
        }

        var token = _authService.SignIn(username, password);

        if (string.IsNullOrWhiteSpace(token)) {
            return Unauthorized();
        }

        return Ok(token);
    }

    [HttpGet]

    public ActionResult<IEnumerable<User>> GetUsers()
    {
        return Ok(_authService.GetAllUsers());
    }

    [HttpGet]
    [Route("{username}")]
    public ActionResult<User> GetUserByUsername(string username)
    {
        var user = _authService.GetUserByUsername(username);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    [HttpPut]
    [Route("{username}")]
    
    public ActionResult UpdateUser(string username, User newUser) {
        if (!ModelState.IsValid || newUser == null)
        {
            return BadRequest();
        }

        newUser.Username = username;
        

        var updatedUser = _authService.UpdateUser(newUser);

        if (updatedUser == null) 
        {
            return NotFound();
        }

        return Ok(updatedUser);
    }

}