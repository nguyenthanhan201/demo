setup: https://www.youtube.com/watch?v=o7jhf97m_gg </br>
i18n: https://viblo.asia/p/nextjs-da-ngon-ngu-khong-can-thu-vien-ngoai-Eb85oe0OZ2G </br>
live steaming: https://blog.logrocket.com/build-react-live-streaming-app-100ms/ </br>
optimizer bundle: https://knip.dev/ </br>
zustand: https://codesandbox.io/p/devbox/nextjs-with-zustand-ku82o?file=%2Fpages%2F_app.js%3A5%2C17-5%2C27 </br>
million: https://million.dev/docs/install </br>
config axios: https://gist.github.com/moogii/f4b3c35b22ca1b20fdcbc0fa770069ca </br>
docker: https://github.com/hoalongnatsu/Dockerfile?tab=readme-ov-file#dockerfile-for-react </br>
ffmpeg: https://www.youtube.com/watch?v=ypYw6Cm6cUk </br>
clean-architecture: https://dev.to/rubemfsv/clean-architecture-applying-with-react-40h6 <br/>
intergate momo: https://www.youtube.com/watch?v=ZlvwqtfCEUM
Deploy server lưu trữ và resize ảnh như Viblo trên Kubernetes: https://viblo.asia/p/deploy-server-luu-tru-va-resize-anh-nhu-viblo-tren-kubernetes-AZoJjnd3JY7#_clone-source-3

Note: microfrontends run in the following address:

- app-shell: localhost:3002
- nextjs-module-admin: localhost:3000
- nextjs-module-livestream: localhost:3001
- vue-app: localhost:3003

## Documents

- [Todos](./docs/todo.md)
- [Env](./docs/env.md)
- [Testing](./docs/testing.md)

## Command check unsed dependencies

```sh
npx depcheck
```

## Flow working

```sh
checkout form main branch
```

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
- [Polymorphism in Javascript](https://dev.to/m__mdy__m/polymorphism-in-javascript-3l84?ref=dailydev)
- [Zustand Prevent Re-renders](https://dev.to/eraywebdev/optimizing-zustand-how-to-prevent-unnecessary-re-renders-in-your-react-app-59do)
- [Biome-Format, lint, and more in a fraction of a second.](https://biomejs.dev/)
