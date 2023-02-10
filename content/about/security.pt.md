---
title: security
displayTitle: Segurança
description: "Segurança | Node.js"
authors: reedloden, XhmikosR, Trott, fhemberger, MaledongGit, yous, sam-github, vdeturckheim, tniessen,richardlau, nschonni, mikeal, e-jigsaw, parthlaw, nazarepiedady
category: about
---

## Reportando um bug na Node.js

Reporte bugs de segurança na Node.js através da [HackerOne](https://hackerone.com/nodejs).

O teu relatório será reconhecido dentro de 5 dias, receberás uma resposta mais detalhada para o teu relatório dentro de 10 dias indicando as próximas etapas na resolução da tua submissão.

Depois da resposta inicial ao teu relatório, a equipa de segurança empenhar-se-á em manter-te informado do progresso sendo feito a uma correção e anúncio completo, e talvez peçam informações adicionais ou orientação envolvendo o problema reportado.

## Programa de recompensa de bug da Node.js

O projeto da Node.js envolve-se em um programa oficial de recompensa de bug para investigadores de segurança e revelações públicas responsáveis. O programa é administrado através da plataforma HackerOne. Consulte [https://hackerone.com/nodejs](https://hackerone.com/nodejs) para mais detalhes.

## Reportando um bug em um módulo de terceiro

Os bugs de segurança em módulos de terceiros devem ser reportados aos seus respetivos responsáveis.

## Política de Revelação

Aqui está a política de revelação de segurança para a Node.js

* O relatório de segurança é recebido e é atribuído um tratador primário. Esta pessoa coordenará o processo de correção e lançamento. O problema é confirmado e a lista de todas as versões afetadas é determinada. O código é passado for auditoria para procurar quaisquer problemas similares. Correções são preparadas para todos os lançamentos que estão sob manutenção. Estas correções não são enviadas para o repositório público mas segurados localmente aguardando o anúncio.

* Uma data de embargo sugerida para esta vulnerabilidade é escolhida e um Vulnerabilidades Comuns e Exposições (CVE®, sigla em Inglês) é registado para a vulnerabilidade.

* Sobre data de embargo, a lista de endereços de segurança da Node.js é enviada uma cópia do anúncio. As mudanças são empurradas para o repositório público e as novas construções são implementadas em produção na [nodejs.org](https://nodejs.org/). Dentro de 6 horas depois da lista de endereços ser notificada, uma cópia do consultivo será publicada no [blogue da Node.js](https://nodejs.org/en/blog/)

* Normalmente a data de embargo será definida 72 horas desde o momento que a CVE for emitida. No entanto, isto pode variar dependendo da severidade do bug ou dificuldade em aplicar uma correção.

* Este processo pode levar algum tempo, especialmente quando a coordenação é exigida por responsáveis de outros projetos. Todo esforço será feito para manusear o bug em tempo oportuno; no entanto, é importante que sigamos o processo de lançamento acima para garantir que a revelação seja resolvida de uma maneira consistente.

## Recebendo atualizações de segurança

As notificações de segurança serão distribuídas através dos seguinte métodos:

* [https://groups.google.com/group/nodejs-sec](https://groups.google.com/group/nodejs-sec)
* [https://nodejs.org/en/blog/](https://nodejs.org/en/blog/)

## Comentários sobre esta política

Se tiveres sugestões sobre como este processo poderia ser melhorado, submeta um [pedido de atualização do repositório (pull request, em Inglês)](https://github.com/nodejs/nodejs.org) ou [apresentar uma questão](https://github.com/nodejs/security-wg/issues/new) a discutir.
