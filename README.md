# The World

## Getting Started

### Workflow

At Clarity Hub, we use:

- [ ] Git – [Download for Mac](https://git-scm.com/download/mac)
- [ ] Git flow – `$ brew install git-flow`; [More info](https://github.com/nvie/gitflow/wiki/Mac-OS-X)
- [ ] Git auto complete – [Mac Installation](https://github.com/bobthecow/git-flow-completion/wiki/Install-Bash-git-completion)
- [ ] Docker – [Mac Installation](https://docs.docker.com/docker-for-mac/install/#download-docker-for-mac)
- [ ] nvm – [NVM installation](https://github.com/creationix/nvm#installation)
  - or, [Node 8.0 download](https://nodejs.org/en/download/current/)
- [ ] yarn – `$ brew install https://raw.githubusercontent.com/Homebrew/homebrew-core/db259153b81c8a5db00e93fe7bc467228f9df8da/Formula/yarn.rb`; [More info](https://yarnpkg.com/lang/en/docs/install/)

Once installed:

1. Increase your Docker Memory setting (probably to around 10+ GB). Elastic eats RAM.
2. Copy any `settings.example.json` files in each service folder to `settings.json`.
  - You may need to fill in the values with your own keys
  - **We are looking to automate this** – Feel free to write a script that does this
3. Add
    ```
    Host gitlab.com
        PubkeyAcceptedKeyTypes +ssh-rsa
        HostName gitlab.com
        IdentityFile ~/.ssh/***id_rsa***
        User git
   	```
    to `~/.ssh/config`
  - If you are having problems with the `PubkeyAcceptedKeyTypes`, just remove the line
4. Run `yarn install`
5. Open two tabs. In the first tab run `yarn start:db`
6. In the second tab, run `yarn start:services`. After the first build, you can run `export SKIP_MIGRATIONS=true; yarn fast-start`.
6. Open `www.clarityhub.app` in your browser of choice
7. On Mac, open up your Keychain Access
  - Go to the System tab
  - Take the `cert.key` file in `/nginx/` and drag it into the listing
  - Find it and Right Click and Get Info
  - Open up "Trust"
  - Change "When using this certificate" to "Always trust"
  - You should no longer have any HTTPS insecure response problems


Feel free to use Git Flow to create feature branches, but typically `master` can
be worked with directly (as long as you push passing commits).

Use feature flags if you are working in `master`.

Use `git pull origin master --rebase` to avoid merge commits.

## Creating a New Service

1. `./services.js` – Add a mapping for your service's name
2. `./db/Dockerfile` – Add your service's db init if it needs new databases
3. `./scripts/create-ssl` – If your service uses a new domain name, add it to the ssl config
4. `./scripts/copy-jwt-keys` – Add your service as a `cp` entry if it needs to verify JWTs
5. `./docker-compose.yml` – Add your service to the Docker world

## SSH into an Instance

```sh
source ./docker-ids

docker exec -it $WIDGETS /bin/bash
```

Sometimes, you may need to add databases to postgres when we add services. If you get an error that looks like this:
`Unable to connect to database: SequelizeConnectionError: database "clairvoyance_{database name}" does not exist`, it can be fixed by adding the databases manually in postgres.

```sh
docker exec -it clairvoyance_postgres_1 psql -U postgres 
```
Then, copy the commands from the service's `db/init.sh` and run them in the postgres instance. `\q` to quit when you're done.

## Debugging with Docker+VSCode

You can debug a node instance by doing the following:

1. In the `docker-compose.yml` file, open up the following port for the container
the you want to debug:

```
- "5858:5858"
- "9229:9229"
```

2. In the service that you want to debug, set the start script to the following in `package.json`:

```
nodemon --inspect=0.0.0.0:9229 ./src/index.js
```

3. In VSCode, go to `Debug->Open Configurations` and set a configuration to look
like the following:

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to Remote",
      "address": "127.0.0.1",
      "port": 9229,
      "localRoot": "${workspaceRoot}/repos/services/service-analytics",
      "remoteRoot": "/app/"
    }
  ]
}
```

In the above example, the `service-analytics` repo is being debugged. Change the path
appropriately for the repo you would like to debug.

4. Restart your Docker service. `docker-compose restart service-analytics`.
5. In VSCode, go to `Debug->Start Debugging`. You should now be able to set breakpoints
in your code and VSCode will help you step through the process.
