---
title: Where to host a Node.js app
description: 'A Node.js application can be hosted in a lot of places, depending on your needs. This is a list of all the various options you have at your disposal'
authors: flaviocopes, MylesBorins, LaRuaNa, Rawnly, amiller-gh, ahmadawais
section: Getting Started
---

Here is a non-exhaustive list of the options you can explore when you want to deploy your app and make it publicly accessible.

I will list the options from simplest and constrained to more complex and powerful.

## Simplest option ever: local tunnel

Even if you have a dynamic IP, or you're under a NAT, you can deploy your app and serve the requests right from your computer using a local tunnel.

This option is suited for some quick testing, demo a product or sharing of an app with a very small group of people.

A very nice tool for this, available on all platforms, is [**ngrok**](https://ngrok.com/).

Using it, you can just type `ngrok PORT` and the PORT you want is exposed to the internet. You will get a ngrok.io domain, but with a paid subscription you can get a custom URL as well as more security options (remember that you are opening your machine to the public Internet).

Another service you can use is <https://github.com/localtunnel/localtunnel>

## Zero configuration deployments

### Glitch

[Glitch](https://glitch.com) is a playground and a way to build your apps faster than ever, and see them live on their own glitch.com subdomain. You cannot currently have a custom domain, and there are a few [restrictions](https://glitch.com/faq#restrictions) in place, but it's really great to prototype. It looks fun (and this is a plus), and it's not a dumbed down environment - you get all the power of Node.js, a CDN, secure storage for credentials, GitHub import/export and much more.

Provided by the company behind FogBugz and Trello (and co-creators of Stack Overflow).

I use it a lot for demo purposes.

### Codepen

[Codepen](https://codepen.io) is an amazing platform and community. You can create a project with multiple files, and deploy it with a custom domain.

## Serverless

A way to publish your apps, and have no server at all to manage, is Serverless. Serverless is a paradigm where you publish your apps as **functions**, and they respond on a network endpoint (also called FAAS - Functions As A Service).

Two very popular solutions are

* [Serverless Framework](https://serverless.com/framework/docs/)
* [Standard Library](https://stdlib.com/)

They both provide an abstraction layer to publishing on AWS Lambda and other FAAS solutions based on Azure or the Google Cloud offering.

## PAAS

PAAS stands for Platform As A Service. These platforms take away a lot of things you should otherwise worry about when deploying your application.

### ZEIT Now

ZEIT Now is an interesting option. You just type `now` in your terminal, and it takes care of deploying your application. There is a free version with limitations, and the paid version is more powerful. You simply forget that there's a server, you just deploy the app.

### Nanobox

[Nanobox](https://nanobox.io)

### Heroku

Heroku is an amazing platform.

This is a great article on [getting started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

### Microsoft Azure

Azure is the Microsoft Cloud offering.

Check out how to [create a Node.js web app in Azure](https://docs.microsoft.com/azure/app-service/app-service-web-get-started-nodejs).

### Google Cloud Platform

Google Cloud is an amazing structure for your apps.

They have a good [Node.js Documentation Section](https://cloud.google.com/node/)

## Virtual Private Server

In this section you find the usual suspects, ordered from more user friendly to less user friendly:

* [Digital Ocean](https://www.digitalocean.com)
  * [DigitalOcean Guide: How to setup a NodeJS Application](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)
* [Linode](https://www.linode.com/)
  * [NodeJS tutorials from Linode](https://www.linode.com/docs/development/nodejs/)
* [Amazon Web Services](https://aws.amazon.com)
  * [Deploy a NodeJS WebApp on AWS](https://aws.amazon.com/en/getting-started/projects/deploy-nodejs-web-app/)

Since they provide an empty Linux machine on which you can work, there is no specific tutorial for these.

There are lots more options in the VPS category, those are just some of the most popular.

## Bare metal

Another solution is to get a bare metal server, install a Linux distribution, connect it to the internet (or rent one monthly, like you can do using the [Vultr Bare Metal](https://www.vultr.com/pricing/baremetal/) service)
