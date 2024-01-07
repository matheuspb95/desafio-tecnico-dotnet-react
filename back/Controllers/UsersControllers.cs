using Data;
using Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;


[ApiController]
[Route("api/user")]
public class UsersController : ControllerBase
{
  private readonly UserContext _context;

  public UsersController(UserContext context)
  {
    _context = context;
  }

  [Authorize]
  [HttpGet]
  public async Task<ActionResult<IEnumerable<User>>> GetUsers()
  {
    return await _context.Users.ToListAsync();
  }

  [Authorize]
  [HttpGet("{id}")]
  public async Task<ActionResult<User>> GetUser(int id)
  {
    var user = await _context.Users.FindAsync(id);

    if (user == null)
    {
      return NotFound();
    }

    return user;
  }

  [HttpPost]
  public async Task<ActionResult<User>> PostUser(User user)
  {
    var hasher = new PasswordHasher<User>();
    user.Password = hasher.HashPassword(null, user.Password);
    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
  }

  [Authorize]
  [HttpPut("{id}")]
  public async Task<IActionResult> PutUser(int id, User user)
  {
    if (id != user.Id)
    {
      return BadRequest();
    }

    _context.Entry(user).State = EntityState.Modified;

    try
    {
      await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
      if (!UserExists(id))
      {
        return NotFound();
      }
      else
      {
        throw;
      }
    }

    return NoContent();
  }

  [Authorize]
  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteUser(int id)
  {
    var user = await _context.Users.FindAsync(id);
    if (user == null)
    {
      return NotFound();
    }

    _context.Users.Remove(user);
    await _context.SaveChangesAsync();

    return NoContent();
  }

  private bool UserExists(int id)
  {
    return _context.Users.Any(e => e.Id == id);
  }
}