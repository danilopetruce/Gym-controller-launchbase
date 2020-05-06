# Gym-Controller

Projeto para gerenciamento de Instrutores e Membros de uma academia, onde o foco inicialmente é que as informações sejam salvas em um arquivo .json localmente.

## Tecnologias Utilizadas:

-Node JS
-Express JS
-HTML, CSS e Javascript

## Dependencias instaladas:

O seu arquivo package.json após executar o npm ou yarn no projeto deverá ficar parecido com o exemplo abaixo:

```sh

{
  "name": "controledeacademia",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "npm-run-all -p nodemon browsersync",
    "nodemon": "nodemon server.js",
    "browsersync": "browser-sync start --proxy http://localhost:5000 --files 'public,views'"
  },
  "dependencies": {
    "express": "^4.17.1",
    "method-override": "^3.0.0"
  },
  "devDependencies": {
    "browser-sync": "^2.26.7",
    "nodemon": "^2.0.2",
    "npm-run-all": "^4.1.5",
    "nunjucks": "^3.2.0"
  }
}
```

## Próximos passos:

[] Presistindo os dados com banco relacional (postgresql)

