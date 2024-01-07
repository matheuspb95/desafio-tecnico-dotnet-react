using Models;
using Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/auth")]
public class AuthController : Controller
{
    private readonly ILogger logger;
    private readonly AuthService authService;

    public AuthController(ILogger<AuthController>  logger, AuthService authService)
    {
        this.authService = authService;
        this.logger = logger;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public ActionResult<string> Login(LoginModel userModel)
    {
        // try
        // {
            if (ModelState.IsValid)
            {
                if (this.authService.IsAuthenticated(userModel.Email, userModel.Password))
                {
                    var user = this.authService.GetByEmail(userModel.Email);
                    var token = this.authService.GenerateJwtToken(userModel.Email, user.AccesType);

                    return Ok(Json(token));
                }
                return BadRequest("Email or password are not correct!");
            }

            return BadRequest(ModelState);
        // }
        // catch (Exception error)
        // {
        //     logger.LogError(error.Message);
        //     return StatusCode(500);
        // }
    }
}
