﻿using Expenses.Core;
using Expenses.Core.CustomExceptions;
using Expenses.DB;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Expenses.WebApi.Controllers
{
    private readonly IUserService _userService;
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthenticationController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(User user)
        {
            try
            {
                var result = await _userService.SignUp(user);
                return Created("", result);
            }
            catch (UsernameAlreadyExistsException e)
            {
                return StatusCode(409, e.Message);
            }

        }

    }

}
