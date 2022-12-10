---
title: history
displayTitle: 'The history of Node.js'
description: 'A look back on the history of Node.js from 2009 to today'
authors: AugustinMauroy
category: about
---

import { getAgeInYears, isBirthdayToday } from '../../src/util/nodeHistory';

<h2>
  {isBirthdayToday('19 May, 2009') ? (
    "Happy birthday Node.js!"+
    "\nToday is " + getAgeInYears('19 May, 2009') + " years since Node.js was born."
  ) : null}
</h2>
<h2>
  {isBirthdayToday('04 December, 1995') ? (
    "Happy birthday JavaScript!"+
    "\nToday is " + getAgeInYears('04 December, 1995') + " years since JavaScript was born."
  ) : null}
</h2>

<br/>

<p>
  Believe it or not, Node.js is only {getAgeInYears('19 May, 2009')} years old.
</p>

<p>
  In comparison, JavaScript is {getAgeInYears('04 December, 1995')} years old
  and the Web is {getAgeInYears('01 January, 1989')} years old .
</p>

<p>
  {getAgeInYears('19 May, 2009')} years isn't a very long time in tech, but
  Node.js seems to have been around forever.
</p>

In this post, we draw the big picture of Node.js in its history, to put things in perspective.

## A little bit of history

JavaScript is a programming language that was created at Netscape as a scripting tool to manipulate web pages inside their browser, [Netscape Navigator](https://en.wikipedia.org/wiki/Netscape_Navigator).

Part of the business model of Netscape was to sell Web Servers, which included an environment called _Netscape LiveWire_ that could create dynamic pages using server-side JavaScript. Unfortunately, _Netscape LiveWire_ wasn't very successful and server-side JavaScript wasn't popularized until recently, by the introduction of Node.js.

One key factor that led to the rise of Node.js was the timing. Just a few years earlier, JavaScript had started to be considered as a more serious language, thanks to "Web 2.0" applications (such as Flickr, Gmail, etc.) that showed the world what a modern experience on the web could be like.

JavaScript engines also became considerably better as many browsers competed to offer users the best performance. Development teams behind major browsers worked hard to offer better support for JavaScript and find ways to make JavaScript run faster. The engine that Node.js uses under the hood, V8 (also known as Chrome V8 for being the open-source JavaScript engine of The Chromium Project), improved significantly due to this competition.

Node.js happened to be built in the right place and right time, but luck isn't the only reason why it is popular today. It introduces a lot of innovative thinking and approaches for JavaScript server-side development that have already helped many developers.

## 2009

- Node.js is born by _Ryan Dahl_ on May 19th.
- The first presentation on Node.js from _Ryan Dahl_ at JSConf.
- The first form of [npm](https://www.npmjs.com/) is created by _Isaac Z. Schlueter_ on May 21st.

## 2010

- [Express](https://expressjs.com/) is born. _"Fast, unopinionated, minimalist web framework for Node.js"_ from their official website.
- [Socket.io](https://socket.io) is born.

## 2011

- npm hits version 1.0
- Larger companies start adopting Node.js: LinkedIn, Uber, etc.
- [hapi](https://hapi.dev) is born.

## 2012

- Adoption continues very rapidly
- Node.js 0.10 named "Stable"

## 2013

- First big blogging platform using Node.js: [Ghost](https://ghost.org/).
- [Koa](https://koajs.com/) is born. _"Next generation web framework for Node.js"_ from their official website.

## 2014

- The Big Fork: [io.js](https://iojs.org/) is a major fork of Node.js, with the goal of introducing ES6 support and moving faster than Node.js (which was still on version 0.12).
- [Meteor](https://www.meteor.com/) is born on 28 octobre 2014. Meteor is a full-stack JavaScript framework.

## 2015

- Joyent Moves to Establish [Node.js Foundation](https://foundation.nodejs.org/) is born is a non-profit organization to support Node.js.
- IO.js is merged back into Node.js (the name "io.js" is dropped).
- npm introduces private modules.
- Node.js 4 (versions 1, 2 and 3 never previously released) named "Argon".
- Node.js 5
- Collaborator summit in San Francisco (USA) is first Node.js Foundation event. The event is now called [Node.js Interactive](https://events.linuxfoundation.org/events/node-interactive-2019/). There were 2 session.

## 2016

- The leftpad incident happened. For more information see this [blog post](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm).
- [Yarn](https://yarnpkg.com/en/) is born. Yarn is a new package manager for Node.js.
- Node.js 6 named "Boron".
- Google Cloud Platform joins the Node.js Foundation.

## 2017

- npm focuses more on security and introduces [npm audit](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities).
- Node.js 8 named "Carbon".
- HTTP/2 is introduced in Node.js 8.4.0 .
- V8 introduces Node.js in its testing suite, officially making Node.js a target for the JS engine, in addition to Chrome.
- 3 billion npm downloads every week.
- Creation of ayo.js is a big fork of Node.js, with the goal of introducing ES modules support and moving faster than Node.js (which was still on version 6).
- Node.js certified developer program is launched by the Node.js Foundation. The program is now managed by the [OpenJS Foundation](https://openjsf.org/).
- Node.js Collaborator Summit, 2017-10-06 - 2017-10-07, Vancouver, BC, Canada.

## 2018

- Node.js 10 named "Dubnium".
- [ES modules](https://nodejs.org/api/esm.html) .mjs experimental support is added to Node.js.
- Node.js 11
- Node.js Collaborator Summit, 2018-05-31 - 2018-06-01, Berlin, Germany.
- Collaborator Summit Vancouver 2018 - October 12th and 13th 2018.

## 2019

- Node.js interactive conference in Montréal (Canada).
- Node.js 12 named "Erbium".
- Node.js 13
- Collaborator Summit Berlin 2019 - May 30th and 31th. [Here](https://github.com/openjs-foundation/summit/blob/main/2019-05-Berlin/retro.md) the retrospective of this collaborator submit.
- Collaborator Summit Montreal 2019 - December 13th and 14th.

## 2020

- Node.js 14 named "Fermium". (Maintenance) Released 2020-04-21.
- Node.js 15

## 2021

- Node.js 16 named "Gallium". (Maintenance) Released 2021-04-20.
- Node.js 17 2022-06-01 beginning of the end of life.

## 2022

- Node.js 18 named "Hydrogen". (LTS) Released 2022-04-19.
- Node.js 19 (Current) Released 2022-10-18.
- OpenJS Collaborator Summit on 2022-10-01 at Dublin.

## 2023

- Node.js 20 will be released on 2023-04-18. No code name has been assigned as of today.
