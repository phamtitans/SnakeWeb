namespace SnakeWeb.Infrastructure
{
    public class DataUser
    {
        public string Name { get; set; }
        public string StringData { get; set; }
    }
    public abstract class HubConnectionManager
    {
        public bool IsConnected { get; set; }
        public List<DataUser> ConnectionData { get; set; }

    }
    public class DataHubConnectionManager : HubConnectionManager
    {
        public DataHubConnectionManager()
        {
            ConnectionData = new List<DataUser>();
        }
        public string FoodDataString { get; set; }
        public string ObstackleDataString { get; set; }
        
    }
}
