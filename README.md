## Configurações
***
### Usuário de acesso:
- Nome de usuário: **admin**
- Senha: **admin**
***
### Configurações de ambiente
As configurações de ambiente devem ser alteradas caso o endereço da API suba em host ou porta diferentes.
As configurações de ambiente estão localizadas em ```VerzelChallengeFrontend/src/environments/environment.ts```

```ts
export const environment = {
  production: false,
  api_base_url: 'https://localhost:7013/api',
  api_images_base_url: 'https://localhost:7013/images',
  access_token: 'access_token'
};
```
***

## Instruções para execução
Na raiz do projeto executar o comando abaixo. A opção ```-o``` fará com que um navegador abra automaticamente com a execução do projeto.
```PowerShell 
ng serve -o
```