---
title: security
displayTitle: "page de sécurité"
description: "C'est la page de sécurité"
authors: reedloden, XhmikosR, Trott, fhemberger, MaledongGit, yous, sam-github, vdeturckheim, tniessen,richardlau, nschonni, mikeal, e-jigsaw, parthlaw, AugustinMauroy
category: Security
---

## Signaler un bug dans Node.js

Signalez les bogues de sécurité dans Node.js via [HackerOne](https://hackerone.com/nodejs).

Votre rapport fera l'objet d'un accusé de réception dans les 24 heures, et vous recevrez une réponse plus détaillée dans les 48 heures. Réponse plus détaillée à votre rapport dans les 48 heures, indiquant les prochaines étapes de
traitement de votre demande.

Après la réponse initiale à votre rapport, l'équipe de sécurité s'efforcera de vous tenir
informé des progrès réalisés en vue d'une correction et d'une annonce complète,
et pourra vous demander des informations supplémentaires ou des conseils sur le problème signalé.
problème signalé.

### Programme de primes aux bugs pour Node.js

Le projet Node.js s'engage dans un programme officiel de prime de bogue pour les chercheurs en sécurité et les divulgations publiques responsables.
responsables. Le programme est géré par
la plateforme HackerOne. Voir [https://hackerone.com/nodejs](https://hackerone.com/nodejs) pour plus de détails.

## Signaler un bogue dans un module tiers

Les bogues de sécurité dans les modules tiers doivent être signalés à leurs mainteneurs respectifs.
et doivent être coordonnés par l'équipe de sécurité de l'écosystème Node.js
Security Team via [HackerOne](https://hackerone.com/nodejs-ecosystem).

Les détails concernant ce processus peuvent être trouvés dans le
[Dépôt du groupe de travail sur la sécurité](https://github.com/nodejs/security-wg/tree/main/processes/vuln_db.md).

Merci d'améliorer la sécurité de Node.js et de son écosystème. Vos efforts
et la divulgation responsable sont grandement appréciés et seront reconnus.

## Politique de divulgation

Voici la politique de divulgation de la sécurité pour Node.js

* Le rapport de sécurité est reçu et un gestionnaire principal lui est attribué. Cette personne coordonnera le processus de correction et de publication. Le problème est confirmé et une liste de toutes les versions affectées est déterminée. Le code est audité pour trouver tout problème similaire potentiel. Des correctifs sont préparés pour toutes les versions qui sont encore en maintenance. Ces correctifs ne sont pas engagés dans le dépôt public public mais plutôt conservés localement en attendant l'annonce.

* Une date d'embargo suggérée pour cette vulnérabilité est choisie et un CVE (Common Vulnérabilités et Expositions (CVE®)) est demandé pour cette vulnérabilité.

* À la date d'embargo, la liste de diffusion de la sécurité de Node.js reçoit une copie de l'annonce. annonce. Les changements sont poussés vers le dépôt public et les nouvelles constructions. Sont déployées sur nodejs.org. Dans les 6 heures suivant la notification de la liste de diffusion une copie de l'avis sera publiée sur le blog de Node.js.

* En général, la date d'embargo est fixée à 72 heures à compter de la date de publication du CVE. Cependant, cela peut varier en fonction de la gravité du bogue ou de la difficulté à appliquer un correctif.

* Ce processus peut prendre un certain temps, en particulier lorsqu'une coordination est nécessaire avec les mainteneurs d'autres projets. Avec les mainteneurs d'autres projets. Tous les efforts seront faits pour traiter le bogue de la manière la plus opportune possible ; cependant, il est important que nous suivions le processus de publication ci-dessus afin de garantir que la version finale du logiciel soit disponible. Le processus de publication ci-dessus pour s'assurer que la divulgation est traitée d'une manière cohérente.

## Réception des mises à jour de sécurité

Les notifications de sécurité seront distribuées par les méthodes suivantes.

* [https://groups.google.com/group/nodejs-sec](https://groups.google.com/group/nodejs-sec)
* [https://nodejs.org/en/blog/](https://nodejs.org/en/blog/)

## Commentaires sur cette politique

Si vous avez des suggestions sur la façon dont ce processus pourrait être amélioré, veuillez soumettre un formulaire de demande d'accès à l'information.
[pull request](https://github.com/nodejs/nodejs.dev) ou
[file an issue](https://github.com/nodejs/security-wg/issues/new) pour discuter.
