---
title: Installation de Node.js via le gestionnaire de paquets
description: Installing Node.js via package manager
authors: fhemberger, XhmikosR, shadowspawn, vsemozhetbyt, nschonni, wildcard, MrJithil, kasicka, cassidyjames, Trott, richardlau, Qantas94Heavy, pierreneter, 0mp, ThePrez, PoojaDurgad, MaledongGit, Megajin, marc-maurer, yodeyer, geek, sudowork, strawbrary, ryanmurakami, rbnswartz, arkwright, oliversalzburg, mweagle, Mohamed3on, Ginden, kapouer, jperkin, jericopulvera, jedsmith, jasonkarns, sonicdoe, mcollina, fornwall, danbev, naskapal, awochna, AdamMajer, ahmetanilgur, bnb, qbit, AugustinMauroy
category: télécharger
---

_**Note:**_ Les paquets sur cette page sont maintenus et supportés par leurs mainteneurs respectifs, **non** par l'équipe centrale de Node.js. Veuillez signaler tout problème que vous rencontrez au mainteneur du paquet. S'il s'avère que votre problème est un bogue dans Node.js lui-même, le mainteneur signalera le problème en amont.

## Android

La prise en charge d'Android est encore expérimentale dans Node.js, donc les binaires précompilés ne sont pas encore fournis par les développeurs de Node.js.

