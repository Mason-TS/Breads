using System.Collections.Generic;
using final_api.Models;

namespace final_api.Repositories;

public interface IPostRepository
{
    IEnumerable<Post> GetAllPosts();
    Post? GetPostById(int postId);
    Post CreatePost(Post newPost);
    Post? UpdatePost(Post newPost);
    void DeletePostById(int postId);
    IEnumerable<Post> GetAllPosts(string? username);
}