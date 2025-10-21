erDiagram
    empresa {
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

    gestao {
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

    calendario {
        INTEGER id PK
        DATE data
        TEXT dia_semana
        INTEGER mes
        INTEGER ano
        BOOLEAN feriado
    }

    emprestimo {
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

    lancamento {
        INTEGER id PK
        INTEGER ano
        INTEGER mes
        TEXT descricao
        REAL valor
        TEXT categoria
    }

    manutencao {
        INTEGER id PK
        TEXT tipo_manutencao
        DATE data_ultima
        REAL valor_pago
        DATE data_proxima
    }

    conta {
        INTEGER id PK
        TEXT titular
        TEXT tipo_conta
        TEXT identificador
    }

    servidor {
        INTEGER id PK
        TEXT servico
        TEXT email
        TEXT usuario
        TEXT senha
        TEXT tokens
        TEXT frase
    }

    dispositivo {
        INTEGER id PK
        TEXT dispositivo
        TEXT email
        TEXT usuario
        TEXT senha
        TEXT tokens
    }

    rede {
        INTEGER id PK
        TEXT categoria
        TEXT descricao
        TEXT email
        TEXT usuario
        TEXT senha
        TEXT tokens
    }

    contrato {
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

    skill {
        INTEGER id PK
        TEXT nome
        TEXT categoria
        TEXT nivel
    }

    curso {
        INTEGER id PK
        TEXT nome
        TEXT email
        TEXT usuario
        TEXT senha
        TEXT tokens
    }

    plataforma {
        INTEGER id PK
        TEXT nome
        TEXT email
        TEXT usuario
        TEXT senha
        TEXT tokens
    }

    investimento {
        INTEGER id PK
        TEXT tipo
        TEXT descricao
        REAL valor_investido
        REAL valor_atual
        DATE data_inicio
        DATE data_vencimento
    }

    %% Relações (sugestão)
    contrato ||--o{ conta : "associado_a"
    contrato ||--o{ investimento : "relacionado_a"
    gestao ||--o{ lancamento : "contabiliza"
    empresa ||--o{ contrato : "possui"
    dispositivo ||--o{ conta : "acesso_a"
    servidor ||--o{ plataforma : "administra"
