// YTLibrary.js

import { Innertube, UniversalCache, Utils } from 'youtubei.js';
import ffmpeg from 'fluent-ffmpeg';
import NodeID3 from 'node-id3';
import fs from 'fs';
import axios from "axios";
import { randomBytes } from 'crypto';
import os from 'os';

const ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/;

class YT {
    constructor() { }

    static yt;

    /**
     * Initialize YouTube session with OAuth
     */
    static async initialize() {
        this.yt = await Innertube.create({
            cache: new UniversalCache(true, './.cacheyt'),
            lang: "id",
            location: "ID",
            po_token: "MnRIyCty0e1cM0jw_X5014gaOjRKE_H5n5thmesUHgHlstID9UlnpzLlXbYLHjuJQ0iEr6SW8syTdHrAQj2bZGp7dSCPtdCI0jTV1kRDi3MGl77WtiKxoPGQsK0DvO-VeGe0s1SBlwZ5proGOGsFwFNFMRLnQw==",
            visitor_data: "CgtWdlhyeTZZX2drbyj2seK1BjIKCgJTRxIEGgAgVw%3D%3D",
        });

        this.yt.session.on('auth-pending', (data) => {
            console.log(`Go to ${data.verification_url} in your browser and enter code ${data.user_code} to authenticate.`);
        });

        this.yt.session.on('auth', ({ credentials }) => {
            console.log('Sign in successful:', credentials);
        });

        this.yt.session.on('update-credentials', async ({ credentials }) => {
            console.log('Credentials updated:', credentials);
            await this.yt.session.oauth.cacheCredentials();
        });

        await this.yt.session.signIn();
        await this.yt.session.oauth.cacheCredentials();
    }

    /**
     * Checks if it is yt link
     * @param {string|URL} url youtube url
     * @returns Returns true if the given YouTube URL.
     */
    static isYTUrl = (url) => {
        return ytIdRegex.test(url);
    }

