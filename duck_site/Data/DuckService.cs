using Duck_IT.Models;
using Newtonsoft.Json;
using System.Text;

namespace Duck_IT.Data
{
    public class DuckService
    {
        static readonly string api = "http://10.60.91.50:3000/api";
        static readonly HttpClient client = new();
        public async Task<Duck?> GetDuckAsync(string? id)
        {
            Duck? duck = null;
            string path = $"{api}?id={id}";
            
            HttpResponseMessage response = await client.GetAsync(path);
            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                duck = JsonConvert.DeserializeObject<Duck>(json);
            }
            return duck;
        }

        public async Task<string> UpdateDuckAsync(Duck duck)
        {
            var json = JsonConvert.SerializeObject(duck);

            var httpContent = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync($"{api}/modify/", httpContent);

            var responseString = await response.Content.ReadAsStringAsync();

            return responseString;
        }
    }
}