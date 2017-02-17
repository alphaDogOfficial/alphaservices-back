# Clientes

## Colunas
 - CPF
 - Nome
 - Login
 - Senha
 - Telefone
 - E-mail

## Restrição

  - PK
  - Not null
  - Unique not null
  - Not null
  - Not null
  - Unique not null

## Tipo

  - numeric(11)
  - varchar(255)
  - varchar(255)
  - varchar(255)
  - numeric(15)
  - varchar(255)

## GROUPED
 'CPF numeric(11) PRIMARY KEY' +
 'Nome varchar(255) not null' +
 'Login varchar(255) unique not null'  +
 'Senha varchar(255) not null'  +
 'Telefone numeric(15) not null'  +
 'E-mal varchar(255) not null'
