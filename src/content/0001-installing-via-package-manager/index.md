---
title: Installing via Package Manager
description: 'Quick guides for installing Node.js using popular third-party package managers'
authors: fhemberger, XhmikosR, vsemozhetbyt, nschonni, kasicka, cassidyjames, Qantas94Heavy, pierreneter, 0mp, Megajin, MaledongGit, TheNuclearCat, yodeyer, geek, sudowork, strawbrary, ryanmurakami, rbnswartz, arkwright, oliversalzburg, mweagle, Mohamed3on, Ginden, kapouer, jperkin, ThePrez, jedsmith, sonicdoe, milosjevtovic, mcollina, fornwall, danbev, naskapal, awochna, ahmetanilgur, qbit
section: Content
---

<section>

# Installing Node.js via package manager

**_Note:_** The packages on this page are maintained and supported by their respective packagers, **not** the Node.js core team. Please report any issues you encounter to the package maintainer. If it turns out your issue is a bug in Node.js itself, the maintainer will report the issue upstream.

---

- [Installing Node.js via package manager](#installing-nodejs-via-package-manager)
  - [Android](#android)
  - [Arch Linux](#arch-linux)
  - [Debian and Ubuntu based Linux distributions, Enterprise Linux/Fedora and Snap packages](#debian-and-ubuntu-based-linux-distributions-enterprise-linuxfedora-and-snap-packages)
  - [FreeBSD](#freebsd)
  - [Gentoo](#gentoo)
  - [IBM i](#ibm-i)
  - [NetBSD](#netbsd)
  - [nvm](#nvm)
  - [OpenBSD](#openbsd)
  - [openSUSE and SLE](#opensuse-and-sle)
  - [macOS](#macos)
    - [Alternatives](#alternatives)
  - [SmartOS and illumos](#smartos-and-illumos)
  - [Solus](#solus)
  - [Void Linux](#void-linux)
  - [Windows](#windows)
    - [Alternatives](#alternatives-1)

---

</section><section name="Android">

## Android

Android support is still experimental in Node.js, so precompiled binaries are not yet provided by Node.js developers.

However, there are some third-party solutions. For example, [Termux](https://termux.com/) community provides terminal emulator and Linux environment for Android, as well as own package manager and [extensive collection](https://github.com/termux/termux-packages) of many precompiled applications. This command in Termux app will install the last available Node.js version:

```bash
pkg install nodejs
```

Currently, Termux Node.js binaries are linked against `system-icu` (depending on `libicu` package).

</section><section name="Arch Linux">

## Arch Linux

Node.js and npm packages are available in the Community Repository.

```bash
pacman -S nodejs npm
```

</section><section name="Debian and Ubuntu based Linux distributions, Enterprise Linux/Fedora and Snap packages">

## Debian and Ubuntu based Linux distributions, Enterprise Linux/Fedora and Snap packages

[Official Node.js binary distributions](https://github.com/nodesource/distributions/blob/master/README.md) are provided by NodeSource.

</section><section name="FreeBSD">

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

</section><section name="Gentoo">

## Gentoo

Node.js is available in the portage tree.

```bash
emerge nodejs
```

</section><section name="IBM i">

## IBM i

LTS versions of Node.js are available from IBM, and are available via [the 'yum' package manager](https://ibm.biz/ibmi-rpms). The package name is `nodejs` followed by the major version number (for instance, `nodejs8`, `nodejs10`, `nodejs12`, etc)

To install Node.js 12.x from the command line, run the following as a user with \*ALLOBJ special authority:

```bash
yum install nodejs12
```

Node.js can also be installed with the IBM i Access Client Solutions product. See [this support document](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) for more details

## NetBSD

Node.js is available in the pkgsrc tree:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Or install a binary package (if available for your platform) using pkgin:

```bash
pkgin -y install nodejs
```

</section><section name="nvm">

## nvm

Node Version Manager is a bash script used to manage multiple released Node.js versions. It allows
you to perform operations like install, uninstall, switch version, etc.
To install nvm, use this [install script](https://github.com/creationix/nvm#install-script).

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

</section><section name="OpenBSD">

## OpenBSD

Node.js is available through the ports system.

```bash
/usr/ports/lang/node
```

Using [pkg_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) on OpenBSD:

```bash
pkg_add node
```

</section><section name="openSUSE and SLE">

## openSUSE and SLE

Node.js is available in the main repositories under the following packages:

- **openSUSE Leap 42.2**: `nodejs4`
- **openSUSE Leap 42.3**: `nodejs4`, `nodejs6`
- **openSUSE Tumbleweed**: `nodejs4`, `nodejs6`, `nodejs8`
- **SUSE Linux Enterprise Server (SLES) 12**: `nodejs4`, `nodejs6`
  (The "Web and Scripting Module" must be [added before installing](https://www.suse.com/documentation/sles-12/book_sle_deployment/data/sec_add-ons_extensions.html).)

For example, to install Node.js 4.x on openSUSE Leap 42.2, run the following as root:

```bash
zypper install nodejs4
```

</section><section name="macOS">

## macOS

Simply download the [macOS Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

_If you want to download the package with bash:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

</section><section name="Alternatives">

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

</section><section name="SmartOS and illumos">

## SmartOS and illumos

SmartOS images come with pkgsrc pre-installed. On other illumos distributions, first install **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, then you may install the binary package as normal:

```bash
pkgin -y install nodejs
```

Or build manually from pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

</section><section name="Solus">

## Solus

Solus provides Node.js in its main repository.

```bash
sudo eopkg install nodejs
```

</section><section name="Void Linux">

## Void Linux

Void Linux ships Node.js stable in the main repository.

```bash
xbps-install -Sy nodejs
```

</section><section name="Windows">

## Windows

Simply download the [Windows Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs.org](https://nodejs.org/) web site.

</section><section name="Alternatives">

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

</section>
