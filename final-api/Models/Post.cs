using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System;
using final_api.Models;


namespace final_api.Models;

public class Post
{
    public int PostId { get; set; }

    [Required]
    public string Body { get; set; }
    [Required]
    public DateTime PostDate { get; set; }
    [Required]
    public string Username { get; set; }
}