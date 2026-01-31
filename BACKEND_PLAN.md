# Arquitetura Backend - Imóveis daki do Bairro

Este documento descreve o plano de implementação do Backend para transformar o site estático em uma plataforma dinâmica.

## 1. Tecnologia Escolhida: **Supabase**
Escolhemos o Supabase por ser uma solução "Backend-as-a-Service" completa que oferece:
- **Banco de Dados:** PostgreSQL (o mais robusto do mercado).
- **Autenticação:** Sistema pronto de Login/Cadastro/Recuperação de senha.
- **Storage:** Armazenamento de arquivos (fotos dos imóveis).
- **Integração:** Funciona perfeitamente com Next.js (App Router).
- **Custo:** Possui um plano gratuito generoso excelente para começar.

## 2. Estrutura do Banco de Dados (Schema)

### Tabela: `agencies` (Imobiliárias)
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | int8 (PK) | Identificador único |
| name | text | Nome da imobiliária |
| email | text | E-mail de contato |
| phone | text | Telefone |
| logo_url | text | Link da logo |
| creci | text | Registro profissional |
| created_at | timestamp | Data de cadastro |

### Tabela: `properties` (Imóveis)
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid (PK) | Identificador único |
| title | text | Título do anúncio |
| description | text | Descrição completa |
| price | numeric | Valor do imóvel |
| type | text | Venda ou Aluguel |
| location | text | Endereço/Bairro |
| bedrooms | int | Quartos |
| bathrooms | int | Banheiros |
| area | numeric | Área (m²) |
| features | text[] | Array de características (ex: Piscina, Churrasqueira) |
| images | text[] | Array de URLs das fotos |
| agency_id | int8 (FK) | Vincula à imobiliária |
| featured | boolean | Se é destaque na home |
| created_at | timestamp | Data de cadastro |

### Tabela: `profiles` (Usuários)
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid (PK) | Vinculado ao auth.users do Supabase |
| full_name | text | Nome completo |
| role | text | 'user' ou 'admin' |
| created_at | timestamp | Data de cadastro |

## 3. Próximos Passos para Implementação

1.  **Instalação:** Adicionar bibliotecas do Supabase ao projeto.
2.  **Configuração:** Criar variáveis de ambiente (`.env.local`) com as chaves de API.
3.  **Migração:** Executar o script SQL para criar as tabelas.
4.  **Refatoração:**
    - Substituir `lib/properties.ts` por chamadas à API do Supabase.
    - Criar página de Login real.
    - Criar Dashboard para adicionar imóveis (protegido por senha).