    /**
     * VideoID from url
     * @param {string|URL} url to get videoID
     * @returns 
     */
     static fetchBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "GET",
			url,
			headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}
    static getVideoID = (url) => {
        if (!this.isYTUrl(url)) throw new Error('is not YouTube URL');
        return ytIdRegex.exec(url)[1];
    }

    /**
     * Write Track Tag Metadata
     * @param {string} filePath 
     * @param {IMetadata} Metadata 
     */
    static WriteTags = async (filePath, Metadata) => {
        NodeID3.write({
            title: Metadata.Title,
            artist: Metadata.Artist,
            originalArtist: Metadata.Artist,
            image: {
                mime: 'jpeg',
                type: { id: 3, name: 'front cover' },
                imageBuffer: (await this.fetchBuffer(Metadata.Image)).buffer,
                description: `Cover of ${Metadata.Title}`,
            },
            album: Metadata.Album,
            year: Metadata.Year || ''
        }, filePath);
    }

    /**
     * @param {string} query 
     * @returns 
     */
    static play = async (query, options = {}) => {
        const hasils = await this.yt.search( query);
        return hasils;
    }

    /**
     * search track with details
     * @param {string} query 
     * @returns {Promise<TrackSearchResult[]>}
     */
    static searchTrack = (query) => {
        return new Promise(async (resolve, reject) => {
            try {
                let ytMusic = await this.yt.music.search(query);
                let result = [];
                for (let i = 0; i < ytMusic.results.length; i++) {
                    result.push({
                        isYtMusic: true,
                        title: `${ytMusic.results[i].title} - ${ytMusic.results[i].artists.map(x => x.name).join(' ')}`,
                        artist: ytMusic.results[i].artists.map(x => x.name).join(' '),
                        id: ytMusic.results[i].id,
                        url: 'https://youtu.be/' + ytMusic.results[i].id,
                        album: ytMusic.results[i].album.name,
                        duration: {
                            seconds: ytMusic.results[i].duration.seconds,
                            label: ytMusic.results[i].duration.text
                        },
                        image: ytMusic.results[i].thumbnail.contents[0].url.replace('w120-h120', 'w600-h600')
                    });
                }
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
    /**
     * Download music with full tag metadata
     * @param {string|TrackSearchResult[]} query title of track want to download
     * @returns {Promise<MusicResult>} filepath of the result
     */
     
    static downloadMusic = async (query) => {
        try {
            const getTrack = Array.isArray(query) ? query : await this.searchTrack(query);
            const search = getTrack[0];
            if (!this.yt) throw new Error('YouTube instance is not initialized');
            const videoInfo = await this.yt.getInfo(search.id);
            let options = { type: 'audio', quality: 'best', format: 'mp4' };
            let stream = this.yt.download(search.id, options);
            const tmpDir = os.tmpdir();
            let songPath = `${tmpDir}/${randomBytes(3).toString('hex')}.mp3`;
            stream.on('error', (err) => console.log(err));

            const file = await new Promise((resolve) => {
                ffmpeg(stream)
                    .audioFrequency(44100)
                    .audioChannels(2)
                    .audioBitrate(128)
                    .audioCodec('libmp3lame')
                    .audioQuality(5)
                    .toFormat('mp3')
                    .save(songPath)
                    .on('end', () => resolve(songPath));
            });
            await this.WriteTags(file, { Title: search.title, Artist: search.artist, Image: search.image, Album: search.album, Year: videoInfo.primary_info.relative_date.text });
            return {
                meta: search,
                path: file,
                size: fs.statSync(songPath).size
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * get downloadable video urls
     * @param {string|URL} query videoID or YouTube URL
     * @param {string} quality 
     * @returns
     */
    static mp4 = async (query, quality = 134) => {
        try {
            if (!query) throw new Error('Video ID or YouTube Url is required');
            const videoId = this.isYTUrl(query) ? this.getVideoID(query) : query;
            if (!this.yt) throw new Error('YouTube instance is not initialized');
            const videoInfo = await this.yt.getInfo(videoId);
            let options = { type: 'video+audio', quality: 'best', format: 'mp4' };
            const stream = await this.yt.download(videoId, options);
            const format = videoInfo.chooseFormat(options);
            const tmpDir = os.tmpdir();
            let videoPath = `${tmpDir}/${randomBytes(3).toString('hex')}.mp4`;
            const writeStream = fs.createWriteStream(videoPath);
            for await (const chunk of Utils.streamToIterable(stream)) {
                writeStream.write(chunk);
            }
            return {
                title: videoInfo.basic_info.title,
                thumb: videoInfo.basic_info.thumbnail[0].url,
                date: videoInfo.primary_info.relative_date.text,
                duration: videoInfo.basic_info.duration,
                channel: videoInfo.basic_info.author,
                quality: format.quality,
                contentLength: format.content_length,
                description: videoInfo.basic_info.short_description,
                videoUrl: videoPath
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Download YouTube to mp3
     * @param {string|URL} url YouTube link want to download to mp3
     * @param {IMetadata} metadata track metadata
     * @param {boolean} autoWriteTags if set true, it will auto write tags meta following the YouTube info
     * @returns 
     */

static mp3 = async (query, quality = 'high') => {
    try {
        if (!query) throw new Error('Video ID or YouTube URL is required');
        const videoId = this.isYTUrl(query) ? this.getVideoID(query) : query;
        if (!this.yt) throw new Error('YouTube instance is not initialized');
        const videoInfo = await this.yt.getInfo(videoId);
        let options = { type: 'video+audio', quality: 'best', format: 'mp4' };
        const stream = await this.yt.download(videoId, options);
        const tmpDir = os.tmpdir();const tempVideoPath = `${tmpDir}/${randomBytes(3).toString('hex')}.mp4`;
        const videoWriteStream = fs.createWriteStream(tempVideoPath);

        // Gabungkan semua chunk menjadi satu file MP4 sementara
        for await (const chunk of Utils.streamToIterable(stream)) {
            videoWriteStream.write(chunk);
        }

        videoWriteStream.end();

        // Buat file MP3 output
        const songPath = `${tmpDir}/${randomBytes(3).toString('hex')}.mp3`;

        // Konversi file MP4 sementara menjadi MP3
        await new Promise((resolve, reject) => {
            ffmpeg(tempVideoPath)            // Menggunakan file video sementara sebagai input
                .audioFrequency(44100)   // Frekuensi audio (sample rate)
                .audioChannels(2)     // Jumlah channel audio
                .audioBitrate(128)       // Bitrate audio
                .audioCodec('libmp3lame')    // Codec audio untuk MP3
                .audioQuality(5)       // Kualitas audio
                .toFormat('mp3')             // Format output MP3
                .save(songPath)              // Menyimpan output ke file MP3
                .on('end', () => resolve(songPath))  // Resolusi setelah selesai
                .on('error', reject);        // Menangani error
        });
        fs.unlinkSync(tempVideoPath);
        return {
            title: videoInfo.basic_info.title,
            thumb: videoInfo.basic_info.thumbnail[0].url,
            date: videoInfo.primary_info.relative_date.text,
            duration: videoInfo.basic_info.duration,
            channel: videoInfo.basic_info.author,
            quality: quality,
            description: videoInfo.basic_info.short_description,
            audioUrl: songPath
        };
    } catch (error) {
        throw error;
    }
}


}

export default YT;