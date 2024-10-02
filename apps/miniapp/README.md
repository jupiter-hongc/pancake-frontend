# Telegram mini-app for Pancakeswap prediction

# Start Development

```
pnpm install
pnpm run dev
```

# Theming

Using Tailwind

Edit index.css css color variable

# Components Lib

Using Shadcn UI

https://ui.shadcn.com/

# Pancakeswap Telegram Bot Start Parameters

This is a documentation for passing start parameters to the mini app

- Base URL https://t.me/pancakefi_bot?startapp=\<data here>

Due the limitation of the `startapp` query string, we have to base64 encode the data before passing via `startapp` param.

For example:

```json
{
  "campaign": "twitter-post-id"
}
```

```ts
// Convert to base64
const encodeStartParam = btoa(
  JSON.stringify({
    campaign: "campaign-id",
  })
);

// output - eyJjYW1wYWlnbiI6InR3aXR0ZXItcG9zdC1pZCJ9
```

```sh
# Send to the users for promotion
https://t.me/pancakefi_bot?startapp=eyJjYW1wYWlnbiI6InR3aXR0ZXItcG9zdC1pZCJ9
```

> PS: Some base encode tool will append `=` at the end, please remove it. otherwise it might not works

## Parameters Docs and usage

| Parameter name | Type   | Description                                                                                                 |
| -------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| campaign       | string | passing to the GA for tracking current user from which campaign, In GA this become a custom event parameter |
