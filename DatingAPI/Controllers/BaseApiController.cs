using Microsoft.AspNetCore.Mvc;

namespace DatingAPI.Controllers;
[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{

    public BaseApiController()
    {
    }
}
