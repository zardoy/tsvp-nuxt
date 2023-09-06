// https://nuxt.com/docs/api/configuration/nuxt-config

import * as fs from 'fs'
import got from 'got'

import stream from 'stream'
import { exec, getDefaultArgs } from 'typescript-json-schema'
import { promisify } from 'util'

export default async () => {
    return defineNuxtConfig({
        experimental: {
            typedPages: true,
        },
        hooks: {
            "build:before": async () => {
                const configTypeSource = './.nuxt/pluginConfig.ts'
                const configTypeJson = './.nuxt/pluginConfig.json'
                if (!fs.existsSync(configTypeJson)) {
                    const configurationType = 'https://raw.githubusercontent.com/zardoy/typescript-vscode-plugins/develop/src/configurationType.ts'
                    const pipeline = promisify(stream.pipeline)
                    fs.mkdirSync('./.nuxt', { recursive: true, })
                    console.log('downloading config file')
                    await pipeline(
                        got.stream(configurationType),
                        fs.createWriteStream(configTypeSource)
                    )
                    console.log('generating extension config schema')
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
            }
        },
        modules: [
            "@nuxtjs/tailwindcss",
            "@nuxtjs/robots"
        ],
        runtimeConfig: {
            public: {
                repo: `${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`
            },
        },
        app: {
            baseURL: './',
            head: {
                title: 'TypeScript Essentials Plugins Homepage',
                meta: [
                    { name: 'description', content: 'TypeScript Essentials Plugins is a Visual Studio Code (VS Code) extension to provide best in class React, Vue and TypeScript experience.' },
                    { name: 'keywords', content: 'typescript,ts,vscode,extension,2023,best extensions,typescript hero,plugin,ide' },
                    { name: 'article:published_time', content: '2023-02-26T13:45:57+00:00' }
                ],
            },
        },
        typescript: {
            typeCheck: 'build',
        },
    });
}
