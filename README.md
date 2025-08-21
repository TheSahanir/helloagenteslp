# Hello Agentes LP

Landing page para o projeto Hello Agentes - uma plataforma de criação de agentes de IA personalizados.

## Deploy

Este projeto está configurado para deploy automático no GitHub Pages.

### Como funciona

- Toda vez que você fizer push para a branch `main`, o GitHub Actions irá automaticamente fazer o deploy
- O site será disponibilizado em: `https://seu-usuario.github.io/helloagenteslp`

### Configuração inicial

1. Crie um repositório no GitHub com o nome `helloagenteslp`
2. Adicione o remote origin:
   ```bash
   git remote add origin https://github.com/seu-usuario/helloagenteslp.git
   ```
3. Faça push para o repositório:
   ```bash
   git branch -M main
   git push -u origin main
   ```

4. Ative o GitHub Pages nas configurações do repositório:
   - Vá em Settings > Pages
   - Em Source, selecione "GitHub Actions"

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- GitHub Pages para hospedagem

## Estrutura do projeto

- `index.html` - Página principal
- `styles.css` - Estilos globais
- `script.js` - Funcionalidades JavaScript
- `chat.html` - Página de chat
