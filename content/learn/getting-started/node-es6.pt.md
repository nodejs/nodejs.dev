---
title: ecmascript-2015-es6-and-beyond
displayTitle: 'ECMAScript 2015 (ES6) e além'
authors: ovflowd, nazarepiedady
category: learn
---

A Node.js é construída contra versões modernas do [V8](https://v8.dev/). Ao manter atualizado com os lançamentos mais recentes deste motor, garantimos novas funcionalidades da [especificação ECMA-262 da JavaScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm) são trazidas para os programadores da Node.js de uma maneira oportuna, bem como melhorias ininterruptas do desempenho e estabilidade.

Todas as funcionalidades da ECMAScript 2015 (ES6) estão divididas em três grupos para funcionalidades de **envio**, **encenadas**, e **em progresso**:

* Todas as funcionalidades de **envio**, as quais o V8 considera estáveis, estão **ligadas por padrão na Node.js** e **NÃO** requerem qualquer tipo de opção de execução.
* As funcionalidades **encenadas**, que são funcionalidades quase concluídas que não são consideradas estáveis pela equipa do V8, exigem uma opção de execução: `--harmony`.
* As funcionalidades **em progresso** podem ser ativadas individualmente pelas suas respetivas opções `harmony`, embora isto seja fortemente desencorajado se não para propósitos de testagem. Nota: estas opções são expostas pelo V8 e potencialmente mudarão sem qualquer aviso de depreciação.

### Quais funcionalidades disponibilizam com qual versão da Node.js por padrão?

A página [node.green](https://node.green/) fornece uma excelente visão de conjunto sobre as funcionalidades de ECMAScript suportas em várias versões da Node.js, baseada na tabela de compatibilidade de `kangax`.

### Quais funcionalidades estão em progresso?

Novas funcionalidades estão sendo adicionadas constantemente ao motor V8. Duma maneira geral, espere-os caírem em um futuro lançamento de Node.js, apesar do tempo ser desconhecido.

Tu podes listar todas as funcionalidades _em progresso_ disponíveis em cada lançamento da Node.js processando a saída do argumento `--v8-options` com as expressões regulares globais. Nota que estas são funcionalidades incompletas e possivelmente quebradas da V8, então usa-as por tua conta e risco:

```bash
node --v8-options | grep "in progress"
```

### Eu tenho a minha infraestrutura configurada para influenciar a opção `--harmony`. Eu deveria removê-la?

O comportamento atual da opção `--harmony` na Node.js é apenas ativar funcionalidades **encenadas**. Afinal de contas, agora é um sinónimo de `--es_staging`. Conforme mencionado acima, estas são funcionalidades concluídas que ainda não foram consideradas estáveis. Se quiseres jogar pelo seguro, especialmente em ambientes de produção, considere remover esta opção em tempo de execução até ser entregada por padrão na V8 e, consequentemente, na Node.js. Se manteres isto ativado, deves estar preparado para as próximas atualizações da Node.js que quebrarão o teu código se a V8 mudar as suas semânticas para seguir meticulosamente o padrão.

### Como eu descubro qual versão do V8 é entregado com uma versão em particular da Node.js?

A Node.js fornece uma maneira simples de listar todas as dependências e respetivas versões que são entregadas com um binário específico através do objeto global `process`. No caso do motor V8, digite o seguinte conteúdo no teu terminal para extrair a sua versão:

```bash
node -p process.versions.v8
```
