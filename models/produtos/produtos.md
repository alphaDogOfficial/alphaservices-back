# Produtos

## Colunas
 - idProduto
 - Valor
 - Nome
 - Imagem
 - Descrição
 - Peso
 - Tamanho
 - Fabricante
 - Quantidade
 - Tipo

## Restrição

  - PK
  - Not null
  - Not null
  - Nenhuma
  - Not null
  - Not null
  - Not null
  - Not null
  - Not null
  - Not null

## Tipo

  - numeric(30)   --> SERIAL for IDs
  - numeric(30)
  - varchar(255)
  - varchar(255)
  - varchar(255)
  - numeric(30)
  - varchar(255)
  - varchar(255)
  - numeric(30)
  - varchar(255)

## GROUPED
 'idProduto SERIAL PRIMARY KEY' +
 'Valor numeric(30) not null' +
 'Nome varchar(255) not null' +
 'Imagem varchar(255) Nenhuma'  +
 'Descrição varchar(255) not null'  +
 'Peso numeric(30) not null'  +
 'Tamanho varchar(255) not null'  +
 'Fabricante varchar(255) not null' +
 'Quantidade numeric(30) not null'  +
 'Tipo varchar(255) not null'
