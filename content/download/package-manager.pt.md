---
title: installing-node.js-via-package-manager
displayTitle: Instalar a Node.js através do Gestor de Pacote
description: 'Instalar a Node.js através do Gestor de Pacote | Node.js'
authors: fhemberger, XhmikosR, shadowspawn, vsemozhetbyt, nschonni, wildcard, MrJithil, kasicka, cassidyjames, Trott, richardlau, Qantas94Heavy, pierreneter, 0mp, ThePrez, PoojaDurgad, MaledongGit, Megajin, marc-maurer, yodeyer, geek, sudowork, strawbrary, ryanmurakami, rbnswartz, arkwright, oliversalzburg, mweagle, Mohamed3on, Ginden, kapouer, jperkin, jericopulvera, jedsmith, jasonkarns, sonicdoe, mcollina, fornwall, danbev, naskapal, awochna, AdamMajer, ahmetanilgur, bnb, qbit, nazarepiedady
category: download
---

**_Nota:_** Os pacotes nesta página são mantidos e suportados pelos seus respetivos empacotadores, **não** pela equipa principal da Node.js. Reporte gentilmente quaisquer problemas que encontrares ao responsável pelo pacote. Se afinal o teu problema for um bug na própria Node.js, os responsáveis reportarão o problema corrente acima.

## Alpine Linux

Os pacotes da Node.js LTS e npm estão disponíveis no Repositório Principal.

```bash
apk add nodejs npm
```

A Node.js atual pode ser instalada a partir do Repositório da Comunidade.

```bash
apk add nodejs-current
```

## Android

O suporte ao Android continua experimental na Node.js, então binários pré-compilados ainda ão foram fornecidos pelos programadores da Node.js.

