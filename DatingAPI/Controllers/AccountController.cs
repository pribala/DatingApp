using System.Security.Cryptography;
using System.Text;
using DatingAPI.Data;
using DatingAPI.Entities;
using DatingAPI.Interfaces;
using DatingAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingAPI.Controllers;

public class AccountController : BaseApiController
{
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;

    public AccountController(DataContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")] // POST: api/account/register
    public async Task<ActionResult<UserViewModel>> Register(RegisterViewModel model) 
    {
        if (await UserExists(model.Username)) {
            return BadRequest("User already exists");
        }
        using var hmac = new HMACSHA512();
        var user = new AppUser {
            UserName = model.Username,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(model.Password)),
            PasswordSalt = hmac.Key
        };
        
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return new UserViewModel {
            Username = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserViewModel>>Login(LoginViewModel model) {
        var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == model.Username);
        if (user == null) return Unauthorized("Invalid user name");
        var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(model.Password));
        for (int i = 0; i < computedHash.Length; i ++ ) {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
        }
          return new UserViewModel {
            Username = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
    }

    private async Task<bool>UserExists(string username) {
        return await _context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
    }
}
