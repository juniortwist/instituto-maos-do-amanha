# Instituto Mãos do Amanhã

Protótipo acadêmico de uma SPA (Single Page Application) responsiva e acessível para apresentação de projetos sociais, voluntariado e contato.

> **Aviso:** projeto demonstrativo, não afiliado a uma ONG real. Projetos e descrições são fictícios. Os formulários **não enviam dados para um servidor**: utilizam apenas o `localStorage` do navegador. Não é um sistema pronto para coletar dados reais de pessoas.

## Tecnologias
- HTML5 semântico
- CSS3 com Grid, Flexbox, media queries e variáveis de tema
- JavaScript ES6 modular, roteamento por `hashchange`, manipulação de DOM, validação de formulários e `localStorage`
- Vite (opcional) para servidor de desenvolvimento e minificação/build de produção
- SVG vetorial local para ilustrações e favicon

## Estrutura
```
instituto-maos-do-amanha/
├── html/index.html       # Documento e pontos de montagem
├── css/styles.css        # Design system, temas, layout responsivo
├── js/
│   ├── main.js           # Inicialização
│   ├── router.js         # Rotas hash SPA
│   ├── templates.js      # Componentes HTML e páginas
│   ├── data.js           # Dados demonstrativos
│   ├── forms.js          # Validação e envio local
│   ├── storage.js        # Persistência no navegador
│   └── ui.js             # Filtros, tema, menu, modal e toast
├── imagens/              # SVGs locais
├── vite.config.js
├── package.json
└── README.md
```

## Executar sem instalar dependências
Na raiz do projeto:
```bash
python3 -m http.server 8000
```
Abra **http://localhost:8000/html/**. Para testar o armazenamento local, use um navegador com permissões normais de armazenamento.

## Executar com Vite
Requer Node.js 20.19+ ou 22.12+ (para versões recentes do Vite).
```bash
npm install
npm run dev
```
Abra o endereço mostrado no terminal.

## Build de produção
```bash
npm run build
npm run preview
```
A saída é criada em `dist/`. Configure a hospedagem estática para publicar essa pasta. O projeto utiliza roteamento por hash (`#/projetos`), que não exige redirecionamento de rotas no servidor.

## Funcionalidades
- Início, projetos, voluntariado, transparência e contato
- Filtro de projetos por categoria
- Formulários com validação, mensagens acessíveis e dados salvos localmente
- Tema claro, escuro e alto contraste com preferência persistente
- Modal nativo `<dialog>` com Escape, gerenciamento de foco do navegador e botão de fechamento
- Menu responsivo, foco visível, skip link, landmarks semânticos e regiões de anúncio
- Remoção de dados locais pela página Transparência

## Testes sugeridos
1. Acesse todas as rotas e use Voltar/Avançar do navegador.
2. Navegue apenas com Tab, Shift+Tab, Enter, Espaço e Escape.
3. Teste os formulários vazios, e-mail inválido e mensagens curtas.
4. Salve um registro, atualize a página e confirme sua persistência pelo DevTools → Application → Local Storage.
5. Teste os temas, recarregue e confira se a preferência permanece.
6. Execute Lighthouse e verifique contraste com WebAIM Contrast Checker.
7. Teste larguras de 320, 375, 768 e 1440 px e leitores de tela (NVDA/VoiceOver).

Os testes e resultados quantitativos **não foram realizados automaticamente** apenas por este README. Registre métricas reais após executá-los.

## Git / versionamento sugerido
- `main`: versões estáveis
- `develop`: integração
- `feature/*`: novas funcionalidades
- `hotfix/*`: correções urgentes

Exemplos de commits: `feat: adiciona navegação SPA`, `feat: cria formulário acessível`, `fix: corrige foco no menu móvel`, `docs: detalha execução local`. Sugestão de tag inicial: `v1.0.0`. Esses são exemplos, não histórico Git comprovado.

## Publicação sugerida (Netlify)
1. Faça push do projeto para o GitHub.
2. Em Netlify, escolha **Add new project → Import an existing project**.
3. Conecte o repositório.
4. Build command: `npm run build`.
5. Publish directory: `dist` (em relação à raiz do repositório).
6. Publique e teste o endereço gerado.

**Privacidade:** não utilize o armazenamento local deste protótipo para dados pessoais reais. Para produção, implemente API, autenticação, políticas de retenção e conformidade com a LGPD.
