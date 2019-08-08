# Strapi custom plugin with frontend
This document describes Strapi (beta) custom plugin development including frontend with webpack hot reload feature. This tutorial is limited to Mac/Linux environment.

## Install Strapi as global package
We will need global npm strapi commands.

```bash
npm install strapi@beta -g
```

## Make your code directory e.g. /path/to/code (`mkdir code && cd code`)
We will have following structure in this directory (*do not make those folders yet*).

```bash
./code
  ./strapi   
  ./my-development-project
  ./strapi-plugin-my-demo
```

## Fork and then Git clone Strapi project using  SSH (that will make our /strapi folder) 
```bash
cd /path/to/code
git clone git@github.com:<MY_GIT_USERNAME>/strapi.git
```

## Setup Strapi app project

```bash
cd /path/to/code/strapi

# Using Yarn (recommended)
yarn setup

# Using npm
npm run setup
```

## Create new Strapi project
You can use strapi command or brand new `npx create-strapi-app`

```bash
strapi new my-development-project —quickstart
```

or (with the same result)

```bash
npx create-strapi-app my-development-project
```

This command will block your terminal, because it will start nodejs webserver with strapi.
Just terminate `CTRL + C` since we don't need it right now.

## Generate new strapi plugin

```bash
cd /path/to/code/my-development-project
strapi generate:plugin my-demo
```

Because Strapi will generate in current version (beta-13) our plugin without
`/admin` files, we need to add them manually. There is some basic setup that must
be done. You can find it in this repo. Nevertheless I strongly suggest to discover strapi
`packages` directory for the other plugins and read how plugins with admin interface
are implemented. You can inspire here to your own plugin implementation like using
React Redux, Saga etc.

I also recommend to read strapi [blog article](https://blog.strapi.io/buffet-js-v1-is-out/)
about React Component Library made for Strapi and implementing [Buffet.js](https://www.buffetjs.io/).
It will help you to make your plugin's UI with nice Strapi look.

> Bufffetjs will be available in your project with the beta-18 until then you have a components Library in the Strapi monorepository
 it's located in `./strapi/packages/strapi-helper-plugin/lib`. Then entire UI is based on this package.


> Clone this repo and copy the  /admin directory to the root of your newly generated plugin.

## Move our new plugin to the Strapi project

Now we move our plugin out of the `my-development-project` so we develop it as a stand alone plugin. Actually we used Strapi project like incubator for the plugin.

```bash
mv /path/to/code/my-development-project/plugins/my-demo/ /path/to/code/strapi-plugin-my-demo/
```

Please note, that we also renamed plugin directory so it conforms `strapi-plugin-` naming rule.

## Let Strapi app know, that we develop the strapi-plugin-my-demo plugin

Make simlink from your plugin directory to the `./strapi/packages` so Strapi app have reference to our plugin.

```bash
ln -s /path/to/code/strapi_demo/ /path/to/code/strapi/packages/strapi-plugin-my-demo
```

Edit following file: `./strapi/packages/strapi-admin/admin/src/plugins.js`
And add new line to the end of the exported object

```js
'strapi-plugin-my-demo': require('../../../strapi-plugin-my-demo/admin/src').default,
```

## Run Strapi project in development mode
in development mode to get it on http://localhost:1337
```bash
cd /path/to/code/my-development-project

# Using yarn
yarn develop

# Using npm
npm run develop
```

Open new terminal window, because you need two processes running. One process on port 1337, second process on port 4000.

## Run Strapi app (downloaded from git) in development mode
in development mode to get it on http://localhost:4000. You will see your plugin
on this port with webpack server live reload.
```bash
cd /path/to/code/strapi/packages/strapi-admin
npm run develop
```

Now when you navigate your browser to the http://localhost:4000, you will see the
Strapi admin and in plugins left menu will be available your new plugin.

Let's make some change to the plugin so we verify that hot reload works.
Open the `/admin/src/index.js` file and change

```html
<div>
  <h1>Demo plugin</h1>
  <p>Hello in demo plugin</p>
</div>
```
to
```html
<div style={{padding: '18px 30px'}}>
  <h1>Demo plugin</h1>
  <p>Hello in demo plugin</p>
</div>
```

Save file and look to the plugin page. Is there fixed padding? Then you did good job :-)

> TIP: You can comment other plugins in `plugins.js` file mentioned above for better development performance.