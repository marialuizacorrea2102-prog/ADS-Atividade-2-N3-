# Confeitaria Âmbar — site institucional fictício

Site de uma página (one-page) criado para a Atividade 2 da disciplina **Front-end Design Engineering — ADS 2026.1**, sobre uma empresa fictícia: a **Confeitaria Âmbar**, uma confeitaria artesanal (bolos, tortas, doces finos e macarons) localizada em Sorriso, MT.

## Estrutura de arquivos

```
confeitaria-ambar/
├── index.html        → toda a estrutura e conteúdo do site
├── css/style.css      → identidade visual, layout e responsividade
├── js/script.js        → interatividade (menu, accordion, modal, formulário etc.)
└── README.md
```

## Seções implementadas

**Obrigatórias:** Navbar, Cabeçalho (logo + nome + menu + botão de contato), Hero/Banner, Sobre a Empresa, Produtos/Serviços, Contato (formulário + informações), Galeria de fotos, FAQ, Localização (mapa incorporado), Rodapé.

**Opcionais escolhidas:** Diferenciais, Depoimentos, Equipe e Números da Empresa.

## Recursos e tecnologias utilizadas

- **HTML5, CSS3 e JavaScript puro (vanilla)** — sem frameworks (não foi usado React, Bootstrap, Tailwind etc.), para focar nos fundamentos de front-end pedidos na disciplina.
- **Fontes:** Google Fonts — *Fraunces* (títulos/serifada, dá o tom artesanal) e *Work Sans* (textos), carregadas via `<link>` no `<head>`.
- **Ícones:** SVGs próprios, desenhados à mão e organizados em um *sprite* (`<symbol>`) dentro do próprio `index.html` — não foi usada nenhuma biblioteca externa de ícones.
- **Imagens/ilustrações:** em vez de fotos de banco de imagens, optei por ilustrações vetoriais (SVG) nas cores da marca para o hero, os produtos e a galeria. Isso evita problemas de licenciamento de fotos e mantém a identidade visual consistente.
- **Mapa:** Google Maps incorporado via `<iframe>` (embed público, sem necessidade de chave de API) na seção "Onde estamos".
- **Inteligência Artificial:** o código (HTML/CSS/JS) e os textos foram desenvolvidos com o auxílio do **Claude (Anthropic)** como assistente de programação, a partir do briefing da atividade enviado pelo professor. A revisão final, ajustes e publicação foram feitos manualmente
- **Acessibilidade:** uso de `aria-expanded`, `aria-hidden`, `aria-live`, foco visível (`:focus-visible`), link "pular para o conteúdo" e respeito a `prefers-reduced-motion`.
## Conteúdo fictício

Todos os nomes (empresa, equipe, clientes), endereço, telefone e e-mail são fictícios, criados apenas para fins acadêmicos.