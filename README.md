# API Rest para CRUD de Usuários

API desenvolvida nas aulas de NodeJS, usada para CRUD de usuários em qualquer aplicação que necessite de sistema de cadastro e login de usuários.

## ENDPOINTS

  Em todas as rotas a API retorna um json com o statuscode da requisição e um json com pelo menos 1 propriedade chamada info, onde informa o erro na requisição.

  Todo usuário é salvo no banco de dados com as informações: __name__, __email__, __password__, __role__, __id__.

### Campus Role:
  Pode conter 2 valores:
    - 0: Usuário comum, não tem acesso as a put, delete e listagem de usuários.
    - 1: Admin, tem acesso a todas as rotas.



### POST /login

  Usada para realizar login na API e ter acesso a rotas com autenticação.

#### Parâmetros

  Nenhum

#### Respostas

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
  Listagem de todos os usuários. Requer autenticação de admin (role: 1);

#### Parâmetros

  Nenhum

#### Respostas

##### StatusCode: 200;
  Autenticado e retorna um json com a lista de todos os usuários.
  ```
  {
    "info": "Access authorized",
    "listUsers": [
      {
        "id": 1,
        "email": "gabriel@gmail.com",
        "name": "Galencar",
        "role": 0
      },
      {
        "id": 2,
        "email": "alencar@gmail.com",
        "name": "Alencar Gabriel",
        "role": 0
      },
      {
        "id": 4,
        "email": "antonio@hotmail.com",
        "name": "Antonio Machado",
        "role": 0
      },
      {
        "id": 12,
        "email": "victor.lima@hotmail.com",
        "name": "Victor Lima",
        "role": 0
      },
      {
        "id": 13,
        "email": "fulano.silva@gmail.com",
        "name": "Fulano da Silva",
        "role": 0
      },
      {
        "id": 14,
        "email": "cricrano.souza@gmail.com",
        "name": "Cicrano Souza",
        "role": 1
      },
      ... 333 more
    ]
  }
```
##### StatusCode: 403;

  Usuário não autorizado. Retorna um json:
  ```
    {
      info: 'User not Authorized'
    }
  ```

##### StatusCode: 400;

  Ocorre quando não é enviado um token de autorização. Retorna um json:
  ```
    {
      info: 'Send the token for authorization'
    }
  ```

##### StatusCode: 401;

  Token inválido, não aceito. Retorna um json:
  ```
  {
    info: 'Invalid Token!'
  }
  ```


### GET /user/:id

  Retorna apenas o usuário com o id informado.

#### Parâmetros

  Necessita do id do usuário seja informado nos paramêtros da URL.

#### Respostas

##### StatusCode: 200;
  Retorna um json com os dados do usuário. 
  ```
    {
      info: 'User found',
      user: result
    }
  ```

##### StatusCode: 404;

  Usuário não encontrado. Retorna um json:
  ```
    { 
      info: 'User not found!'
    }
  ```


### POST /user 

  Criação de usuários. Exige envio de um corpo com as informações do usuário, qualquer usuário tem acesso.

#### Parâmetros

  Um json com as informações do usuário, seguindo o modelo:
  ```
    {
      name: string;
      email: string;
      password: string;
      role: number;
    }
  ```
#### Respostas

##### StatusCode: 200;

  Retorna um json informando que usuário foi criado.
  ```
    {
      info: 'All Right! User created.'
    }
  ```

##### StatusCode: 400;
  Algum dos campos não foi preenchido ou o email não é um email válido. Retorna um json
  ```
    { 
      info: 'Fields can't be empty or email invalid.' 
    }
  ```

##### StatusCode: 401;
  Email já existe. Esta API não permite cadastro de dois emails iguais. Retorna um json:
  ```
    { 
      info: 'Email exists' 
    }
  ```

### PUT /user/:id

  Atualização de dados do usuário, requer autorização de admin. 

#### Parâmetros

  Um json com os dados do usuários, alterados ou não.
  ```
    {
      name: string;
      email: string;
      password: string;
      role: number;
    }
  ```

#### Respostas

##### StatusCode: 200;

  Atualização realizada com sucesso. Retorna um json:
  ```
    { 
      info: 'Update user with success' 
    }
  ```

##### StatusCode: 404;

  Usuário não encontrado. Retorno:
  ```
    {
      info: 'User not found.'
    }
  ```

##### StatusCode: 404;

  Usuário não encontrado. Retorno:
  ```
    {
      info: 'User not found.'
    }
  ```

##### StatusCode: 401;  

  Email informado já existe. Retorno:
  ```
    { 
      info: 'Email exists!' 
    }
  ```

##### StatusCode: 400;

  Nome ou senha ou email não informados. Retorno:
  ```
    { 
      info: 'Insert a name or password or email or role correctly.' 
    }
  ```

##### StatusCode: 500;

  Problemas com servidor, tente mais tarde. Retorno:
  ```
    { 
      info: 'Server with problems.' 
    }
  ```

##### StatusCode: 403;

  Usuário não autorizado. Retorna um json:
  ```
    {
      info: 'User not Authorized'
    }
  ```

##### StatusCode: 400;

  Ocorre quando não é enviado um token de autorização. Retorna um json:
  ```
    {
      info: 'Send the token for authorization'
    }
  ```

##### StatusCode: 401;

  Token inválido, não aceito. Retorna um json:
  ```
  {
    info: 'Invalid Token!'
  }
  ```


### DELETE /user/:id

  Atualização de dados do usuário, requer autorização de admin. 

#### Parâmetros

  Deve informar o id do usuário nos parâmetros da url.

#### Respostas

##### StatusCode: 200;

  Usuário excluido com sucesso. Retorna um json:
  ```
    { 
      info: 'User deleted with success!' 
    }
  ```

##### StatusCode: 404;
  Usuário não encontrado. Retorno:
  ```
    { 
      info: 'User not found!' 
    }
  ```
##### StatusCode: 400;

  Id informado é inválido. Retorno:
  ``` 
    { 
      info: 'Invalid id!' 
    }
  ```
##### StatusCode: 403;

  Usuário não autorizado. Retorna um json:
  ```
    {
      info: 'User not Authorized'
    }
  ```

##### StatusCode: 400;

  Ocorre quando não é enviado um token de autorização. Retorna um json:
  ```
    {
      info: 'Send the token for authorization'
    }
  ```

##### StatusCode: 401;

  Token inválido, não aceito. Retorna um json:
  ```
  {
    info: 'Invalid Token!'
  }
  ```