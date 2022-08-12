---
title: Working Groups
description: "Groupes de travail| Node.js"
authors: williamkapke,Trott,fhemberger,rxmarbles,mhdawson,XhmikosR,ryanmurakami,outsideris,MaledongGit,vsemozhetbyt,wonderdogone,sotayamashita,richardlau,pierreneter,nschonni,marocchino,stevemao,lpinca,phillipj,jasnell,sejaljain123,AugustinMauroy
category: working-groups
---

Les groupes de travail principaux sont créés par le
[Comité directeur technique (CDT)](https://github.com/nodejs/TSC/blob/main/TSC-Charter.md).

## [API pour les addons](https://github.com/nodejs/nan)

Le groupe de travail Addon API est chargé de maintenir le projet NAN et le paquet
paquet _nan_ correspondant dans npm. Le projet NAN met à disposition une
couche d'abstraction pour les auteurs de modules complémentaires natifs pour Node.js,
aidant à l'écriture de code qui est compatible avec de nombreuses versions activement utilisées
de Node.js, V8 et libuv.

Les responsabilités incluent :

* Maintenir le dépôt GitHub de [NAN](https://github.com/nodejs/nan),
  y compris le code, les problèmes et la documentation.
* Maintien du dépôt GitHub [addon-examples](https://github.com/nodejs/node-addon-examples)
  Dépôt GitHub, incluant le code, les problèmes et la documentation.
* Maintenir l'API C++ Addon au sein du projet Node.js, en subordination avec le TSC Node.js.
* Maintien de la documentation Addon au sein du projet Node.js, en subordination avec le TSC Node.js.
* Maintenir le paquet _nan_ dans npm, en publiant de nouvelles versions le cas échéant.
* Messagerie sur l'avenir de l'interface Node.js et NAN pour donner à la communauté un préavis de changement.
  communauté un préavis des changements.

Les membres actuels peuvent être trouvés dans leur
[README](https://github.com/nodejs/nan#collaborators).

## [Build](https://github.com/nodejs/build)

L'objectif du groupe de travail Build est de créer et de maintenir une infrastructure d'automatisation distribuée.

Les responsabilités comprennent :

* Produire des paquets pour toutes les plateformes cibles.
* Exécution des tests.
* Exécution de tests de performance et de comparaisons.
* Création et gestion des conteneurs de construction.

## [Diagnostics](https://github.com/nodejs/diagnostics)

L'objectif du groupe de travail sur les diagnostics est de présenter un ensemble d'interfaces de diagnostic complètes, documentées et extensibles pour l'utilisation par les outils Node js et les autres applications, documentées et extensibles à utiliser par les outils Node.js et les VMs JavaScript.
JavaScript VMs.

Les responsabilités incluent :

* Collaboration avec V8 pour intégrer `v8_inspector` dans Node.js.
* Collaboration avec V8 pour intégrer `trace_event` dans Node.js.
* Collaboration avec Core pour affiner `async_wrap` et `async_hooks`.
* Maintenir et améliorer l'intégration du système de trace OS (par exemple ETW, LTTNG, dtrace).
* Documenter les capacités de diagnostic et les API de Node.js et de ses composants.
* Explorer les opportunités et les lacunes, discuter des demandes de fonctionnalités et traiter les conflits dans les diagnostics Node.js.
* Encourager un écosystème d'outils de diagnostic pour Node.js.
* Définir et ajouter des interfaces/API afin de permettre la génération de dumps lorsque cela est nécessaire.
* Définir et ajouter des structures communes aux dumps générés afin de supporter les outils qui veulent introspecter ces dumps.

## [Docker](https://github.com/nodejs/docker-node)

L'objectif du groupe de travail Docker est de construire, maintenir et améliorer les images Docker officielles pour le projet Node js.

Les responsabilités comprennent :

* Maintenir les images Docker officielles à jour en fonction des nouvelles versions de Node.js.
* Décider et mettre en œuvre des améliorations et/ou des corrections de l'image.
* Maintenir et améliorer la documentation des images.

## [Evangelism](https://github.com/nodejs/evangelism)

Le groupe de travail sur l'évangélisation promeut les accomplissements
de Node.js et fait savoir à la communauté comment elle peut s'impliquer.

Les responsabilités comprennent :

* Faciliter la messagerie du projet.
* Gérer les médias sociaux officiels du projet.
* Gérer la promotion des orateurs pour les réunions et les conférences.
* Gérer la promotion des événements de la communauté.
* Publier des résumés de mise à jour régulière et d'autres contenus promotionnels.
  promotionnel.

## [i18n](https://github.com/nodejs/i18n)

Les groupes de travail i18n ne se limitent pas aux traductions.
Ils permettent aux membres de la communauté de collaborer entre eux dans la langue de leur choix.
dans la langue de leur choix.

Chaque équipe est organisée autour d'une langue parlée commune. Chaque communauté linguistique
communauté linguistique peut alors produire plusieurs localisations pour
diverses ressources du projet.

Les responsabilités comprennent :

* Traduire tout matériel Node.js qu'ils croient pertinent pour leur communauté.
* Réviser les processus pour maintenir les traductions à jour et de haute qualité.
* Gérer et surveiller les canaux de médias sociaux dans leur langue.
* Promouvoir les intervenants Node.js pour les rencontres et les conférences dans leur langue.

Chaque communauté linguistique a ses propres membres.

* [nodejs-ar - Arabic (العَرَبِيَّة)](https://github.com/nodejs/nodejs-ar)
* [nodejs-bg - Bulgarian (български)](https://github.com/nodejs/nodejs-bg)
* [nodejs-bn - Bengali (বাংলা)](https://github.com/nodejs/nodejs-bn)
* [nodejs-zh-CN - Chinese (简体中文)](https://github.com/nodejs/nodejs-zh-CN)
* [nodejs-cs - Czech (Čeština)](https://github.com/nodejs/nodejs-cs)
* [nodejs-da - Danish (Dansk)](https://github.com/nodejs/nodejs-da)
* [nodejs-de - German (Deutsch)](https://github.com/nodejs/nodejs-de)
* [nodejs-el - Greek (Ελληνικά)](https://github.com/nodejs/nodejs-el)
* [nodejs-es - Spanish (Español)](https://github.com/nodejs/nodejs-es)
* [nodejs-fa - Persian (فارسی)](https://github.com/nodejs/nodejs-fa)
* [nodejs-fi - Finnish (Suomi)](https://github.com/nodejs/nodejs-fi)
* [nodejs-fr - French (Français)](https://github.com/nodejs/nodejs-fr)
* [nodejs-he - Hebrew (עברית)](https://github.com/nodejs/nodejs-he)
* [nodejs-hi - Hindi (हिन्दी)](https://github.com/nodejs/nodejs-hi)
* [nodejs-hu - Hungarian (Magyar)](https://github.com/nodejs/nodejs-hu)
* [nodejs-id - Indonesian (Bahasa Indonesia)](https://github.com/nodejs/nodejs-id)
* [nodejs-it - Italian (Italiano)](https://github.com/nodejs/nodejs-it)
* [nodejs-ja - Japanese (日本語)](https://github.com/nodejs/nodejs-ja)
* [nodejs-ka - Georgian (ქართული)](https://github.com/nodejs/nodejs-ka)
* [nodejs-ko - Korean (한국어)](https://github.com/nodejs/nodejs-ko)
* [nodejs-mk - Macedonian (Македонски)](https://github.com/nodejs/nodejs-mk)
* [nodejs-ms - Malay (بهاس ملايو‎)](https://github.com/nodejs/nodejs-ms)
* [nodejs-nl - Dutch (Nederlands)](https://github.com/nodejs/nodejs-nl)
* [nodejs-no - Norwegian (Norsk)](https://github.com/nodejs/nodejs-no)
* [nodejs-pl - Polish (Język Polski)](https://github.com/nodejs/nodejs-pl)
* [nodejs-pt - Portuguese (Português)](https://github.com/nodejs/nodejs-pt)
* [nodejs-ro - Romanian (Română)](https://github.com/nodejs/nodejs-ro)
* [nodejs-ru - Russian (Русский)](https://github.com/nodejs/nodejs-ru)
* [nodejs-sv - Swedish (Svenska)](https://github.com/nodejs/nodejs-sv)
* [nodejs-ta - Tamil (தமிழ்)](https://github.com/nodejs/nodejs-ta)
* [nodejs-tr - Turkish (Türkçe)](https://github.com/nodejs/nodejs-tr)
* [nodejs-zh-TW - Taiwanese (繁體中文（台灣）)](https://github.com/nodejs/nodejs-zh-TW)
* [nodejs-uk - Ukrainian (Українська)](https://github.com/nodejs/nodejs-uk)
* [nodejs-vi - Vietnamese (Tiếng Việt)](https://github.com/nodejs/nodejs-vi)

## [Package Maintenance](https://github.com/nodejs/package-maintenance)

Les responsabilités comprennent :

* La construction, la documentation et l'évangélisation de conseils, d'outils et de processus qui facilitent la maintenance des paquets et l'acceptation de l'aide de ceux qui dépendent de leurs paquets.
  maintenir les paquets et accepter l'aide de ceux qui dépendent de leurs paquets.
* Gestion des dépôts au sein de l'organisation GitHub [pkgjs](https://github.com/pkgjs)
  organisation GitHub, y compris, mais sans s'y limiter, les éléments suivants :
  * Gestion de la liste des propriétaires de l'organisation qui complètent les propriétaires de l'organisation standard de propriétaires d'organisation Node.js comme indiqué dans : <https://github.com/nodejs/admin/blob/main/GITHUB_ORG_MANAGEMENT_POLICY.md#owners>
  * Supervision des nouveaux dépôts (création, déplacement, suppression)
  * Gérer les équipes de mainteneurs pour tous les dépôts.
  * Politique de contribution pour les dépôts
* Direction technique pour les projets au sein de l'organisation [pkgjs](https://github.com/pkgjs).
* Gestion des équipes de mainteneurs et des politiques de contribution pour les dépôts suivants dépôts suivants
  `* nodejs/ci-config-travis`
  `* nodejs/ci-config-github-actions`
  `* nodejs/package-maintenance repository.`

## [Communiqué de presse](https://github.com/nodejs/Release)

Le groupe de travail sur la libération gère le processus de libération pour Node.js.

Les responsabilités incluent :

* Définir le processus de publication.
* Définir le contenu des versions.
* Générer et créer des versions.
* Tester les versions.
* Gérer le support à long terme et les branches actuelles, y compris
  le backportage des changements dans ces branches.
* Définir la politique pour ce qui est rétroporté dans les flux de versions.

## [Sécurité](https://github.com/nodejs/security-wg)

Le groupe de travail sur la sécurité gère tous les aspects et processus liés à la sécurité de Node.js.

Les responsabilités comprennent :

* Définir et maintenir les politiques et procédures de sécurité pour :
  * le projet Node.js de base
  * d'autres projets maintenus par le comité de pilotage technique (TSC) de Node.js.
* Travailler avec la plate-forme de sécurité Node pour apporter les données de vulnérabilité de la communauté dans la fondation comme un atout partagé.
  la fondation comme un actif partagé.
* S'assurer que les données de vulnérabilité sont mises à jour d'une manière efficace et opportune.
  Par exemple, en s'assurant qu'il existe des processus bien documentés pour signaler les vulnérabilités dans les modules communautaires.
  vulnérabilités dans les modules communautaires.
* Examiner et recommander des processus pour le traitement des rapports de sécurité (mais pas la
  l'administration proprement dite des rapports de sécurité, qui sont examinés par un groupe de personnes
  directement déléguées par le TSC).
* Définir et maintenir des politiques et des procédures pour la coordination des problèmes de sécurité au sein de la communauté externe de Node.j.
  sécurité au sein de l'écosystème open source externe de Node.js.
* Offrir de l'aide aux mainteneurs de paquets npm pour corriger les bogues de sécurité à fort impact.
* Maintenir et mettre à disposition des données sur les vulnérabilités de sécurité divulguées dans :
  * le noyau du projet Node.js
  * d'autres projets maintenus par le groupe technique de la Fondation Node.js
  * l'écosystème open source externe de Node.js.
* Promouvoir l'amélioration des pratiques de sécurité au sein de l'écosystème Node.js.
* Recommander des améliorations de sécurité pour le projet Node.js de base.
* Faciliter et promouvoir l'expansion d'un écosystème sain de fournisseurs de services et de produits de sécurité.
  fournisseur de produits et services de sécurité.

## [Streams](https://github.com/nodejs/readable-stream)

Le groupe de travail Streams est dédié au support et à l'amélioration de l'API
Streams telle qu'utilisée dans Node.js et l'écosystème npm. Nous cherchons à créer une
qui résout le problème de la représentation de multiples occurrences d'un événement dans le temps
d'un événement dans le temps d'une manière humaine et peu coûteuse. Les améliorations de l'API
l'API seront déterminées par les besoins de l'écosystème, l'interopérabilité et la
l'interopérabilité et la rétrocompatibilité avec d'autres solutions et versions antérieures sont d'une importance
en importance.

Les responsabilités comprennent :

* Traiter les problèmes liés aux flux sur le gestionnaire de problèmes de Node.js.
* Création et édition de la documentation sur les flux au sein du projet Node.js.
* Examiner les modifications apportées aux sous-classes de flux au sein du projet Node.js.
* Rediriger les modifications apportées aux flux du projet Node.js vers ce projet.
* Aide à l'implémentation des fournisseurs de flux dans Node.js.
* Recommander des versions de `readable-stream` à inclure dans Node.js.
* Messagerie sur l'avenir des flux pour donner à la communauté un préavis sur les changements.
