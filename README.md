# Audio-to-Text CLI (with OpenAI Whisper)

A simple command-line utility built with Node.js and TypeScript that transcribes audio files into text using OpenAI's Whisper model.

## Features

- Converts `.wav`, `.mp3`, and other audio formats to text
- Uses OpenAI Whisper model via official API
- Command-line interface using `yargs`
- Proxy support (via `socks-proxy-agent`)
- Includes unit tests with `vitest`
- Prettier formatting support

## Installation

Clone the repo:

```bash
git clone https://github.com/AnastasiaRokoko/audio-to-text-cli.git
cd audio-to-text-cli
npm install
