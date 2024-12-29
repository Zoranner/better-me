import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import "flyonui/flyonui";

import './styles/main.css';

// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

// 注册快捷键
window.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Shift + I
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
    // @ts-ignore
    window.electron.openDevTools()
  }
})

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
