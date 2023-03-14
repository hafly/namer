import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {
  Button,
  Input,
  Radio,
  Spin
} from 'ant-design-vue'

createApp(App)
  .use(router)
  .use(Button)
  .use(Input)
  .use(Radio)
  .use(Spin)
  .mount('#app')
