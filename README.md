# Way To AGI

## Tech

### install

```shell
# ref: https://github.com/yarnpkg/berry/issues/3521#issuecomment-1907517793
# 阿里的库会有证书过期问题
yarn config set "strict-ssl" false -g
```

### wechat-auth

虽然微信登录起步是访问一个 open-wechat 的网址，但不能直接点击跳转，而是在 provider 的 authorizationUrl 里配置好后，在程序里使用 `signIn` 去操作，否则会报 `State cookie was missing`。

### zustand

- zustand doesn't recommend `create without curried workaround`, see: https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md#create-without-curried-workaround

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
