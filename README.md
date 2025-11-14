# Minimal setup for svelte x pocketbase

1. clone this repo
2. put pocketbase file inside `pb` folder
3. install
4. run using `./pocketbase serve` inside `pb` folder

# Pocketbase Setup

Follow [this instruction](https://github.com/pocketbase/pocketbase/discussions/537)

DOCKER SETUP:

```
FROM alpine:latest

ARG PB_VERSION=0.25.8 // use the version of PB you're using

RUN apk add --no-cache \
    unzip \
    ca-certificates \
    # this is needed only if you want to use scp to copy later your pb_data locally
    openssh

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# uncomment to copy the local pb_migrations dir into the container
# COPY ./pb_migrations /pb/pb_migrations

# uncomment to copy the local pb_hooks dir into the container
# COPY ./pb_hooks /pb/pb_hooks

EXPOSE 8080

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
```

Run flyctl auth signup to create a Fly.io account (email or GitHub).

Run flyctl auth login to login.

run flyctl launch --build-only on the same route

price accordingly https://fly.io/docs/about/pricing/#free-allowances (<$5)

flyctl volumes create pb_data --size=1

add this in fly.toml

```
[mounts]
  destination = "/pb/pb_data"
  source = "pb_data"
```

flyctl deploy

> Note: The first time when you try to access the PocketBase dashboard you'll have to check your Fly Monitoring logs for the PocketBase installer page url in order to setup your superuser account (replace localhost with your Fly url). For more details why this change was introduced, you can check #5814.

# Pocketbase scripts and typegen

Note: don't need to install pocketbase-typegen

```
package scripts

"pb": "pb/pocketbase serve",
"typegen": "npx pocketbase-typegen --env --out ./src/types/pb.d.ts"
```

```
envs

PB_TYPEGEN_EMAIL=
PB_TYPEGEN_PASSWORD=
PB_TYPEGEN_URL=
```

```
.gitignore

# pocketbase
pb/pocketbase
pb/pb_data
pb/pb_data/*
pb/LICENSE.md
```

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
