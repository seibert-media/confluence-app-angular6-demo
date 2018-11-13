# Demo Confluence-plugin with Angular 6 UI

This is a demo project showing how to setup a confluence plugin with a modern Angular-App as frontend for
the client. There are some problems solved that can help you in your own setup.

## Basic setup strategy

The strategy used is to use webpack to bundle all stuff from the angular app. WrmPlugin is used to 
integrate into the atlassian-plugin.xml without any need to modify it manually.

## Build and run

### Production

Production-build is exactly the same as for every confluence-plugin:

`atlas-package`

Maven will build the angular-app for you and plug it in your obr file.

### Development-Server

You will get a webpack development server running your angular app. It will automatically reload when
you change the angular app. Your confluence-plugin will run on atlas-run server. If you change the java 
backend-files, you have to deploy the changes in order to run on the dev server.

1. Start your confluence dev server:  change to the project root and run
`atlas-run -P dev`
1. In a second terminal, again from your project root, start your webpack-dev-server
`npm run webpack-dev`

After both services are up and running you should get your confluence here
[http://localhost:1990/confluence/plugins/angulardemo/angulardemo.action]([http://localhost:1990/confluence/plugins/angulardemo/angulardemo.action]()
)
The login should be user admin, password admin.

Redeploy your plugin after java-changes:
 `atlas-package -P dev`




##Todos
* package.config files clean
* setup tests