No entanto, existem algumas soluções de terceiros. Por exemplo, a comunidade da [Termux](https://termux.com/) fornece o emulador de terminal e ambiente de Linux para o Android, bem como o seu próprio gestor de pacote e uma [coleção extensiva](https://github.com/termux/termux-packages) de várias aplicações pré-compiladas. Este comando na aplicação Termux instalará a mais recente versão da Node.js disponível:

```bash
pkg install nodejs
```

Atualmente, os binários de Node.js da Termux estão ligados contra o `system-icu` (dependendo do pacote `libicu`).

## Arch Linux

Os pacotes da Node.js e npm estão disponíveis no Repositório da Comunidade.

```bash
pacman -S nodejs npm
```

## CentOS, Fedora e Red Hat Enterprise Linux

A Node.js está disponível como um módulo chamado `nodejs` no CentOS/RHEL 8 e Fedora.

```bash
dnf module install nodejs:<stream>
```

onde `<stream>` corresponde a versão principal da Node.js. Para ver uma lista de versões disponíveis:

```bash
dnf module list nodejs
```

Por exemplo, para instalar a Node.js 12:

```bash
dnf module install nodejs:12
```

A Node.js para o CentOS/RHEL 7 está disponível através das [Coleções de Software](https://www.softwarecollections.org/en/scls/?search=NodeJS).

##### Alternativas

Estes recursos fornecem pacotes compatíveis com a CentOS, Fedora, e RHEL.

* [Snaps da Node.js](#snap) mantido e suportado na [https://github.com/nodejs/snap](https://github.com/nodejs/snap)
* [Distribuições do binário da Node.js](#distribuições-de-linux-baseadas-no-ubuntu-e-debian) mantidos e suportados pela [NodeSource](https://github.com/nodesource/distributions)

## Distribuições de Linux baseadas no Ubuntu e Debian

As [distribuições do binário da Node.js](https://github.com/nodesource/distributions/blob/master/README.md) estão disponíveis da partir [NodeSource](https://github.com/nodesource/distributions).

##### Alternativas

Os pacotes compatíveis com as distribuições de Linux baseadas no Debian e Ubuntu estão disponíveis através dos [snaps da Node.js](#snap).

## fnm

O gestor de versão de Node.js simples e rápido construído em Rust usado para gerir várias versões lançadas da Node.js. Ele permite-te realizar operações tais como instalar, desinstalar, alternar versões da Node.js automaticamente baseado no diretório atual, etc. Para instalar o `fnm`, use este [programa de instalação](https://github.com/Schniz/fnm#using-a-script-macoslinux).

O `fnm` tem suporte para várias plataformas (macOs, Windows, Linux) e todos shells populares (Bash, Zsh, Fish, PowerShell, Windows CLP).
O `fnm` é construído com a velocidade em mente e suporte de compatibilidade para ficheiros `.node-version` e `.nvmrc`.

## FreeBSD

O lançamento mais recente da Node.js está disponível através da porta [www/node](https://www.freshports.org/www/node).

Instale um pacote de binário através do [pkg](https://www.freebsd.org/cgi/man.cgi?pkg):

```bash
pkg install node
```

Ou compile-o conta própria usando as [portas](https://www.freebsd.org/cgi/man.cgi?ports):

```bash
cd /usr/ports/www/node && make install
```

## Gentoo

A Node.js está disponível na árvore de transporte.

```bash
emerge nodejs
```

## IBM i

As versões de suporte alargado da Node.js estão disponíveis a partir da IBM, e estão disponíveis através do [gestor de pacote `yum`](https://ibm.biz/ibmi-rpms). O nome do pacote é `nodejs` seguido pelo número da versão principal (por exemplo, `nodejs12`, `nodejs14` etc).

Para instalar a Node.js 14.x a partir da linha de comando, execute o seguinte como um utilizador com autoridade especial \*ALLOBJ:

```bash
yum install nodejs14
```

A Node.js também pode ser instalada com o produto Soluções de Cliente de Acesso IBM i. Consulte [este documento do suporte](http://www-01.ibm.com/support/docview.wss?uid=nas8N1022619) para mais detalhes.

## macOS

Descarregue o [Instalador do macOS](https://nodejs.org/en/#home-downloadhead) diretamente a partir da página [nodejs.org](https://nodejs.org/).

_Se quiseres descarregar o pacote com a bash:_

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

##### Alternativas

Usando o **[Homebrew](https://brew.sh/)**:

```bash
brew install node
```

Usando o **[MacPorts](https://www.macports.org/)**:

```bash
port install nodejs<major version>

# Exemplo
port install nodejs7
```

Usando o **[pkgsrc](https://pkgsrc.joyent.com/install-on-osx/)**:

Instale o pacote de binário:

```bash
pkgin -y install nodejs
```

Ou construa manualmente a partir do `pkgsrc`:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## n

O `n` é um gestor de versão de Node.js para Mac e Linux simples de usar. Especifique a versão destinada a instalar usando uma sintaxe rica, ou selecione a partir de um menu de versões descarregadas anteriormente. As versões são instalação a nível do sistema ou utilizador, e para uso mais específico podes executar uma versão diretamente a partir dos descarregamentos armazenados para consulta imediata (mais conhecido como "cache").

Consulte a [página principal](https://github.com/tj/n) para conheceres os métodos de instalação (npm, Homebrew, terceiros, etc), e todos os detalhes de uso.

Se já tiveres o `npm` então instalar o `n` e depois a versão mais de suporte alargado da `node` é tão simples quanto:

```bash
npm install -g n
n lts
```

## NetBSD

A Node.js está disponível na árvore da `pkgsrc`:

```bash
cd /usr/pkgsrc/lang/nodejs && make install
```

Ou instale um pacote de binário (se estiver disponível para a tua plataforma) usando  a `pkgin`:

```bash
pkgin -y install nodejs
```

## Nodenv

O `nodenv` é gestor de versão de node leve, parecido com o `nvm`. É simples e previsível. Um ecossistema de extensão rico que permite-te adaptá-lo para adequar-se as tuas necessidades. Use a `nodenv` para escolher uma versão de Node.js para a tua aplicação e garantir que o teu ambiente de desenvolvimento corresponde ao de produção.

As instruções de instalação do `nodenv` são mantidas [nesta página da GitHub](https://github.com/nodenv/nodenv#installation). Visite esta página para assegurar que estás a seguir a versão mais recente das etapas de instalação.

## nvm

O `nvm` ou (Node Version Manager, em Inglês) ou Gestor de Versão de Node é um programa de bash usado para gerir várias versões lançadas da Node.js. Ele permite-te realizar operações tais como instalar, desinstalar, alternar a versão, etc. Para instalar o `nvm`, use este [programa de instalação](https://github.com/nvm-sh/nvm#install--update-script).

Nos sistemas Unix / OS X a Node.js construída a partir do código-fonte pode ser instalada usando o [nvm](https://github.com/creationix/nvm) instalando para a localização que o `nvm` espera:

```bash
env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
```

Depois disto podes usar o `nvm` para alternar entre as versões lançadas e versões construídas a partir do código-fonte. Por exemplo, se a versão da Node.js for v8.0.0-pre:

```bash
nvm use 8
```

Assim que o lançamento oficial estiver publicado desejarás desinstalar a versão construída a partir do código-fonte:

```bash
nvm uninstall 8
```

## nvs

#### Windows

O gestor de versão `nvs` está em várias plataformas e pode ser usado no Windows, macOs e sistemas parecidos com o Unix.

Para instalar o `nvs` no Windows vá até a [página de lançamento](https://github.com/jasongin/nvs/releases) e descarregue o ficheiro instalador `.msi` do lançamento mais recente.

Tu também podes usar o `chocolatey` para instalá-lo:

```bash
choco install nvs
```

#### macOS,UnixLike

Tu podes encontrar a documentação relativamente as etapas de instalação do `nvs` nos sistemas macOS e parecidos com Unix [nesta ligação](https://github.com/jasongin/nvs/blob/master/doc/SETUP.md#mac-linux).

#### Uso

Depois disto podes usar o `nvs` para alternar entre diferentes versões da node.

Para adicionar a versão mais recente da node:

```bash
nvs add latest
```

Ou adicionar a versão mais recente de suporte alargado da node:

```bash
nvs add lts
```

Depois execute o comando `nvs use` para adicionar uma versão da node no teu `PATH` para o shell atual:

```bash
$ nvs use lts
PATH -= %LOCALAPPDATA%\nvs\default
PATH += %LOCALAPPDATA%\nvs\node\14.17.0\x64
```

Para adicioná-lo permanentemente no `PATH`, use `nvs link`:

```bash
nvs link lts
```

## OpenBSD

A Node.js está disponível através do sistema de portas.

```bash
/usr/ports/lang/node
```

Usando o [`pkg_add`](https://man.openbsd.org/OpenBSD-current/man1/pkg_add.1) no OpenBSD:

```bash
pkg_add node
```

## openSUSE e SLE

A Node.js está disponível nos repositórios principais sob os seguintes pacotes:

* **openSUSE Leap 15.2**: `nodejs10`, `nodejs12`, `nodejs14`
* **openSUSE Tumbleweed**: `nodejs16`
* **SUSE Linux Enterprise Server (SLES) 12**: `nodejs10`, `nodejs12`, and `nodejs14`
  (O "Web and Scripting Module" deve estar [ativado](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/12-SP5/#intro-modulesExtensionsRelated).)
* **SUSE Linux Enterprise Server (SLES) 15 SP2**: `nodejs10`, `nodejs12`, and `nodejs14`
  (O "Web and Scripting Module" deve estar [ativado](https://www.suse.com/releasenotes/x86_64/SUSE-SLES/15/#Intro.Module).)

Por exemplo, para instalar a Node.js 14.x no openSUSE Leap 15.2, execute o seguinte como administrador (mas conhecido como `root`):

```bash
zypper install nodejs14
```

Diferentes versões principais da Node podem ser instalada e usada simultaneamente.

## SmartOS e illumos

As imagens de SmartOS vêm com o `pkgsrc` pré-instalado. Em outras distribuições de illumos, instale primeiro o **[`pkgsrc`](https://pkgsrc.joyent.com/install-on-illumos/)**, depois podes instalar pacote de binário como de costume:

```bash
pkgin -y install nodejs
```

Ou construir manualmente a partir do `pkgsrc`:

```bash
cd pkgsrc/lang/nodejs && bmake install
```

## Snap

Os [snaps da Node.js](https://github.com/nodejs/snap) estão disponíveis como [`node`](https://snapcraft.io/node) na loja Snap.

## Solus

O Solus fornece a Node.js no seu repositório principal.

```bash
sudo eopkg install nodejs
```

## Void Linux

O Void Linux disponibiliza a Node.js estável no repositório.

```bash
xbps-install -Sy nodejs
```

## Windows

Descarregue o [Instalador de Windows](https://nodejs.org/en/#home-downloadhead) diretamente a partir da página [nodejs.org](https://nodejs.org/).

##### Alternativas

Usando o **[Winget](https://aka.ms/winget-cli)**:

```bash
winget install OpenJS.NodeJS
# ou para versões de suporte alargado
winget install OpenJS.NodeJS.LTS
```

Depois de executar um destes dois comandos acima, talvez seja necessário reiniciar o emulador de terminal antes do comando de interface da linha de comando `node` tornar-se disponível.

Usando o **[Chocolatey](https://chocolatey.org/)**:

```bash
cinst nodejs
# ou para instalação completa com npm
cinst nodejs.install
```

Usando o **[Scoop](https://scoop.sh/)**:

```bash
scoop install nodejs
# ou para versões de suporte alargado
scoop install nodejs-lts
```

## z/OS

A SDK da IBM® para Node.js - z/OS® está disponível em dois formatos de instalação, SMP/E e PAX. Selecione o formato de instalação que aplica-se a ti:

* [Instalação e Configuração da edição de SMP/E da Node.js na z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-smpe-edition)
* [Instalação e Configuração da edição de PAX da Node.js na z/OS](https://www.ibm.com/docs/en/sdk-nodejs-zos/14.0?topic=configuring-installing-pax-edition)
