using final_api.Migrations;
using final_api.Models;
using System.Collections.Generic;
using System.Linq;


namespace final_api.Repositories;

public class PostRepository : IPostRepository
{
    private readonly SocialDbContext _context;

    public PostRepository(SocialDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Post> GetAllPosts()
    {
        return _context.Post.ToList();
    }

    public Post? GetPostById(int postId)
    {
        return _context.Post.SingleOrDefault(p => p.PostId == postId);
    }

    public Post CreatePost(Post newPost)
    {
        _context.Post.Add(newPost);
        _context.SaveChanges();
        return newPost;
    }

    public Post? UpdatePost(Post newPost)
    {
        var originalPost = _context.Post.Find(newPost.PostId);
        
        if (originalPost != null) 
        {
            originalPost.Body = newPost.Body;
            _context.SaveChanges();
        }
        
        return originalPost;
    }

    public void DeletePostById(int postId)
    {
        var post = _context.Post.Find(postId);
        if (post != null)
        {
            _context.Post.Remove(post);
            _context.SaveChanges();
        }
    }

    public IEnumerable<Post> GetAllPosts(string? username) {
        if(!string.IsNullOrEmpty(username)) {
            return _context.Post.Where(p => p.Username == username).ToList();
        }
        return _context.Post.ToList();
    }

}