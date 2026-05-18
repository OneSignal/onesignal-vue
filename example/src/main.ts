import Vue from 'vue';
import OneSignalVuePlugin from 'onesignal-vue';

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(OneSignalVuePlugin);

new Vue({
  render: (h) => h(App),
  beforeMount() {
    this.$OneSignal.init({
      appId: '<YOUR_APP_ID>',
      allowLocalhostAsSecureOrigin: true,
    });
  },
}).$mount('#app');
