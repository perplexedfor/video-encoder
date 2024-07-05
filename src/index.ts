import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

function transcodeVideo(inputPath: string, outputPath: string, format: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions('-c:v libvpx-vp9')
      .outputOptions('-crf 30')
      .outputOptions('-b:v 0')
      .outputOptions('-b:a 128k')
      .outputOptions('-c:a libopus')
      .output(outputPath)
      .on('start', (commandLine) => {
        console.log('Spawned FFmpeg with command: ' + commandLine);
      })
      .on('progress', (progress) => {
        console.log('Processing: ' + progress.percent + '% done');
      })
      .on('end', () => {
        console.log('Transcoding finished successfully');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error during transcoding:', err);
        reject(err);
      })
      .run();
  });
}

// Usage example
const inputFile = path.resolve(__dirname,'../input/video.mp4');
const outputFile = path.resolve(__dirname,'../input/video.webm');
const outputFormat = 'webm';

transcodeVideo(inputFile, outputFile, outputFormat)
  .then(() => console.log('Transcoding complete'))
  .catch((error) => console.error('Transcoding failed:', error));