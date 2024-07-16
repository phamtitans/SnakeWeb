using Microsoft.AspNetCore.SignalR;
using System.Runtime.CompilerServices;

namespace SnakeWeb.Hubs
{
    public class AsyncEnumerableHub:Hub
    {
        public async IAsyncEnumerable<int> Counter(
            int count,
            int delay,
            [EnumeratorCancellation]
            CancellationToken cancellationToken)
        {
            for (int i = 0; i < count; i++)
            {
                // Check the cancellation token regularly so that the server will stop
                // producing items if the client disconnects.
                cancellationToken.ThrowIfCancellationRequested();
                yield return i;
                // Use the cancellationToken in other APIs that accept cancellation
                // tokens so the cancellation can flow down to them.
                await Task.Delay(delay, cancellationToken);
            }
        }
        public async Task UploadStream(IAsyncEnumerable<string> stream)
        {
            await foreach (var item in stream)
            {
                Console.WriteLine(item);
            }
        }
    }
}
