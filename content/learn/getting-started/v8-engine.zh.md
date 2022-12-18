---
title: the-v8-javascript-engine
displayTitle: 'V8 JavaScript 引擎'
description: "V8 是为 Google Chrome 提供支持的 JavaScript 引擎的名称。它是获取我们的 JavaScript 并在使用 Chrome 浏览时执行它的东西。V8 提供了 JavaScript 执行的运行时环境。DOM 和其他 Web 平台 API 由浏览器提供。"
authors: xgqfrms, flaviocopes, smfoote, co16353sidak, MylesBorins, LaRuaNa, andys8, ahmadawais, karlhorky, aymen94
category: learn
---

V8 是为 Google Chrome 提供支持的 JavaScript 引擎的名称。它是获取我们的 JavaScript 并在使用 Chrome 浏览时执行它的东西。

V8 是 JavaScript 引擎，即它解析和执行 JavaScript 代码。DOM 和其他 Web 平台 API（它们都构成运行时环境）由浏览器提供。

很酷的是 JavaScript 引擎独立于托管它的浏览器。这个关键特性促成了 Node.js 的兴起。早在 2009 年，V8 就被选为支持 Node.js 的引擎，随着 Node.js 的爆炸式增长，V8 成为现在支持大量用 JavaScript 编写的服务器端代码的引擎。

Node.js 生态系统非常庞大，这要归功于 V8，它还支持桌面应用程序，包括 Electron 等项目。

## 其他 JS 引擎

其他浏览器有自己的 JavaScript 引擎:

* Firefox 有 [**SpiderMonkey**](https://spidermonkey.dev)
* Safari 有 [**JavaScriptCore**](https://developer.apple.com/documentation/javascriptcore) (也被称为 Nitro)
* Edge 最初是基于 [**Chakra**](https://github.com/Microsoft/ChakraCore) 但最近使用 [Chromium](https://support.microsoft.com/en-us/help/4501095/download-the-new-microsoft-edge-based-on-chromium) 和 V8 引擎进行了重构.

还有许多其他的存在。

所有这些引擎都实现了 [ECMA ES-262 标准](https://www.ecma-international.org/publications/standards/Ecma-262.htm)，也称为 ECMAScript，JavaScript 使用的标准。

## 对性能的追求

V8 是用 C++ 编写的，并且在不断改进。它是便携式的，可以在 Mac、Windows、Linux 和其他几个系统上运行。

在这篇 V8 介绍中，我们将忽略 V8 的实现细节：它们可以在更权威的站点 ([例如 V8 官方站点](https://v8.dev/)) 上找到，并且它们会随着时间的推移而变化，通常是根本性的。

V8 一直在发展，就像周围的其他 JavaScript 引擎一样，以加速 Web 和 Node.js 生态系统。

在 Web 上，性能竞赛已经持续多年，我们（作为用户和开发人员）从这场竞赛中受益匪浅，因为我们年复一年地获得更快、更优化的机器。

## 汇编

JavaScript 通常被认为是一种解释型语言，但现代 JavaScript 引擎不再只是解释 JavaScript，而是编译它。

这种情况从 2009 年就开始了，当时 Firefox 3.5 中添加了 SpiderMonkey JavaScript 编译器，每个人都遵循了这个想法。

JavaScript 由 V8 内部编译，采用即时 (JIT) 编译来加快执行速度。

这似乎违反直觉，但自从 2004 年推出 Google 地图以来，JavaScript 已经从一种通常执行几十行代码的语言发展成为在浏览器中运行数千到数十万行代码的完整应用程序。

我们的应用程序现在可以在浏览器中运行数小时，而不仅仅是一些表单验证规则或简单的脚本。

在这个新世界中，编译 JavaScript 非常有意义，因为虽然准备好 JavaScript 可能需要多一点时间，但一旦完成，它的性能将比纯解释代码高得多。
