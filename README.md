# Pássaro Urbano

This project was generated with Angular CLI version 6.0.3;
Nodejs version 10.1.0;

## Pré-requisitos

Certifique-se de ter instalado em sua máquina o `node.js`.
Depois instale o Angular CLI pelo commando `npm install -g @angular/cli`.
Para verificar se o node está instalado execute o comando `node -v` ou `node --version`. 
Para verificar se o Angular CLI está instalado execute o comando `ng --version`.

## ATENÇÃO!!!

A aplicação está com uma série de dependências ignoradas pelo arquivo `.gitignore`, antes de tentar executar o comando `ng serve` para executar a aplicação, certifique-se de executar primeiramente o comando `npm install` no diretório baixado, esse procedimento irá instalar todos os pacotes essenciais contidos no arquivo `package.json`, esse procedimento demora um pouco, tenha paciência. Após baixado todos os pacotes execute o comando `json-server --watch banco-de-dados.json` e logo após compilar execute `ng serve` e abra o navegador em `http://localhost:4200/` para abrir a aplicação.