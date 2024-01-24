using System.ComponentModel.DataAnnotations;

namespace DatingAPI.Models;

public class LoginViewModel
{
    [Required]
    public string Username { get; set; } = string.Empty;
    
    [Required]
    public string Password { get; set; } = string.Empty;
}
