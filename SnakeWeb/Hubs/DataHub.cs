using Microsoft.AspNetCore.SignalR;
using SnakeWeb.Infrastructure;

namespace SnakeWeb.Hubs
{
    public class DataHub : Hub
    {
        private readonly IEnumerable<HubConnectionManager> _hubConnectionManagers;
        private readonly DataHubConnectionManager _dataHubConnectionManager;
        public DataHub(IEnumerable<HubConnectionManager> hubConnectionManagers)
        {
            _hubConnectionManagers = hubConnectionManagers;
            _dataHubConnectionManager = (DataHubConnectionManager)_hubConnectionManagers?.FirstOrDefault(s => s.GetType() == typeof(DataHubConnectionManager));
        }
        public async Task CheckExistedHost(string foodDataString, string obstackleDataString)
        {
            var hostExistedRs = true;
            if (_dataHubConnectionManager == null)
            {
                hostExistedRs = false;
            }
            else
            {

                if (!_dataHubConnectionManager.IsConnected)
                {
                    _dataHubConnectionManager.IsConnected = true;
                }
                if (string.IsNullOrEmpty(_dataHubConnectionManager?.FoodDataString))
                {
                    _dataHubConnectionManager.FoodDataString = foodDataString;
                }
                if (string.IsNullOrEmpty(_dataHubConnectionManager?.ObstackleDataString))
                {
                    _dataHubConnectionManager.ObstackleDataString = obstackleDataString;
                }

            }

            await Clients.Caller.SendAsync("ReceiveCheckExistedHostResult", hostExistedRs);
        }
        //public async Task CreateHost(string foodDataString,string obstackleDataString)
        //{
        //    //await Clients.All.SendAsync("ReceiveMessage", user, message);
        //    _dataHubConnectionManager.IsConnected = true;
        //    _dataHubConnectionManager.FoodDataString = foodDataString;
        //    _dataHubConnectionManager.ObstackleDataString = obstackleDataString;

        //    //await Clients.Others.SendAsync("ReceiveMessage", user, message);
        //    //await Clients.Others.SendAsync("ReceiveMessage", FoodDataString,);
        //}

        public async Task SendData(string user, string playerDataString)
        {
            Console.WriteLine(user);
            if (
                !_dataHubConnectionManager.ConnectionData.Any()||
                _dataHubConnectionManager.ConnectionData.FirstOrDefault(d => d.Name.Equals(user)) == null
                )
            {
                var connectionDataItem = new DataUser()
                {
                    Name = user,
                    StringData = playerDataString
                };
                _dataHubConnectionManager.ConnectionData.Add(connectionDataItem);
            }
            else
            {
                _dataHubConnectionManager.ConnectionData.FirstOrDefault(d => d.Name.Equals(user)).StringData = playerDataString;
            }

        }
    }
}
