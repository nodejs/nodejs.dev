---
title: installing-node.js-via-package-manager
displayTitle: Installer Node.js via le gestionnaire de paquets
description: Installer Node.js via le gestionnaire de paquets
authors: fhemberger, XhmikosR, shadowspawn, vsemozhetbyt, nschonni, wildcard, MrJithil, kasicka, cassidyjames, Trott, richardlau, Qantas94Heavy, pierreneter, 0mp, ThePrez, PoojaDurgad, MaledongGit, Megajin, marc-maurer, yodeyer, geek, sudowork, strawbrary, ryanmurakami, rbnswartz, arkwright, oliversalzburg, mweagle, Mohamed3on, Ginden, kapouer, jperkin, jericopulvera, jedsmith, jasonkarns, sonicdoe, mcollina, fornwall, danbev, naskapal, awochna, AdamMajer, ahmetanilgur, bnb, qbit, AugustinMauroy
category: download
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

Gestionnaire de version Node.js rapide et simple construit en Rust utilisé pour gérer plusieurs versions de Node.js. Il vous permet d'effectuer des opérations comme l'installation, la désinstallation, le changement de version de Node automatiquement en fonction du répertoire actuel, etc.
Pour installer fnm, utilisez ceci [install script](https://github.com/Schniz/fnm#using-a-script-macoslinux).

fnm est compatible avec toutes les plates-formes (macOS, Windows, Linux) et tous les shells populaires (Bash, Zsh, Fish, PowerShell, Windows Command Line Prompt).
il est construit avec la vitesse en tête et le support de compatibilité pour les fichiers `.node-version` et `.nvmrc`.

## FreeBSD

La version la plus récente de Node.js est disponible par l'intermédiaire de la page [www/node](https://www.freshports.org/www/node) port.

Installer un paquet binaire via [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Ou compilez-le vous-même en utilisant [ports](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

Node.js est disponible dans l'arbre de portage.

```bash
emerge nodejs
```

## IBM i

Des versions LTS de Node.js sont disponibles auprès d'IBM, et sont disponibles via [the 'yum' package manager](https://ibm.biz/ibmi-rpms). Le nom du paquet est `nodejs` suivi du numéro de la version majeure. (for instance, `nodejs12`, `nodejs14` etc)

Pour installer Node.js 14.x à partir de la ligne de commande, exécutez la commande suivante en tant qu'utilisateur disposant de l'autorisation spéciale \*ALLOBJ :

```bash
yum install nodejs14
```

Node.js peut également être installé avec le produit IBM i Access Client Solutions. Allez voir [this support document](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) pour plus de détail.

## macOS

Télécharger le [Installer macOS](https://nodejs.org/en/#home-downloadhead) directement sur le site[nodejs.org](https://nodejs.org/).

_Si vous voulez télécharger le paquet avec bash:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

### Alternatives

Utilisation de **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Utilisation de **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Example
port install nodejs7
```

Utilisation de **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

Installez le paquetage binaire :

```bash
pkgin -y install nodejs
```

Ou construire manuellement à partir de pkgsrc :

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

`n` est un gestionnaire de version de Node.js simple à utiliser pour Mac et Linux. Spécifiez la version cible à installer en utilisant une syntaxe riche,
ou choisissez dans un menu de versions précédemment téléchargées. Les versions sont installées à l'échelle du système ou de l'utilisateur.
pour une utilisation plus ciblée, vous pouvez exécuter une version directement à partir des téléchargements mis en cache.

Voir la [homepage](https://github.com/tj/n) pour les méthodes d'installation (boostrap, npm, Homebrew, third-party), et tous les détails d'utilisation.

Si vous avez déjà `npm`, l'installation de `n` puis de la dernière version LTS de `node` est aussi simple que cela :

```bash
npm install -g n
n lts
```

## NetBSD

Node.js est disponible dans l'arbre pkgsrc :

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Ou installez un paquetage binaire (si disponible pour votre plateforme) en utilisant pkgin :

```bash
pkgin -y install nodejs
```

## Nodenv

`nodenv` est un gestionnaire de version de node léger, similaire à `nvm`. Il est simple et prévisible. Un riche écosystème de plugins vous permet de l'adapter à vos besoins. Utilisez `nodenv` pour choisir une version de Node pour votre application et garantir que votre environnement de développement correspond à la production.

Les instructions d'installation de Nodenv sont maintenues [sur its Github page](https://github.com/nodenv/nodenv#installation). Veuillez consulter cette page pour vous assurer que vous suivez la dernière version des étapes d'installation.

## nvm

Node Version Manager est un script bash utilisé pour gérer plusieurs versions de Node.js. Il permet
d'effectuer des opérations comme l'installation, la désinstallation, le changement de version, etc.
Pour installer nvm, utilisez ceci [install script](https://github.com/nvm-sh/nvm#install--update-script).

Sur les systèmes Unix / OS X, Node.js construit à partir de la source peut être installé en utilisant
[nvm](https://github.com/creationix/nvm) en installant dans l'emplacement que nvm attend :

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Après cela, vous pouvez utiliser `nvm` pour basculer entre les versions publiées et les versions
construites à partir des sources.
Par exemple, si la version de Node.js est v8.0.0-pre :

```bash
nvm use 8
```

Une fois que la version officielle sera sortie, vous voudrez désinstaller la version construite
de la source :

```bash
nvm uninstall 8
```

## nvs

#### Windows

Le gestionnaire de version `nvs` est multiplateforme et peut être utilisé sur Windows, macOS, et les systèmes Unix-like.

Pour installer `nvs` sous Windows, allez à la section[release page](https://github.com/jasongin/nvs/releases) ici et téléchargez le fichier d'installation MSI de la dernière version.

Vous pouvez aussi utiliser `chocolatey` pour l'installer :

```bash
choco install nvs
```

#### macOS,UnixLike

Vous pouvez trouver la documentation concernant les étapes d'installation de `nvs` dans les systèmes macOS/Unix-like. [here](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux)

#### Usage

Après cela, vous pouvez utiliser `nvs` pour basculer entre les différentes versions de node.

Pour ajouter la dernière version de Node:

```bash
nvs add latest
```

Or to add the latest LTS version of node:

```bash
nvs add lts
```

Ensuite, lancez la commande `nvs use` pour ajouter une version de node à votre `PATH` pour le shell actuel :

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Pour l'ajouter au `PATH` de façon permanente, utilisez `nvs link` :

```bash
nvs link lts
```

## OpenBSD

Node.js est disponible par le biais du système des ports.

```bash
/usr/ports/lang/node
```

Utilisation de [pkg\_add](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) on OpenBSD:

```bash
pkg_add node
```

## openSUSE and SLE

Node.js est disponible dans les dépôts principaux sous les paquets suivants :

* **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
* **openSUSE Tumbleweed**: `nodejs16`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  (Le "Module Web et Scripting" doit être [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
* **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14`
  (Le "Module Web et Scripting" doit être [enabled](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Par exemple, pour installer Node.js 14.x sur openSUSE Leap 15.2, exécutez ce qui suit en tant que root :

```bash
zypper install nodejs14
```

Différentes versions majeures de Node peuvent être installées et utilisées simultanément.

## SmartOS and illumos

Les images SmartOS sont livrées avec pkgsrc pré-installé. Sur les autres distributions illumos, installez d'abord **[pkgsrc](https://pkgsrc.joyent.com/install-on-illumos/)**, puis vous pouvez installer le paquetage binaire normalement :

```bash
pkgin -y install nodejs
```

Or build manually from pkgsrc:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

[Node.js snaps](https://github.com/nodejs/snap) sont disponibles sur le magasin Snap [`node`](https://snapcraft.io/node).

## Solus

Solus fournit Node.js dans son dépôt principal.

```bash
sudo eopkg install nodejs
```

## Void Linux

Void Linux fournit Node.js stable dans le dépôt principal.

```bash
xbps-install -Sy nodejs
```

## Windows

Télécharger le [Installateur Windows](https://nodejs.org/en/#home-downloadhead) directement à partir du sit web [nodejs.org](https://nodejs.org/).

### Alternatives

Utilisation de **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# or for full install with npm
cinst nodejs.install
```

Utilisation de **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
```

## z/OS

IBM® SDK for Node.js - z/OS® est disponible en deux formats d'installation,
SMP/E et PAX. Sélectionnez le format d'installation qui vous convient :

* [Installation et configuration de l'édition SMP/E de Node.js sur z/OS](https://www.ibm.com/support/knowledgecenter/SSTRRS_14.0.0/com.ibm.nodejs.zos.v14.doc/smpe.htm)
* [Installation et configuration de l'édition PAX de Node.js sur z/OS](https://www.ibm.com/support/knowledgecenter/SSTRRS_14.0.0/com.ibm.nodejs.zos.v14.doc/paxz.htm)
