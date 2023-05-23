// https://nuxt.com/docs/api/configuration/nuxt-config

import * as fs from 'fs'
import got from 'got'

const configurationType = ''
import stream from 'stream'
import { request } from 'https'
import { exec, getDefaultArgs } from 'typescript-json-schema'
import { promisify } from 'util'

export default defineNuxtConfig({
    experimental: {
        typedPages: true,
    },
    runtimeConfig: {
        public: {
            configuration: ''
        },
    },
    modules: [
        "@nuxtjs/tailwindcss"
    ],
    app: {
        baseURL: './',
    },
    typescript: {
        // typeCheck: 'build',
    },
    hooks: {
        async "build:before"() {
            if (process.env.NUXT_PUBLIC_CONFIGURATION) return
            const configTypeSource = './.nuxt/pluginConfig.ts'
            const configTypeJson = './.nuxt/pluginConfig.json'
            if (!fs.existsSync(configTypeJson)) {
                const configurationType = 'https://raw.githubusercontent.com/zardoy/typescript-vscode-plugins/develop/src/configurationType.ts'
                const pipeline = promisify(stream.pipeline)
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
            process.env.NUXT_PUBLIC_CONFIGURATION = fs.readFileSync(configTypeJson, 'utf8')
        }
    },
})
