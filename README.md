You have successfully created an Atlassian Plugin!

Here are the SDK commands you'll use immediately:

* atlas-run   -- installs this plugin into the product and starts it on localhost
* atlas-debug -- same as atlas-run, but allows a debugger to attach at port 5005
* atlas-cli   -- after atlas-run or atlas-debug, opens a Maven command line window:
                 - 'pi' reinstalls the plugin into the running product instance
* atlas-help  -- prints description for all commands in the SDK

Full documentation is always available at:

https://developer.atlassian.com/display/DOCS/Introduction+to+the+Atlassian+Plugin+SDK



## Rough steps to do to setup this project:

create a base project, you should already have atlassian sdk
`atlas-create-confluence-plugin`

create the angular-project:
in projectroot/src/main:

`ng new web`

create a basic package.json in the projectroot with just the necessary things for building webpack.

create the webpack-config in web root

app.entry.ts with AJS.toInit

create entry-point in atlassian-plugin.xml




##Todos
* package.config files clean
