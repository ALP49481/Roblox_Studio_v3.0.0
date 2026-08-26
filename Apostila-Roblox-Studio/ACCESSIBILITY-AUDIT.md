# Auditoria de acessibilidade e responsividade

Data: 26 de agosto de 2026  
Versão: 3.1.0

## Resultado

Foram aprovados 9 testes automatizados em Chromium com Playwright e axe-core, além de inspeção visual e da árvore semântica no navegador incorporado.

| Área | Evidência | Resultado |
| --- | --- | --- |
| Celular | 375 × 812, início | sem rolagem horizontal |
| Tablet | 768 × 1024, kits | cards em uma coluna e sem corte |
| Computador | 1440 × 900, busca/avaliações | diálogo legível e foco visível |
| Reflow 200% | viewport equivalente de 640 px | sem rolagem horizontal bidimensional |
| Reflow 400% | viewport equivalente de 320 px | conteúdo refluído em uma coluna |
| Teclado | Ctrl+K, `/`, Tab e Escape | busca abre, recebe foco, fecha e devolve foco |
| Contraste e nomes | axe-core em cinco páginas principais | nenhuma violação séria ou crítica |
| Persistência | progresso e favorito após reload | aprovado |
| Cópia de código | confirmação “Copiado!” | aprovada |
| Movimento reduzido | contexto de teste com reducedMotion | aprovado |

## Screenshots

As evidências ficam em `reports/screenshots/`. A suíte recria:

- `automated-home-375.png`;
- `automated-projects-768.png`;
- `automated-assessments-1440.png`;
- `reflow-equivalent-200.png`;
- `reflow-equivalent-400.png`.

## Como repetir

```powershell
npm ci
npx playwright install chromium
npm run build
npm run test:a11y
```

O workflow `.github/workflows/accessibility.yml` executa a mesma auditoria e publica o relatório e as imagens como artefato.

## Limitação conhecida

A árvore de acessibilidade, landmarks, nomes, foco e contraste foram verificados, mas esta execução não substitui uma sessão humana completa com NVDA, JAWS, Narrator, TalkBack ou VoiceOver. Antes de uma distribuição ampla, uma pessoa usuária de leitor de tela deve percorrer início, busca, módulo, avaliação, kits e certificado e registrar problemas de pronúncia, ordem e carga cognitiva que automação não detecta.
