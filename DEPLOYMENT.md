# Guia de Deploy - Hello Agentes

## Opção 1: Deploy na Vercel (Recomendado)

### Passo 1: Preparar o Repositório
1. Crie um repositório no GitHub
2. Faça commit do seu projeto:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/helloagentes.git
git push -u origin main
```

### Passo 2: Configurar a Vercel
1. Acesse [vercel.com](https://vercel.com) e crie uma conta
2. Clique em "New Project"
3. Conecte seu repositório GitHub
4. Selecione o repositório do seu projeto

### Passo 3: Configurar Variáveis de Ambiente
Na Vercel, vá para "Settings" > "Environment Variables" e adicione:

```
NODE_ENV=production
DATABASE_URL="sua_url_do_banco_de_dados"
NEXTAUTH_SECRET="seu_nextauth_secret"
NEXTAUTH_URL="https://helloagentes.com"
```

### Passo 4: Configurar Build Command
Nas configurações do projeto na Vercel:
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Passo 5: Configurar Domínio na Vercel
1. Vá para "Settings" > "Domains"
2. Adicione `helloagentes.com`
3. A Vercel fornecerá os registros DNS que você precisa configurar no Cloudflare

## Passo 6: Configurar Cloudflare

### 1. Configurar DNS no Cloudflare
No painel do Cloudflare para helloagentes.com:

**Para o domínio principal (A record):**
- **Type**: A
- **Name**: @
- **IPv4 address**: `76.76.21.21` (endereço da Vercel)
- **Proxy status**: Proxied (laranja)

**Para o www (CNAME record):**
- **Type**: CNAME
- **Name**: www
- **Target**: `cname.vercel-dns.com`
- **Proxy status**: Proxied (laranja)

**Registros adicionais necessários:**
```
Type: CNAME
Name: cname
Target: cname.vercel-dns.com
Proxy status: Proxied

Type: TXT
Name: @
Target: v=spf1 include:_spf.google.com ~all
Proxy status: DNS only
```

### 2. Configurar SSL/TLS
Vá para "SSL/TLS" > "Overview" e selecione "Full (strict)"

### 3. Configurar Page Rules (Opcional)
Se precisar de redirecionamentos:
```
URL: helloagentes.com/*
Setting: Forwarding URL
Status Code: 301 - Permanent Redirect
Destination URL: https://www.helloagentes.com/$1
```

## Opção 2: Deploy na DigitalOcean App Platform

### Passo 1: Preparar o App Spec
Crie um arquivo `.do/app.yaml`:

```yaml
name: helloagentes
services:
- name: web
  source_dir: /
  github:
    repo: seu-usuario/helloagentes
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: DATABASE_URL
    value: ${db.DATABASE_URL}
databases:
- engine: PG
  name: db
  size: db-s-dev-database
  version: "13"
```

### Passo 2: Configurar Domínio na DigitalOcean
1. Na DigitalOcean App Platform, vá para "Settings" > "Domains"
2. Adicione `helloagentes.com`
3. Siga as instruções para configurar o DNS no Cloudflare

## Opção 3: Deploy na Netlify

### Passo 1: Preparar o netlify.toml
Crie um arquivo `netlify.toml`:

```toml
[build]
  command = "npm run vercel-build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Passo 2: Configurar o Netlify
1. Conecte seu repositório GitHub ao Netlify
2. Configure as variáveis de ambiente
3. Configure o domínio personalizado

## Pós-Deploy: Configurações Importantes

### 1. Banco de Dados
Se você está usando SQLite localmente, considere migrar para um banco de dados production-ready:
- **PostgreSQL**: Recomendado para produção
- **MySQL**: Boa alternativa
- **PlanetScale**: MySQL serverless

### 2. Variáveis de Ambiente de Produção
Certifique-se de configurar todas as variáveis necessárias:
```env
NODE_ENV=production
DATABASE_URL="postgresql://usuario:senha@host:porta/banco"
NEXTAUTH_SECRET="sua_chave_secreta_aleatoria"
NEXTAUTH_URL="https://helloagentes.com"
```

### 3. Monitoramento e Logs
- Configure monitoramento na Vercel
- Ative logs para debug
- Configure alertas para erros

### 4. Backup e Segurança
- Faça backup regular do banco de dados
- Configure HTTPS (já feito pelo Cloudflare)
- Configure políticas de segurança

## Solução de Problemas Comuns

### Problema: Socket.IO não funciona no deploy
**Solução**: Socket.IO com servidor customizado não funciona bem em serverless. Considere usar:
- WebSockets nativos do Next.js
- Serviços como Pusher ou Ably
- Deploy em servidor dedicado

### Problema: Erros de build
**Solução**: 
- Verifique se todas as dependências estão no package.json
- Execute `npm run vercel-build` localmente para testar
- Verifique os logs de build na plataforma de deploy

### Problema: Domínio não aponta
**Solução**:
- Verifique os registros DNS no Cloudflare
- Aguarde a propagação do DNS (até 48 horas)
- Verifique se os registros estão com proxy ativado (laranja)

### Problema: Erros de SSL
**Solução**:
- Verifique a configuração SSL/TLS no Cloudflare
- Certifique-se de que o certificado foi emitido corretamente
- Force a renovação do certificado se necessário

## Comandos Úteis

### Verificar build localmente
```bash
npm run vercel-build
```

### Testar produção localmente
```bash
npm run build
npm start
```

### Verificar logs de deploy
```bash
# Na Vercel
vercel logs

# Localmente
npm run lint
```

## Suporte

Se encontrar problemas durante o deploy:
1. Verifique os logs da plataforma de deploy
2. Consulte a documentação oficial da plataforma
3. Verifique este guia novamente
4. Entre em contato com o suporte da plataforma escolhida