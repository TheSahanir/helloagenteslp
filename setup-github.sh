#!/bin/bash

# Script para configurar o repositório GitHub
# Uso: ./setup-github.sh seu-nome-de-usuario

if [ $# -eq 0 ]; then
    echo "Por favor, forneça seu nome de usuário do GitHub"
    echo "Uso: $0 seu-nome-de-usuario"
    exit 1
fi

USERNAME=$1
REPO_NAME="helloagenteslp"

echo "Configurando repositório para $USERNAME/$REPO_NAME..."

# Renomear branch para main
git branch -M main

# Adicionar remote do GitHub
git remote add origin https://github.com/$USERNAME/$REPO_NAME.git

# Fazer push
git push -u origin main

echo "✅ Configuração completa!"
echo "Acesse https://github.com/$USERNAME/$REPO_NAME para ver seu repositório"
echo ""
echo "Para ativar o GitHub Pages:"
echo "1. Vá em Settings > Pages"
echo "2. Em Source, selecione 'GitHub Actions'"
echo ""
echo "O site estará disponível em: https://$USERNAME.github.io/$REPO_NAME"
