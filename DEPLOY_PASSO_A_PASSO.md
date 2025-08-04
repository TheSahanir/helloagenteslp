# 🚀 Deploy do Hello Agentes - Passo a Passo

## Método Mais Simples: Vercel + Cloudflare

### Passo 1: Fazer commit das alterações
```bash
# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Preparar projeto para deploy"

# Se ainda não tiver repositório remoto:
git branch -M main
```

### Passo 2: Criar repositório no GitHub
1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome: `helloagentes`
4. Deixe público ou privado como preferir
5. Clique em "Create repository"

### Passo 3: Conectar seu projeto ao GitHub
```bash
# Substitua a URL abaixo pela do seu repositório
git remote add origin https://github.com/SEU-USUARIO/helloagentes.git
git push -u origin main
```

### Passo 4: Configurar Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "New Project"
4. Selecione o repositório `helloagentes`
5. Clique em "Import"

### Passo 5: Configurar variáveis de ambiente
Na Vercel, vá em "Settings" > "Environment Variables" e adicione:

```
NODE_ENV=production
```

### Passo 6: Configurar build settings
Na página de configuração do projeto:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Passo 7: Fazer o deploy
Clique em "Deploy" e aguarde o build terminar.

### Passo 8: Configurar domínio na Vercel
1. Após o deploy, vá em "Settings" > "Domains"
2. Clique em "Add" e digite `helloagentes.com`
3. A Vercel vai mostrar os registros DNS que você precisa configurar

### Passo 9: Configurar Cloudflare
No painel do Cloudflare para helloagentes.com:

**Adicione estes registros DNS:**

1. **Registro A (principal)**:
   - Type: `A`
   - Name: `@`
   - IPv4 address: `76.76.21.21`
   - Proxy status: `Proxied` (🟠 laranja)

2. **Registro CNAME (www)**:
   - Type: `CNAME`
   - Name: `www`
   - Target: `cname.vercel-dns.com`
   - Proxy status: `Proxied` (🟠 laranja)

3. **Registro CNAME (vercel)**:
   - Type: `CNAME`
   - Name: `cname`
   - Target: `cname.vercel-dns.com`
   - Proxy status: `Proxied` (🟠 laranja)

### Passo 10: Configurar SSL no Cloudflare
1. Vá para "SSL/TLS" > "Overview"
2. Selecione "Full (strict)"

### Passo 11: Aguardar propagação
- Aguarde de 5 minutos a 24 horas para a propagação do DNS
- Você pode verificar o status em [whatsmydns.net](https://whatsmydns.net)

## 🔍 Verificação

### Para verificar se o deploy funcionou:
1. Acesse `https://helloagentes.com`
2. Verifique se o site carrega corretamente
3. Teste o formulário de criação de agente
4. Verifique se todas as páginas funcionam

### Comandos úteis:
```bash
# Para verificar se o build funciona localmente
npm run build

# Para testar em modo produção local
npm start

# Para verificar erros
npm run lint
```

## 🚨 Solução de Problemas

### Problema: Site não carrega
- Verifique os registros DNS no Cloudflare
- Aguarde mais tempo para propagação do DNS
- Verifique os logs de deploy na Vercel

### Problema: Erros de build
- Verifique se todas as dependências estão no package.json
- Execute `npm run build` localmente para testar
- Verifique os logs na Vercel

### Problema: Socket.IO não funciona
- Socket.IO com servidor customizado pode não funcionar em serverless
- Para produção, considere remover o Socket.IO ou usar uma alternativa

## 📞 Suporte

Se precisar de ajuda:
1. Verifique os logs na Vercel
2. Consulte a documentação da Vercel
3. Entre em contato com o suporte da Vercel

## ✅ Pronto!

Após seguir todos esses passos, seu site Hello Agentes estará no ar em `https://helloagentes.com` com todas as funcionalidades funcionando!