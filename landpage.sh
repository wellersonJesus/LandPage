#!/bin/bash
set -e

# Define caminhos absolutos baseados na localização deste script
BASE_DIR=$(cd "$(dirname "$0")" && pwd)
BACKEND_DIR="$BASE_DIR/backend"
FRONTEND_DIR="$BASE_DIR/frontend"
DB_FILE="$BACKEND_DIR/src/Database/landpage.db"

# Função de ajuda
show_help() {
    echo "🛠  Gerenciador do Projeto Landpage"
    echo "---------------------------------------------------"
    echo "Uso: ./landpage.sh [comando]"
    echo ""
    echo "Comandos disponíveis:"
    echo "  install      📦 Instala dependências (Back + Front)"
    echo "  db:migrate   🔄 Roda as migrations (Atualiza banco)"
    echo "  db:seed      🌱 Popula o banco com dados iniciais"
    echo "  db:reset     🔥 APAGA o banco atual e recria do zero (Migrate + Seed)"
    echo "  start:back   🚀 Inicia o servidor Backend (PHP)"
    echo "  start:front  🌐 Inicia o servidor Frontend (Angular)"
    echo "---------------------------------------------------"
}

case "$1" in
  install)
    echo "📦 Instalando dependências do Backend..."
    cd "$BACKEND_DIR" && composer install
    echo "📦 Instalando dependências do Frontend..."
    cd "$FRONTEND_DIR" && npm install
    ;;
  db:migrate)
    echo "🔄 Rodando Migrations..."
    cd "$BACKEND_DIR" && php src/Database/run-migrations.php
    ;;
  db:seed)
    echo "🌱 Rodando Seeds..."
    cd "$BACKEND_DIR" && php src/Database/seed-db.php
    ;;
  db:reset)
    echo "🔥 Resetando Banco de Dados..."
    rm -f "$DB_FILE"
    "$0" db:migrate
    "$0" db:seed
    ;;
  start:back)
    echo "🚀 Iniciando Backend em http://localhost:8000 ..."
    cd "$BACKEND_DIR" && php -S localhost:8000 -t public
    ;;
  start:front)
    echo "🌐 Iniciando Frontend em http://localhost:4200 ..."
    cd "$FRONTEND_DIR" && ng serve --open
    ;;
  *)
    show_help
    ;;
esac