# Connected Accounts

<VideoPlayer title="Connecting accounts to Pipedream" url="https://www.youtube.com/embed/xmDD1wRWnp0" />

Pipedream allows you to connect accounts for various apps and services within our UI. Once you connect an account, you can link that account to any step of a workflow, and use the OAuth access tokens, API key, or other auth info to make API requests to the desired service.

For example, you can connect to Slack from Pipedream (via their OAuth integration), and use the access token Pipedream generates to authorize requests:

```javascript
import { WebClient } from '@slack/web-api';

// Sends a message to a Slack Channel
export default defineComponent({
  props: {
    slack: {
      type: 'app',
      app: 'slack'
    }
  },
  async run({ steps, $ }) {
    const web = new WebClient(this.slack.$auth.oauth_access_token)
    return await web.chat.postMessage({
      text: "Hello, world!",
      channel: "#general",
    })
  })
});
```

Or skip using code and use any connected account with an HTTP request step.

![Connecting to Slack using the HTTP request builder](https://res.cloudinary.com/pipedreamin/image/upload/v1673535786/docs/CleanShot_2023-01-12_at_10.02.47_xkv0ac.gif)


[[toc]]

## Supported Apps

Pipedream supports [{{$site.themeConfig.PUBLIC_APPS}}+ apps](https://pipedream.com/apps), with more added every day.

If we don't support a service you need, please [request an app here](#requesting-a-new-app-or-service).

## Connecting accounts

### From an action

Prebuilt actions that connect to a specific service require you connect your account for that service before you run your workflow. Click the **Connect [APP]** button to get started.

Depending on the integration, this will either:

- Open the OAuth flow for the target service, prompting you to authorize Pipedream to access your account, or
- Open a modal asking for your API credentials for key-based services

If you've already connected an account for this app, you'll also see a list of existing accounts to select from.

### From the HTTP Request action

Craft a custom HTTP request in a workflow with a connected account _without code_.

In a new step, select the **Send any HTTP Request** to start a new HTTP Request action.

![Starting a new HTTP request action in a workflow](https://res.cloudinary.com/pipedreamin/image/upload/v1672947285/docs/CleanShot_2023-01-05_at_14.34.25_wi8rcc.png)

Then, within the new HTTP request, open the **Authorization Type** dropdown to select a **Select an app**:

![Opening the HTTP Request Authorization Type dropdown](https://res.cloudinary.com/pipedreamin/image/upload/v1673535917/docs/CleanShot_2023-01-12_at_10.05.02_vmttbf.png)

This will open a new prompt to select an app to connect with. Once you select an app, the HTTP request will be updated with the correct headers to authenticate with that app's API.

![Select an account](https://res.cloudinary.com/pipedreamin/image/upload/v1673536044/docs/CleanShot_2023-01-12_at_10.07.06_rejzyy.gif)

Once you connect the selected app account Pipedream will autmatically include your account's authentication keys in the request in the headers, as well as update the URL to match the selected service.

Now you can modify the request path, method, body or query params to perform an action on the endpoint with your authenticated account.

### From a code step

You can connect accounts to code steps by using an `app` prop. Refer to the [connecting apps in Node.js documentation](/code/nodejs/auth/).


## Managing Connected Accounts from Apps

Visit [https://pipedream.com/accounts](https://pipedream.com/accounts) to see the list of your connected accounts.

You can perform the following operations on accounts:

- Add a new account
- Delete an account
- Reconnect an account
- Change the nickname associated with an account

You'll also see some data associated with these accounts:

- For OAuth apps, the scopes you've granted Pipedream access to
- The workflows where you're using the account.

## Reconnect an account

If you encounter errors in a step that appear to be related to credentials / authorization, you can reconnect your account:

1. Visit [https://pipedream.com/accounts](https://pipedream.com/accounts)
2. Search for your account
3. Click on the *...* next to your account, on the right side of the page
4. Select the option to **Reconnect** your account

## Types of Integrations

### OAuth

For services that support OAuth, Pipedream operates an OAuth application that mediates access to the service so you don't have to maintain your own app, store refresh and access tokens, and more.

When you connect an account, you'll see a new window open where you authorize the Pipedream application to access data in your account. Pipedream stores the OAuth refresh token tied to your authorization grant, automatically generating access tokens you can use to authorized requests to the service's API. You can [access these tokens in code steps](/code/nodejs/auth/).

### Key-based

We also support services that use API keys or other long-lived tokens to authorize requests.

For those services, you'll have to create your keys in the service itself, then add them to your connected accounts in Pipedream.

For example, if you add a new connected account for **Sendgrid**, you'll be asked to add your Sendgrid API key.

## Account Security

[See our security docs](/privacy-and-security/#third-party-oauth-grants-api-keys-and-environment-variables) for details on how Pipedream secures your connected accounts.

## Requesting a new app or service

Please request new apps by [opening an issue on GitHub](https://github.com/PipedreamHQ/pipedream/issues/new?assignees=&labels=app%2C+enhancement&template=app---service-integration.md&title=%5BAPP%5D).

<Footer />