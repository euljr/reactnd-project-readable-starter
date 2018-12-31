# Projeto: Leitura

Este é o segundo projeto do Nanodegree React da Udacity, foi iniciado a partir do projeto inicial já contendo o servidor com a API.

## API

A API se encontra no diretório `api-server`, será necessário instalar os pacotes do node para executar a API, para isso, em um terminal,digite os seguintes comandos:

```bash
  $ cd api-server
  $ npm install
  $ node server.js
```

## FrontEnd

O projeto encontra-se no diretório `frontend`, foi criado como o `create-react-app`, para executar o projeto em desenvolvimento, veja se a API está em execução e rode os seguintes comandos em outro terminal:

```bash
  $ cd frontend
  $ npm install
  $ npm start
```

Caso queira gerar uma versão de produção, é só executar `npm run build` que os arquivos estáticos serão gerados dentro de um novo diretório chamado `build`.

### Estrutura de pastas e componentes

#### actions e reducers

Os diretórios `actions` e `reducers` contém os códigos do redux, estão separadas entre **categorias**, **comentários** e **posts**.

#### components

 - App.js: Contém as rotas do react-router e carrega os dados iniciais da API
 - Comment.js: Componente de um comentário, com visualização, edição, upvote, downvote e exclusão
 - CommentForm.js: Componente para criar ou alterar um comentário
 - Post.js: Componente de um post, com visualização, edição, upvote, downvote e exclusão
 - PostForm.js: Componente para criar ou alterar um post
 - PostList.js: Componente para listagem de posts, lá também encontramos um formulário para adicionar um novo post e botões para ordenação
 - PostPage.js: Componente de um post, lá também encontramos um formulário para adicionar um comentário e botões para ordenação dos mesmos