"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = __importDefault(require("path"));
function transcodeVideo(inputPath, outputPath, format) {
    return new Promise((resolve, reject) => {
        (0, fluent_ffmpeg_1.default)(inputPath)
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
const inputFile = path_1.default.resolve(__dirname, '../input/video.mp4');
const outputFile = path_1.default.resolve(__dirname, '../input/video.webm');
const outputFormat = 'webm';
transcodeVideo(inputFile, outputFile, outputFormat)
    .then(() => console.log('Transcoding complete'))
    .catch((error) => console.error('Transcoding failed:', error));
