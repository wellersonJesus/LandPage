# Schema databases <br>Manager

```bash
erDiagram
    EMPRESA {
        INTEGER id PK
        TEXT nome
        TEXT slogan
        TEXT descricao
        TEXT cnpj
        TEXT atividade
        TEXT localizacao
        TEXT missao
        TEXT servicos
        TEXT projetos_destaque
    }

    GESTAO {
        INTEGER id PK
        DATE data
        REAL km_percorrido
        REAL meta
        TEXT horas_trabalhadas
        REAL receita
        REAL despesa
        REAL lucro
        REAL conta
    }

    CALENDARIO {
        INTEGER id PK
        DATE data
        TEXT dia_semana
        INTEGER mes
        INTEGER ano
        BOOLEAN feriado
    }

    EMPRESTIMO {
        INTEGER id PK
        TEXT cnpj
        TEXT descricao
        REAL valor_total
        REAL valor_pago
        REAL valor_a_pagar
        DATE data_parcela
        TEXT numero_parcela
        REAL valor_parcela
    }

    LANCAMENTO {
        INTEGER id PK
        INTEGER ano
        INTEGER mes
        TEXT descricao
        REAL valor
        TEXT categoria
    }

    MANUTENCAO {
        INTEGER id PK
        TEXT tipo_manutencao
        DATE data_ultima
        REAL valor_pago
        DATE data_proxima
    }

    CONTA {
        INTEGER id PK
        TEXT titular
        TEXT tipo_conta
        TEXT identificador
    }

    SERVIDOR {
        INTEGER id PK
        TEXT servico
        TEXT email
        TEXT usuario
        TEXT senha
        TEXT tokens
        TEXT frase
    }

    DISPOSITIVO {
        INTEGER id PK
        TEXT dispositivo
        TEXT email
        TEXT usuario
        TEXT senha
        TEXT tokens
    }

    REDE {
        INTEGER id PK
        TEXT categoria
        TEXT descricao
        TEXT email
        TEXT usuario
        TEXT senha
        TEXT tokens
    }

    CONTRATO {
        INTEGER id PK
        TEXT tipo_contrato
        DATE data_inicio
        DATE data_vigencia
        TEXT duracao
        TEXT descricao
        TEXT remuneracao
        TEXT aparelho
        TEXT chip
        TEXT email_contato
        TEXT telefone_contato
        TEXT login
        TEXT banco
        TEXT pix
        TEXT recebimentos
        TEXT mei
        TEXT gestao_financeira
        TEXT parceria_empresarial
    }

    SKILL {
        INTEGER id PK
        TEXT nome
        TEXT categoria
        TEXT nivel
    }

    CURSO {
        INTEGER id PK
        TEXT nome
        TEXT email
        TEXT usuario
        TEXT senha
        TEXT tokens
    }

    PLATAFORMA {
        INTEGER id PK
        TEXT nome
        TEXT email
        TEXT usuario
        TEXT senha
        TEXT tokens
    }

    INVESTIMENTO {
        INTEGER id PK
        TEXT tipo
        TEXT descricao
        REAL valor_investido
        REAL valor_atual
        DATE data_inicio
        DATE data_vencimento
    }

    %% Relações (WS Manager)
    CONTRATO ||--o{ CONTA : "associado_a"
    CONTRATO ||--o{ INVESTIMENTO : "relacionado_a"
    GESTAO ||--o{ LANCAMENTO : "contabiliza"
    EMPRESA ||--o{ CONTRATO : "possui"
    DISPOSITIVO ||--o{ CONTA : "acesso_a"
    SERVIDOR ||--o{ PLATAFORMA : "administra"
```
##### Sequência de <br>migrations recomendada
```bash 
1 001_create_usuario.php      # Cria a tabela USUARIO
2 002_create_empresa.php      # Cria a tabela EMPRESA
3 003_create_conta.php        # Cria a tabela CONTA
4 004_create_servidor.php     # Cria a tabela SERVIDOR
5 005_create_dispositivo.php  # Cria a tabela DISPOSITIVO (acesso a CONTA)
6 006_create_plataforma.php   # Cria a tabela PLATAFORMA (administração por SERVIDOR)
7 007_create_contrato.php     # Cria a tabela CONTRATO (relaciona EMPRESA + CONTA + INVESTIMENTO)
8 008_create_investimento.php # Cria a tabela INVESTIMENTO (relacionada a CONTRATO)
9 009_create_gestao.php       # Cria a tabela GESTAO
10 010_create_lancamento.php  # Cria a tabela LANCAMENTO (contabiliza GESTAO)
11 011_create_calendario.php  # Cria a tabela CALENDARIO (independente)
12 012_create_emprestimo.php  # Cria a tabela EMPRESTIMO (opcionalmente vincula EMPRESA)
13 013_create_manutencao.php  # Cria a tabela MANUTENCAO
14 014_create_skill.php        # Cria a tabela SKILL
15 015_create_curso.php        # Cria a tabela CURSO
16 016_create_rede.php         # Cria a tabela REDE
```

##### 💡 Resumo:

_Sempre crie tabelas “pais” primeiro, depois as que dependem delas. Ordem mínima crítica, considerando suas relações:_

```bash
EMPRESA → CONTA → CONTRATO → INVESTIMENTO
SERVIDOR → PLATAFORMA
GESTAO → LANCAMENTO
DISPOSITIVO → CONTA
```

_As outras podem ser criadas antes ou depois, sem quebrar dependências._

```bash
CALENDARIO 
EMPRESTIMO 
MANUTENCAO 
SKILL 
CURSO 
REDE 
```
