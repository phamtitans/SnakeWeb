using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SnakeWeb.Pages
{
    public class StreamModel : PageModel
    {
        private readonly ILogger<StreamModel> _logger;

        public StreamModel(ILogger<StreamModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}