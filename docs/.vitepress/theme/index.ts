import DefaultTheme from 'vitepress/theme'
import SocialMarquee from './components/SocialMarquee.vue'
import { App } from 'vue'

export default {
    ...DefaultTheme,
    enhanceApp({ app }: { app: App }) { // 明确指定参数类型
        app.component('SocialMarquee', SocialMarquee)
    }
}
