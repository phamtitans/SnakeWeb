using Microsoft.AspNetCore.SignalR;
using SnakeWeb.Infrastructure;
using System.Text.Json;

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
            var foodDataStringRs = _dataHubConnectionManager?.FoodDataString;
            var obstackleDataStringRs = _dataHubConnectionManager?.ObstackleDataString;
            await Clients.Caller.SendAsync("ReceiveCheckExistedHostResult", hostExistedRs, foodDataStringRs, obstackleDataStringRs);
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
            //Console.WriteLine(user);
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
                await Clients.Others.SendAsync("ReceiveData", playerDataString);
            }

        }

        public async Task UpdateFood(string foodDataString)
        {
            _dataHubConnectionManager.FoodDataString = foodDataString;
            await Clients.Others.SendAsync("ReceiveUpdateFoodResult", foodDataString);
        }
        public async Task RemovePlayer(string user)
        {
            var player = _dataHubConnectionManager.ConnectionData.FirstOrDefault(d => d.Name.Equals(user));
            if (player != null)
            {
                await Clients.Others.SendAsync("ReceiveRemovePlayer", user);
                _dataHubConnectionManager.ConnectionData.Remove(player);
            }
        }

        public async Task GetConnection()
        {
            var ConnectionDataString = JsonSerializer.Serialize(_dataHubConnectionManager.ConnectionData);
            await Clients.All.SendAsync("ReceiveGetConnection", ConnectionDataString);
        }
    }
}
