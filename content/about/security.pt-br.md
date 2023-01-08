---
title: security
displayTitle: Segurança
description: "Segurança | Node.js"
authors: reedloden, XhmikosR, Trott, fhemberger, MaledongGit, yous, sam-github, vdeturckheim, tniessen,richardlau, nschonni, mikeal, e-jigsaw, parthlaw, ItaloPussi
category: about
---

## Reportando um BUG no ecossistema Node.js

Reporte BUGs de segurança envolvendo o Node.js no [HackerOne](https://hackerone.com/nodejs).

Seu reporte será visualizado em até 5 dias e você receberá uma resposta detalhada com 
o plano de ação para correção em até 10 dias.

Depois da resposta inicial, o time de segurança do Node.js se compromete a mantê-lo
informado do progresso de correção da vulnerabilidade e divulgação pública e poderá
contatá-lo para informações adicionais ou dúvidas referentes ao problema relatado.

### Programa de Bug Bounty Node.js

O Node.js possui um programa de _Bug Bounty_ oficial para pesquisadores de segurança
e reportes públicos responsáveis. O programa é gerenciado pela plataforma HackerOne. Acesse [https://hackerone.com/nodejs](https://hackerone.com/nodejs) para mais detalhes.

## Reportando um BUG para código terceiro

BUGs de segurança envolvendo módulos ou bibliotecas terceiras devem ser endereçados diretamente 
para seus respectivos responsáveis.

## Política de Divulgação

Aqui está a política de divulgação de vulnerabilidades do Node.js

* O reporte de segurança é recebido e nomeado para um responsável primário. Essa pessoa
  irá coordenar o processo de correção e publicação. Primeiramente, a vulnerabilidade
  será confirmada e uma lista das versões afetadas será determinada. Em seguida, o 
  código-fonte será auditado em busca de vulnerabilidades similares e as correções
  serão desenvolvidas para as versões que ainda estiverem suporte. As correções
  serão salvas localmente e não serão commitadas no repositório público até divulgação da
  vulnerabilidade. 

* Uma data de publicação é escolhida e uma _CVE (Common
  Vulnerabilities and Exposures (CVE®))_ é requisitada para a vulnerabilidade.

* No dia de publicação, os colaboradores de segurança do Node.Js recebem uma cópia do 
  anúncio via e-mail, as correções são commitadas publicamente e em até 6 horas após 
  a notificação, uma cópia do reporte será publicada no Blog do Node.js 

* Geralmente, a data de publicação ocorre em até 72 horas após a criação da CVE.
  No entanto, isso pode variar de acordo com a severidade do BUG ou dificuldade de aplicação
  da correção.

* Esse processo pode levar um tempo, especialmente quando a coordenação com outros projetos é
  requerida. Nos comprometemos a corrigir o BUG tão cedo quanto possível, no entanto é importante 
  seguirmos o fluxo definido para garantir que a divulgação ocorra de uma maneira consistente.

## Recebendo atualizações de segurança

Atualizações de segurança serão distribuidas através dos seguintes métodos:

* [https://groups.google.com/group/nodejs-sec](https://groups.google.com/group/nodejs-sec)
* [https://nodejs.org/en/blog/](https://nodejs.org/en/blog/)

## Sugestões sobre essa política

Caso tenha sugestões para melhoria desse processo, por favor submeta uma [pull request](https://github.com/nodejs/nodejs.org) ou
[crie uma issue](https://github.com/nodejs/security-wg/issues/new) para discussão.
