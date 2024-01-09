using final_api.Models;
using final_api.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace final_api.Controllers;




[ApiController]
[Route("api/[controller]")]
public class SocialController : ControllerBase 
{
    private readonly ILogger<SocialController> _logger;
    private readonly IPostRepository _postrepository;

    public SocialController(ILogger<SocialController> logger, IPostRepository repository)
    {
        _logger = logger;
        _postrepository = repository;
    }

   [HttpGet]
    public ActionResult<IEnumerable<Post>> GetPosts([FromQuery] string? username)
    {
        var posts = _postrepository.GetAllPosts(username);
        return Ok(posts);
    }

    [HttpGet]
    [Route("{postId:int}")]
    public ActionResult<Post> GetPostById(int postId) 
    {
        var post = _postrepository.GetPostById(postId);
        if (post == null) {
            return NotFound();
        
        }
        return Ok(post);
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public ActionResult<Post> CreatePost(Post post)
    {
        if (!ModelState.IsValid || post == null)
        {
            return BadRequest();
        }
        var newPost = _postrepository.CreatePost(post);
        return Created(nameof(GetPostById), newPost);
    }

    [HttpPut]
    [Route("{postId:int}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public ActionResult<Post> UpdatePost(Post post)
    {
        if (!ModelState.IsValid || post == null)
        {
            return BadRequest();
        }
        return Ok(_postrepository.UpdatePost(post)); 
    }

    [HttpDelete]
    [Route("{postId:int}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public ActionResult DeletePost(int postId)
    {
        _postrepository.DeletePostById(postId);
        return NoContent();

    }
    
}
