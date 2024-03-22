import DefaultTheme from 'vitepress/theme'
import { listen } from 'quicklink'
import './style.css'
listen({
    prerenderAndPrefetch: true
})

export default DefaultTheme
