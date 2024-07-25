using Microsoft.AspNetCore.SignalR;
using OpenCvSharp;
using System;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Channels;

namespace SnakeWeb.Hubs
{
    public class StreamHub:Hub
    {
        public ChannelReader<byte[]> FileStream(
            int delay,
            CancellationToken cancellationToken)
        {
            var channel = Channel.CreateUnbounded<byte[]>();
            // We don't want to await WriteItemsAsync,
            // otherwise we'd end up waiting for all the items to be written
            // before returning the channel back to the client.
            _ = StreamFileAsync(channel.Writer, delay, cancellationToken);
            return channel.Reader;
        }
        private async Task StreamFileAsync(
            ChannelWriter<byte[]> writer,
            int delay,
            CancellationToken cancellationToken
            )
        {

            Exception localException = null;

            var path = "D:/EN/FunProject/SnakeWeb/SnakeWeb/VID20191108201946.mp4";
             
            //using var filestream = System.IO.File.OpenRead(path);
            //using var ms = new MemoryStream();
            //filestream.CopyTo(ms);

            var frameList = ExtractFrames(path,1);
            //ms.ToArray();
            try
            {
                //await writer.WriteAsync(filestream, cancellationToken);

                //   // Use the cancellationToken in other APIs that accept cancellation tokens
                //   // so the cancellation can flow down to them.
                //   await Task.Delay(delay, cancellationToken);

                foreach (var item in frameList)
                {
                    await writer.WriteAsync(item, cancellationToken);

                    // Use the cancellationToken in other APIs that accept cancellation tokens
                    // so the cancellation can flow down to them.
                    await Task.Delay(delay, cancellationToken);

                }

                //foreach (var item in ms.ToArray())
                //{
                //    await writer.WriteAsync(item, cancellationToken);

                //    // Use the cancellationToken in other APIs that accept cancellation tokens
                //    // so the cancellation can flow down to them.
                //    await Task.Delay(delay, cancellationToken);

                //}
            }
            catch (Exception ex)
            {
                localException = ex;
            }
            finally
            {
                writer.Complete(localException);
            }
        }
        public ChannelReader<int> Counter(
            int count,
            int delay,
            CancellationToken cancellationToken)
        {
            var channel = Channel.CreateUnbounded<int>();
            // We don't want to await WriteItemsAsync,
            // otherwise we'd end up waiting for all the items to be written
            // before returning the channel back to the client.
            _ = WriteItemsAsync(channel.Writer, count, delay, cancellationToken);
            return channel.Reader;
        }
        private async Task WriteItemsAsync(
            ChannelWriter<int> writer,
            int count,
            int delay,
            CancellationToken cancellationToken
            )
        {

            Exception localException = null;
            try
            {
                for (var i = 0; i < count; i++)
                {
                    await writer.WriteAsync(i, cancellationToken);

                    // Use the cancellationToken in other APIs that accept cancellation tokens
                    // so the cancellation can flow down to them.
                    await Task.Delay(delay, cancellationToken);

                }
            }
            catch ( Exception ex )
            {
                localException = ex;
            }
            finally
            {
                writer.Complete(localException);
            }
        }
        public async Task UploadStream(ChannelReader<string> stream)
        {
            while(await stream.WaitToReadAsync())
            {
                while (stream.TryRead(out var item))
                {
                    // do something with the stream item
                    Console.WriteLine(item + " is uploaded! ");
                }
            }
        }

        public List<byte[]> ExtractFrames(string inputPath, int secondsPerFrame)
        {
            var result = new List<byte[]>();
            try
            {
                using(var capture = new VideoCapture(inputPath))
                {
                    if (!capture.IsOpened())
                    {
                        Console.WriteLine("Error: Could not open video file.");
                        return result;
                    }

                    double fps = capture.Fps; // Get the frames per second of the video
                    int frameStep = (int)(fps * secondsPerFrame); // Calculate the number of frames to skip

                    int frameCount = 0;
                    Mat frame = new Mat();
                    for (int pos = 0; pos < capture.FrameCount; pos += frameStep)
                    {
                        capture.PosFrames = pos;
                        capture.Read(frame);
                        if (frame.Empty())
                            break;

                        Cv2.ImEncode(".png", frame, out byte[] imageBytes);
                        result.Add(imageBytes);

                        Console.WriteLine($"Extracted frame {frameCount} at position {pos}");
                        frameCount++;
                    }
                    // Loop through each frame
                    //while (true)
                    //{
                    //    capture.PosFrames = ;
                    //    capture.Read(frame);
                    //    if (frame.Empty())
                    //        break;

                    //    //string outputFilePath = Path.Combine(outputDirectory, $"frame_{frameCount:D4}.png");

                    //    // Save the frame as an image
                    //    //Cv2.ImWrite(outputFilePath, frame);
                    //    Cv2.ImEncode(".png", frame, out byte[] imageBytes);
                    //    result.Add(imageBytes);
                    //    Console.WriteLine($"Extracted frame {frameCount}");

                    //    frameCount++;
                    //}

                    Console.WriteLine("Frames extracted successfully!");
                }
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
                return result;
            }
        }
    }
}
