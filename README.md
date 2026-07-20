# Portfolio Web Automation

Projeto de automação web para portfólio, criado com **Playwright** e **TypeScript**. Ele cobre dois domínios: a documentação pública do Playwright e o e-commerce de demonstração Sauce Demo.

## Estrutura

```text
config/                    Configuração por ambiente
src/core/config/           Leitura centralizada das configurações
src/web/pages/             Page Objects
src/web/pages/ecommerce/   Page Objects do e-commerce
src/web/flows/             Jornadas reutilizáveis
src/web/support/           Massas de teste
tests/web/                 Especificações Playwright
```

## Cobertura do e-commerce

- Autenticação: acesso válido, credenciais inválidas e usuário bloqueado.
- Produtos: catálogo e ordenação por menor preço.
- Carrinho: inclusão e remoção de itens.
- Checkout: validação de campos obrigatórios e conclusão de compra simulada.

## Como executar

```bash
npm install
npx playwright install chromium
copy .env.example .env
npm test
```

No macOS/Linux, substitua `copy` por `cp`. É possível alterar as URLs com `WEB_BASE_URL` (documentação) e `SAUCE_DEMO_BASE_URL` (e-commerce) no arquivo `.env`.

## Comandos úteis

```bash
npm run test:headed
npm run test:ui
npm run test:smoke
npm run test:regression
npm run report
npm run lint
```
