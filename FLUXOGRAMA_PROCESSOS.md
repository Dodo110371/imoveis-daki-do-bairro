# Fluxograma de Processos - Imóveis daki do Bairro

Este documento apresenta o fluxo completo dos processos de Compra, Aluguel e Venda (Anúncio) na plataforma.

```mermaid
graph TD
    %% Estilos (Cores e Formatação)
    classDef user fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1,rx:10,ry:10;
    classDef action fill:#fff3e0,stroke:#ef6c00,stroke-width:2px,color:#e65100,rx:5,ry:5;
    classDef system fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c,rx:5,ry:5;
    classDef admin fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#b71c1c,rx:5,ry:5;
    classDef success fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20,rx:5,ry:5;
    classDef decision fill:#fff,stroke:#333,stroke-width:2px,stroke-dasharray: 5 5,rx:5,ry:5;

    %% Atores
    Visitante([Visitante / Comprador]):::user
    Proprietario([Proprietário / Anunciante]):::user
    Admin([Administrador]):::admin

    %% Início
    Visitante -->|Acessa| Home[Página Inicial]:::system
    Proprietario -->|Acessa| Home

    %% Decisão Inicial
    Home --> Decisao{O que deseja fazer?}:::decision

    %% FLUXO 1: COMPRA E ALUGUEL (BUSCA)
    Decisao -->|Comprar ou Alugar| Busca[Busca de Imóveis]:::action
    
    subgraph Fluxo_Busca [Fluxo de Busca e Contato]
        direction TB
        Busca --> Filtros[Filtros: Cidade, Bairro, Valor]:::action
        Filtros --> Lista[Lista de Resultados]:::system
        Lista -->|Seleciona| Detalhes[Detalhes do Imóvel]:::system
        Detalhes -->|Visualiza| Midia[Fotos e Vídeo]:::system
        
        Detalhes --> Interesse{Tem Interesse?}:::decision
        Interesse -->|Sim: WhatsApp| Zap[Botão WhatsApp]:::success
        Interesse -->|Sim: Email| Email[Formulário Email]:::success
        
        Zap --> Negociacao[Negociação Direta com Proprietário]:::success
        Email --> Negociacao
    end

    %% FLUXO 2: VENDA (ANÚNCIO)
    Decisao -->|Anunciar Imóvel| Anunciar[Página Anunciar]:::action
    
    subgraph Fluxo_Anuncio [Fluxo de Cadastro de Anúncio]
        direction TB
        Anunciar --> CheckAuth{Logado?}:::decision
        CheckAuth -->|Não| Login[Login / Cadastro]:::action
        CheckAuth -->|Sim| Formulario[Início do Formulário]:::action
        Login --> Formulario

        Formulario --> Etapas[Preenchimento das 9 Etapas]:::action
        Etapas -->|1. Identificação| E1[Dados Básicos]:::system
        Etapas -->|...| E_Midia[Upload Fotos/Vídeo]:::system
        Etapas -->|9. Planos| E_Final[Escolha do Plano]:::system
        
        E_Final --> Destaque{Marcar Destaque?}:::decision
        Destaque -->|Sim/Não| Submit[Enviar Anúncio]:::action
        Submit --> StatusPendente[Status: Pendente]:::system
    end

    %% FLUXO 3: MODERAÇÃO (ADMIN)
    StatusPendente --> Moderacao
    
    subgraph Fluxo_Admin [Moderação e Aprovação]
        direction TB
        Admin -->|Login| Painel[Painel Administrativo]:::admin
        Painel --> ListaPendentes[Lista de Pendentes]:::system
        ListaPendentes --> Moderacao{Aprovar?}:::decision
        
        Moderacao -->|Sim| StatusAtivo[Status: Ativo]:::success
        Moderacao -->|Não| StatusRejeitado[Status: Rejeitado]:::admin
        
        StatusAtivo -->|Publicado| Lista
        StatusAtivo -->|Se Destaque| Home
    end
```

## Legenda de Cores
- **Azul**: Ações do Usuário (Visitante/Proprietário)
- **Laranja**: Ações no Sistema (Clicar, Preencher, Buscar)
- **Roxo**: Telas e Processos do Sistema
- **Vermelho**: Área Administrativa
- **Verde**: Sucesso / Finalização (Contato, Publicação)
