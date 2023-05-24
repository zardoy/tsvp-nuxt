// https://nuxt.com/docs/api/configuration/nuxt-config

import * as fs from 'fs'
import got from 'got'

import stream from 'stream'
import { request } from 'https'
import { exec, getDefaultArgs } from 'typescript-json-schema'
import { promisify } from 'util'

export default async () => {
    const configTypeSource = './.nuxt/pluginConfig.ts'
    const configTypeJson = './.nuxt/pluginConfig.json'
    if (!fs.existsSync(configTypeJson)) {
        const configurationType = 'https://raw.githubusercontent.com/zardoy/typescript-vscode-plugins/develop/src/configurationType.ts'
        const pipeline = promisify(stream.pipeline)
        fs.mkdirSync('./.nuxt', {recursive: true,})
        console.log('downloading config file')
        await pipeline(
            got.stream(configurationType),
            fs.createWriteStream(configTypeSource)
        )
        console.log('generating type')
        await exec(configTypeSource, 'Configuration', {
            ...getDefaultArgs(),
            out: configTypeJson,
            ignoreErrors: true,
            ref: false,
            required: true,
            strictNullChecks: true,
            topRef: true,
            validationKeywords: ['enumDescription', 'suggestSortText', 'defaultSnippets', 'recommended'],
        })
    }
    const pluginSetings = fs.readFileSync(configTypeJson, 'utf8');

    return defineNuxtConfig({
        // experimental: {
        //     typedPages: true,
        // },
        runtimeConfig: {
            public: {
                configuration: pluginSetings,
            },
            // test: 5
        },
        modules: [
            "@nuxtjs/tailwindcss",
        ],
        app: {
            baseURL: './',
        },
        // typescript: {
        //     // typeCheck: 'build',
        // },
    });
}
