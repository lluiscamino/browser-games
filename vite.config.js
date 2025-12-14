import { resolve } from 'path'

/** @type {import('vite').UserConfig} */
export default {
    base: '/browser-games/',
    build: {
        rollupOptions: {
            input: {
                rulatrago: resolve(__dirname, 'rulatrago.html')
            }
        }
    }
}