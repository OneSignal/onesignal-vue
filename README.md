<h1 align="center">welcome to onesignal-vue 👋</h1>

<p>
  <a href="https://www.npmjs.com/package/onesignal-vue" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/onesignal-vue.svg">
  </a>
  <a href="https://github.com/OneSignal/onesignal-vue#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/OneSignal/onesignal-vue/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://twitter.com/onesignal" target="_blank">
    <img alt="Twitter: onesignal" src="https://img.shields.io/twitter/follow/onesignal.svg?style=social" />
  </a>
</p>

> This is a JavaScript module that can be used to easily include [OneSignal](https://onesignal.com/) code in a website or app that uses Vue for its front-end codebase.

* 🏠 [Homepage](https://onesignal.com)
* 🖤 [npm](https://www.npmjs.com/package/onesignal-vue)

OneSignal is the world's leader for Mobile Push Notifications, Web Push, and In-App Messaging. It is trusted by 800k businesses to send 5 billion Push Notifications per day.

You can find more information on OneSignal [here](https://onesignal.com/).

> Upgrading from Version 1?
See our [migration guide](./MigrationGuide.md) if coming from v1.

## Contents
- [Install](#install)
- [Usage](#usage)
- [API](#onesignal-api)
- [Advanced Usage](#advanced-usage)

---
## Vue Compatibility
Make sure you install a plugin version compatible with your Vue environment.

| Vue | OneSignal Plugin |
|-----|------------------|
| 2   | onesignal-vue              |
| 3   | [onesignal-vue3](https://github.com/OneSignal/onesignal-vue3)               |


---
## Install

You can use `yarn` or `npm`.


### Yarn

```bash
yarn add onesignal-vue
```

### npm

```bash
npm install --save onesignal-vue
```

---
## Usage

## Plugin setup
```js
import Vue from 'vue'
import OneSignalVue from 'onesignal-vue'

Vue.use(OneSignalVue);
```

Initialize OneSignal with your `appId` via the `options` parameter:

```js
new Vue({
  render: h => h(App),
  beforeMount() {
    this.$OneSignal.init({ appId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
  }
}).$mount('#app')
```

The `init` function returns a promise that resolves when OneSignal is loaded.

**Examples**
```js
await this.$OneSignal.init({ appId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
// do other stuff
```

```js
this.$OneSignal.init({ appId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }).then(() => {
  // do other stuff
});
```

### Code completion
For code completion to work correctly, make sure you import the plugin (e.g: in child components).

```vue
<script>
import OneSignalVue from 'onesignal-vue';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  beforeCreate() {
    // Example prompting for notification permission
    this.$OneSignal.User.PushSubscription.optIn();
  }
}
</script>
```

### Init Options
You can pass other [options](https://documentation.onesignal.com/v11.0/docs/web-sdk#initializing-the-sdk) to the `init` function. Use these options to configure personalized prompt options, auto-resubscribe, and more.

<details>
  <summary>Expand to see more options</summary>

  | Property Name               | Type                  | Description                                        |
| ---------------------------| --------------------- | -------------------------------------------------- |
| `appId`                     | `string`              | The ID of your OneSignal app.                      |
| `autoRegister`              | `boolean` (optional)  | Whether or not to automatically register the user. |
| `autoResubscribe`           | `boolean` (optional)  | Whether or not to automatically resubscribe the user. |
| `path`                      | `string` (optional)   | The path to the OneSignal service worker file.     |
| `serviceWorkerPath`         | `string` (optional)   | The path to the OneSignal service worker script.   |
| `serviceWorkerUpdaterPath`  | `string` (optional)   | The path to the OneSignal service worker updater script. |
| `subdomainName`             | `string` (optional)   | The subdomain of your OneSignal app.               |
| `allowLocalhostAsSecureOrigin` | `boolean` (optional) | Whether or not to allow localhost as a secure origin. |
| `requiresUserPrivacyConsent`| `boolean` (optional)  | Whether or not the user's consent is required.     |
| `persistNotification`       | `boolean` (optional)  | Whether or not notifications should persist.       |
| `notificationClickHandlerMatch`| `string` (optional) | The URL match pattern for notification clicks.     |
| `notificationClickHandlerAction`| `string` (optional)| The action to perform when a notification is clicked. |
| `welcomeNotification`       | `object` (optional)   | The welcome notification configuration.            |
| `notifyButton`              | `object` (optional)   | The notify button configuration.                   |
| `promptOptions`             | `object` (optional)   | Additional options for the subscription prompt.    |
| `webhooks`                  | `object` (optional)   | The webhook configuration.                         |
| `[key: string]`             | `any`                 | Additional properties can be added as needed.      |

**Service Worker Params**
You can customize the location and filenames of service worker assets. You are also able to specify the specific scope that your service worker should control. You can read more [here](https://documentation.onesignal.com/docs/onesignal-service-worker-faq#sdk-parameter-reference-for-service-workers).

In this distribution, you can specify the parameters via the following:

| Field                      | Details                                                                                                                |
|----------------------------|------------------------------------------------------------------------------------------------------------------------|
| `serviceWorkerParam`       | Use to specify the scope, or the path the service worker has control of.  Example:  `{ scope: "/js/push/onesignal/" }` |
| `serviceWorkerPath`        | The path to the service worker file.                                                                                   |

</details>

---

### Service Worker File
If you haven't done so already, you will need to add the [OneSignal Service Worker file](https://github.com/OneSignal/OneSignal-Website-SDK/files/7585231/OneSignal-Web-SDK-HTTPS-Integration-Files.zip) to your site ([learn more](https://documentation.onesignal.com/docs/web-push-quickstart#step-6-upload-files)).

The OneSignal SDK file must be publicly accessible. You can put them in your top-level root or a subdirectory. However, if you are placing the file not on top-level root make sure to specify the path via the service worker params in the init options (see section above).

**Tip:**
Visit `https://yoursite.com/OneSignalSDKWorker.js` in the address bar to make sure the files are being served successfully.

---
### Typescript
This package includes Typescript support.

```ts
interface IOneSignalOneSignal {
	Slidedown: IOneSignalSlidedown;
	Notifications: IOneSignalNotifications;
	Session: IOneSignalSession;
	User: IOneSignalUser;
	Debug: IOneSignalDebug;
	login(externalId: string, jwtToken?: string): Promise<void>;
	logout(): Promise<void>;
	init(options: IInitObject): Promise<void>;
	setConsentGiven(consent: boolean): Promise<void>;
	setConsentRequired(requiresConsent: boolean): Promise<void>;
}
```

### OneSignal API
See the official [OneSignal WebSDK reference](https://documentation.onesignal.com/v11.0/docs/web-sdk#initializing-the-sdk) for information on all available SDK functions.

---
## Advanced Usage
### Events and Event Listeners
Use listeners to react to OneSignal-related events:

### Notifications Namespace
| Event Name | Callback Argument Type |
|-|-|
|'click'      | NotificationClickEvent|
|'foregroundWillDisplay'| NotificationForegroundWillDisplayEvent
| 'dismiss'| NotificationDismissEvent|
|'permissionChange'| boolean|
|'permissionPromptDisplay'| void|

### Slidedown Namespace
| Event Name | Callback Argument Type |
|-|-|
|'slidedownShown'      | boolean |

### Push Subscription Namespace
| Event Name | Callback Argument Type |
|-|-|
|'change'      | boolean |

**Example**
```js
OneSignal.Notifications.addEventListener('click', (event) => {
  console.log("The notification was clicked!", event);
});
```

See the [OneSignal WebSDK Reference](https://documentation.onesignal.com/v11.0/docs/web-sdk#initializing-the-sdk) for all available event listeners.

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/OneSignal/onesignal-vue/issues).

## Show your support

Give a ⭐️ if this project helped you!

## OneSignal

* [Website](https://onesignal.com)
* Twitter: [@onesignal](https://twitter.com/onesignal)
* Github: [@OneSignal](https://github.com/OneSignal)
* LinkedIn: [@onesignal](https://linkedin.com/company/onesignal)

## Discord
Reach out to us via our [Discord server](https://discord.com/invite/EP7gf6Uz7G)!

## 📝 License

Copyright © 2022 [OneSignal](https://github.com/OneSignal).<br />
This project is [Modified MIT](https://github.com/OneSignal/onesignal-vue/blob/main/LICENSE) licensed.


Enjoy!
