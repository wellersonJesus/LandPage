# Banco de Dados — WS Manager

```mermaid
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
