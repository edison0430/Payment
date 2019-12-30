import Vue from 'vue'
import App from './App.vue'

import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import animated from 'animate.css'

// Add svg
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./assets/svg', true, /\.svg$/);
requireAll(req);

Vue.use(ElementUI);
Vue.use(animated);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
