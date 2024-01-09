using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Collections.Generic;


namespace final_api.Models;
public class User {
    [JsonIgnore]
    public int UserId { get; set; }
    
    [Required]
    public string? Username { get; set; }
    [Required]
    public string? Password { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Bio { get; set; }
    public bool? Gender { get; set; }



    //8-7-23 researching
}