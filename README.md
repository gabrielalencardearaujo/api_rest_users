# API Rest para CRUD de Usuários

API desenvolvida nas aulas de NodeJS, usada para CRUD de usuários em qualquer aplicação que necessite de sistema de cadastro e login de usuários.

## ENDPOINTS

  Em todas as rotas a API retorna um json com o statuscode da requisição e um json com pelo menos 1 propriedade chamada info, onde informa o erro na requisição.

  Todo usuário é salvo no banco de dados com as informações: __name__, __email__, __password__, __role__, __id__.

### POST /login

  Usada para realizar login na API e ter acesso a rotas com autenticação.

#### Parâmetros

  Nenhum

#### Respsotas

##### StatusCode: 200
  Login realizado com sucesso, retorna um json com o token de autenticação, esse token não tem tempo para expirar:
  ```
    {
      info: 'Sign in success!', 
      token:'HDUIAHUBWDUASBD37BA7DBASDIBD27AB9D37DBVA87GD8AYGS8DGBASD738DAV237VF7AVSBDDFAFDSA8DFVG893VFA7S.DV873VAD7VA8DFVSA87DVAS8VD8ASV397GABD7G7AGD'
    }
  ```

##### StatusCode: 401

  Login incorreto, email ou senha inválidos. Retorna um json:
  ```
    {
      info: 'Email or Password invalid!'
    }
  ```

##### StatusCode: 404

  Usuário não existe no banco de dados. Retorna um json:
  ```
    {
      info: 'User not exist.'
    }
  ```

### GET /user 
  Listagem de todos os usuários. Requer autenticação de admin.
  