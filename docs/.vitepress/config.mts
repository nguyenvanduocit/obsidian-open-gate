import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'OpenGate',
    description: 'Embed any website into Obsidian - The ultimate plugin for seamless web integration in your notes',
    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,
    locales: {
        root: {
            label: 'English',
            lang: 'en'
        },
        fr: {
            label: 'Vietnamese',
            lang: 'vi',
            link: '/vi'
        }
    },
    head: [
        // Basic meta tags
        ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
        ['meta', { name: 'robots', content: 'index, follow' }],
        ['meta', { name: 'keywords', content: 'obsidian, plugin, web embed, productivity, note-taking, open gate, iframe' }],
        ['meta', { name: 'author', content: 'Duoc NV' }],

        // Open Graph meta tags
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:locale', content: 'en' }],
        ['meta', { property: 'og:title', content: 'OpenGate - Embed any website into Obsidian' }],
        [
            'meta',
            {
                property: 'og:description',
                content: 'The ultimate Obsidian plugin for seamless web integration in your notes. Embed any website, customize appearance, and boost your productivity.'
            }
        ],
        ['meta', { property: 'og:site_name', content: 'OpenGate' }],
        ['meta', { property: 'og:image', content: '/logo.webp' }],

        // Twitter Card meta tags
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:site', content: '@duocdev' }],
        ['meta', { name: 'twitter:creator', content: '@duocdev' }],
        ['meta', { name: 'twitter:title', content: 'OpenGate - Embed any website into Obsidian' }],
        [
            'meta',
            {
                name: 'twitter:description',
                content: 'The ultimate Obsidian plugin for seamless web integration in your notes. Embed any website, customize appearance, and boost your productivity.'
            }
        ],
        ['meta', { name: 'twitter:image', content: '/logo.webp' }],

        // Favicon
        ['link', { rel: 'icon', type: 'image/webp', href: '/logo-small.webp' }]
    ],
    themeConfig: {
        logo: { src: '/logo-small.webp', width: 24, height: 24 },
        nav: [
            { text: 'Install', link: 'https://obsidian.md/plugins?id=open-gate' },
            { text: 'Tutorial', link: '/introduction' },
            { text: 'Community', link: 'https://community.aiocean.io/' }
        ],
        editLink: {
            pattern: 'https://github.com/nguyenvanduocit/obsidian-open-gate/edit/main/docs/:path'
        },
        search: {
            provider: 'local'
        },
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2019-present Duoc NV'
        },
        sidebar: [
            {
                text: 'Introduction',
                collapsed: false,
                items: [
                    { text: 'What is Open Gate?', link: '/introduction' },
                    { text: 'Getting Started', link: '/getting-started' }
                ]
            },
            {
                text: 'Tutorial',
                collapsed: false,
                items: [
                    { text: 'Add Gate', link: '/add-gate' },
                    { text: 'Quick Switch', link: '/quick-switch' },
                    { text: 'Inline Embedded', link: '/inline-embedded' },
                    { text: 'Gate Link', link: '/gate-link' },
                    { text: 'Custom CSS', link: '/custom-css' },
                    { text: 'Custom JavaScript', link: '/custom-javascript' }
                ]
            },
            {
                text: 'Preferences',
                collapsed: false,
                items: [{ text: 'Gate Options', link: '/gate-options' }]
            }
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/nguyenvanduocit/obsidian-open-gate' }]
    }
})
