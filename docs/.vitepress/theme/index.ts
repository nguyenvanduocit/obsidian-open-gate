import DefaultTheme from 'vitepress/theme'
// @ts-ignore
if (!import.meta.env.SSR) {
    import('quicklink').then((module) => {
        module.listen()
    })
}
import './style.css'

export default DefaultTheme