Cependant, il existe quelques solutions tierces. Par exemple, la communauté [Termux](https://termux.com/) fournit un émulateur de terminal et un environnement Linux pour Android, ainsi que son propre gestionnaire de paquets et une [vaste collection](https://github.com/termux/termux-packages) de nombreuses applications précompilées. Cette commande dans l'application Termux installera la dernière version disponible de Node.js :

```bash
pkg install nodejs
```

Actuellement, les binaires Termux Node.js sont liés contre `system-icu` (dépendant du paquet `libicu`).

## Arch Linux

Les paquets Node.js et npm sont disponibles dans le Community Repository.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora and Red Hat Enterprise Linux

Node.js est disponible en tant que module appelé `nodejs` dans CentOS/RHEL 8 et Fedora.

```bash
dnf module install nodejs:<stream>
```

où `<stream>` correspond à la version majeure de Node.js.
Pour voir la liste des flux disponibles :

```bash
dnf module list nodejs
```

Par exemple, pour installer Node.js 12 :

```bash
dnf module install nodejs:12
```

Pour CentOS/RHEL 7, Node.js est disponible via [Software Collections](https://www.softwarecollections.org/en/scls/?search=NodeJS).

### Alternatives

Ces ressources fournissent des paquets compatibles avec CentOS, Fedora et RHEL.
* [Node.js snaps](#snap) maintenue et soutenue à [https://github.com/nodejs/snap]()
* [Node.js binary distributions](#debian-and-ubuntu-based-linux-distributions) maintained and supported by [NodeSource](https://github.com/nodesource/distributions)

## Distributions Linux basées sur Debian et Ubuntu

[Node.js binary distributions](https://github.com/nodesource/distributions/blob/master/README.md) sont disponibles à partir de NodeSource.

### Alternatives

Les paquets compatibles avec les distributions Linux basées sur Debian et Ubuntu sont disponibles via [Node.js snaps](#snap).

## fnm

Fast and simple Node.js version manager built in Rust used to manage multiple released Node.js versions. It allows you to perform operations like install, uninstall, switch Node versions automatically based on the current directory, etc.
To install fnm, use this [install script](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm has cross-platform support (macOS, Windows, Linux) & all popular shells (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt)
it's built with speed in mind and compatibility support for `.node-version` and `.nvmrc` files.

## FreeBSD

The most recent release of Node.js is available via the [www/node](https://www.freshports.org/www/node) port.

Install a binary package via [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Or compile it on your own using [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js is available in the portage tree.

```bash
emerge nodejs
```

## IBM i

LTS versions of Node.js are available from IBM, and are available via [the 'yum' package manager](https://ibm.biz/ibmi-rpms). The package name is `nodejs` followed by the major version number (for instance, `nodejs12`, `nodejs14` etc)

To install Node.js 14.x from the command line, run the following as a user with \*ALLOBJ special authority:

```bash
yum install nodejs14
```

Node.js can also be installed with the IBM i Access Client Solutions product. See [this support document](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) for more details

## macOS

Download the [macOS Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

_If you want to download the package with bash:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternatives

Using **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Using **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Using **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

Install the binary package:

```bash
pkgin -y install nodejs
```

Or build manually from pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` is a simple to use Node.js version manager for Mac and Linux. Specify the target version to install using a rich syntax,
or select from a menu of previously downloaded versions. The versions are installed system-wide or user-wide, and for more
targeted use you can run a version directly from the cached downloads.

See the [homepage](https://github.com/tj/n) for install methods (boostrap, npm, Homebrew, third-party), and all the usage details.

If you already have `npm` then installing `n` and then the newest LTS `node` version is as simple as:

```bash
npm install -g n
n lts
```

## NetBSD

Node.js is available in the pkgsrc tree:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Or install a binary package (if available for your platform) using pkgin:

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` is a lightweight node version manager, similar to `nvm`. It's simple and predictable. A rich plugin ecosystem lets you tailor it to suit your needs. Use `nodenv` to pick a Node version for your application and guarantee that your development environment matches production.

Nodenv installation instructions are maintained [on its Github page](https://github.com/nodenv/nodenv#installation). Please visit that page to ensure you're following the latest version of the installation steps.

## nvm

Node Version Manager is a bash script used to manage multiple released Node.js versions. It allows
you to perform operations like install, uninstall, switch version, etc.
To install nvm, use this [install script](https://github.com/nvm-sh/nvm#install--update-script).

On Unix / OS X systems Node.js built from source can be installed using
[nvm](https://github.com/creationix/nvm) by installing into the location that nvm expects:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

After this you can use `nvm` to switch between released versions and versions
built from source.
For example, if the version of Node.js is v8.0.0-pre:

```bash
nvm use 8
```

Once the official release is out you will want to uninstall the version built
from source:

```bash
nvm uninstall 8
```

## nvs

#### Windows

The `nvs` version manager is cross-platform and can be used on Windows, macOS, and Unix-like systems

To install `nvs` on Windows go to the [release page](https://github.com/jasongin/nvs/releases) here and download the MSI installer file of the latest release.

You can also use `chocolatey` to install it:

```bash
choco install nvs
```

#### macOS,UnixLike

You can find the documentation regarding the installation steps of `nvs` in macOS/Unix-like systems [here](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Usage

After this you can use `nvs` to switch between different versions of node.

To add the latest version of node:

```bash
nvs add latest
```

Or to add the latest LTS version of node:

```bash
nvs add lts
```

Then run the `nvs use` command to add a version of node to your `PATH` for the current shell:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

To add it to `PATH` permanently, use `nvs link`:

```bash
nvs link lts
```

## OpenBSD

Node.js is available through the ports system.

```bash
/usr/ports/lang/node
```

Using [pkg\_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) on OpenBSD:

```bash
pkg_add node
```

## openSUSE and SLE

Node.js is available in the main repositories under the following packages:

* **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
* **openSUSE Tumbleweed**: `nodejs16`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  (The "Web and Scripting Module" must be [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
* **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14`
  (The "Web and Scripting Module" must be [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

For example, to install Node.js 14.x on openSUSE Leap 15.2, run the following as root:

```bash
zypper install nodejs14
```

Different major versions of Node can be installed and used concurrently.

## SmartOS and illumos

SmartOS images come with pkgsrc pre-installed. On other illumos distributions, first install **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, then you may install the binary package as normal:

```bash
pkgin -y install nodejs
```

Or build manually from pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap) are available as [`node`](https://snapcraft.io/node) on the Snap store.

## Solus

Solus provides Node.js in its main repository.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux ships Node.js stable in the main repository.

```bash
xbps-install -Sy nodejs
```

## Windows

Download the [Windows Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

### Alternatives

Using **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Using **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
```

## z/OS

IBM® SDK for Node.js - z/OS® is available in two installation formats,
SMP/E and PAX. Select the installation format that applies to you:

* [Installing and configuring SMP/E edition of Node.js on z/OS](https://www.ibm.com/support/knowledgecenter/SSTRRS_14.0.0/com.ibm.nodejs.zos.v14.doc/smpe.htm)
* [Installing and configuring PAX edition of Node.js on z/OS](https://www.ibm.com/support/knowledgecenter/SSTRRS_14.0.0/com.ibm.nodejs.zos.v14.doc/paxz.htm)
