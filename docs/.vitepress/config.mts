import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'OpenGate',
    description: 'Embed any website into Obsidian',
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
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:locale', content: 'en' }],
        ['meta', { property: 'og:title', content: 'OpenGate - Embed any website into Obsidian' }],
        ['meta', { property: 'og:site_name', content: 'OpenGate' }]
    ],
    themeConfig: {
        logo: { src: '/logo-small.webp', width: 24, height: 24 },
        nav: [
            { text: 'Install', link: 'https://obsidian.md/plugins?id=open-gate' },
            { text: 'Tutorial', link: '/introduction' },
            { text: 'Discord', link: 'https://discord.gg/PuwWpvUN' },
            { text: 'Support', link: 'https://aiocean.atlassian.net/servicedesk/customer/portal/4' }
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
        markdown: {
            image: {
                // image lazy loading is disabled by default
                lazyLoading: true
            }
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
                items: [
                    { text: 'Gate Options', link: '/gate-options' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/nguyenvanduocit/obsidian-open-gate' }
        ]
    }
})
