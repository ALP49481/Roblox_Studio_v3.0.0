# Build e deploy gratuitos: Render Web Service + Aiven PostgreSQL

Este guia descreve a publicação da apostila usando somente:

- **um Web Service gratuito do Render**, que entrega o site e a API Node.js/Express no mesmo endereço;
- **um PostgreSQL gratuito da Aiven**, que guarda contas, sessões e progresso;
- o repositório Git usado pelo Render para obter o código.

Não são necessários banco do Render, Persistent Disk, Background Worker, Cron Job, One-off Job, serviço privado, connection pooler gerenciado ou recurso pago. Instruções conferidas em **26 de agosto de 2026**.

## 1. Arquitetura que cabe nos planos gratuitos

```text
Navegador
   │ HTTPS
   ▼
Render — 1 Web Service gratuito
   ├── HTML, CSS e JavaScript
   ├── API de conta e progresso
   ├── migração idempotente ao iniciar
   └── pool de até 3 conexões
            │ PostgreSQL com TLS
            ▼
Aiven — 1 PostgreSQL gratuito
```

O navegador nunca se conecta diretamente ao PostgreSQL. A `DATABASE_URL`, a senha e o certificado CA existem apenas nas variáveis secretas do Web Service.

O progresso continua funcionando localmente sem conta. A sincronização entre dispositivos exige abrir a apostila pelo endereço HTTPS do Render e entrar em uma conta.

## 2. Limitações gratuitas consideradas na configuração

### Render Free

- O serviço pode suspender depois de 15 minutos sem tráfego. A primeira abertura seguinte pode levar cerca de um minuto.
- O sistema de arquivos é efêmero. O site não grava progresso em arquivos locais do servidor; tudo persistente vai para a Aiven.
- Não há Pre-Deploy Command, One-off Job, shell SSH, disco persistente nem escala horizontal no plano gratuito.
- O workspace possui uma franquia mensal de horas e limites de build/banda. Ao esgotá-los, o serviço pode ser suspenso.
- O endereço `onrender.com` já recebe HTTPS.
- Este plano é adequado a estudo, demonstração e uso pessoal; não oferece a disponibilidade esperada de um serviço comercial.

### Aiven Free PostgreSQL

- O serviço gratuito tem um nó, recursos reduzidos, até 1 GB de disco e limite de `max_connections` igual a 20. A própria plataforma pode usar parte dessas conexões.
- Não há VPC, IP estático, connection pooling gerenciado, integrações, suporte ou SLA de 99,99%.
- A Aiven escolhe a infraestrutura disponível para o serviço gratuito; não conte com a escolha de uma região específica.
- Um serviço sem atividade pode ser desligado pela Aiven. Ele pode ser religado pelo console, mas a restauração pode levar algum tempo.

Por isso, esta aplicação usa somente **3 conexões** por padrão e executa uma migração curta e idempotente dentro do processo web.

## 3. O que a build e a inicialização fazem

O arquivo `render.yaml`, na raiz do repositório, define:

| Etapa | Comando | O que acontece |
| --- | --- | --- |
| Root Directory | `Apostila-Roblox-Studio` | os comandos passam a usar a pasta da aplicação |
| Build | `npm ci --omit=dev && npm test` | instala versões travadas e executa os testes sem acessar o banco |
| Pre-Deploy | **vazio** | o plano gratuito não oferece essa etapa |
| Start | `npm start` | verifica o esquema do banco e só depois abre o servidor |
| Health Check | `/api/health` | confirma que o processo e o banco respondem |

`npm start` executa `server/start.js`. A inicialização:

1. tenta conectar à Aiven com TLS;
2. obtém um bloqueio transacional do PostgreSQL;
3. aplica `server/schema.sql`, composto por operações `IF NOT EXISTS`;
4. repete a tentativa com espera crescente em até quatro tentativas se houver falha temporária;
5. inicia o Express em `0.0.0.0` e na porta fornecida pelo Render;
6. encerra com erro se o banco não puder ser preparado, evitando disponibilizar uma aplicação parcialmente funcional.

Essa verificação também ocorre depois de um cold start do Render. Ela é pequena e segura para repetição. Migrações futuras devem continuar aditivas e compatíveis; não coloque remoções destrutivas automáticas nesse arquivo.

## 4. Validar a build localmente

Na pasta `Apostila-Roblox-Studio`, use uma versão do Node.js aceita por `package.json` e execute:

```powershell
npm ci
npm test
```

Os testes não precisam do banco. Para apenas visualizar o conteúdo offline:

```powershell
npm run preview
```

Abra o endereço mostrado no terminal. A conta online ficará indisponível nesse modo, mas o progresso local continuará funcionando.

Não crie nem envie um arquivo `.env` real para o repositório. `.env.example` contém somente modelos.

## 5. Criar o PostgreSQL gratuito na Aiven

1. Entre no [Aiven Console](https://console.aiven.io/).
2. Crie ou abra um projeto.
3. Escolha **Create service → PostgreSQL**.
4. Selecione o plano **Free**. A interface pode escolher automaticamente a nuvem e a região disponíveis.
5. Dê um nome claro, por exemplo `apostila-roblox-db`, e crie o serviço.
6. Espere o estado indicar que o serviço está em execução.
7. Na página de conexão, localize a **Service URI**. Copie a URI completa oferecida pela Aiven; não reconstrua manualmente uma senha com caracteres especiais.
8. Baixe ou copie o certificado **CA certificate** do serviço.

Você terá dois segredos:

- `DATABASE_URL`: começa com `postgres://` ou `postgresql://` e contém usuário, senha, host, porta e banco;
- `AIVEN_CA_CERT`: conteúdo PEM completo, incluindo `-----BEGIN CERTIFICATE-----` e `-----END CERTIFICATE-----`.

Não cole esses valores em HTML, JavaScript do navegador, issue, screenshot, log, arquivo versionado ou mensagem pública.

## 6. Configurar um Web Service gratuito já existente no Render

Este é o caminho recomendado se o Web Service já existe.

1. Abra o serviço no [Render Dashboard](https://dashboard.render.com/).
2. Em **Settings**, confirme o repositório e a branch que contêm este projeto.
3. Configure **Root Directory** como `Apostila-Roblox-Studio`.
4. Configure **Build Command** como `npm ci --omit=dev && npm test`.
5. Deixe **Pre-Deploy Command** vazio. Se houver um valor antigo como `npm run migrate`, remova-o.
6. Configure **Start Command** como `npm start`.
7. Confirme que o tipo é **Web Service**, runtime **Node** e instance type/plan **Free**.
8. Configure **Health Check Path** como `/api/health`.
9. Mantenha somente uma instância. Não crie worker, cron ou banco adicional.

Em **Environment**, cadastre:

| Variável | Valor | Secreta? |
| --- | --- | --- |
| `NODE_ENV` | `production` | não |
| `SESSION_DAYS` | `30` | não |
| `DATABASE_POOL_MAX` | `3` | não |
| `DATABASE_URL` | Service URI completa da Aiven | sim |
| `AIVEN_CA_CERT` | certificado CA PEM completo | sim |
| `PUBLIC_ORIGIN` | URL HTTPS exata do serviço, sem barra final | não |

Exemplo de formato para `PUBLIC_ORIGIN`: `https://nome-do-servico.onrender.com`. Use o endereço real mostrado pelo Render. Se adicionar um domínio próprio no futuro, atualize essa variável para a origem pela qual os alunos acessarão a aplicação.

Não defina `PORT`: o Render fornece esse valor automaticamente.

Salve as alterações e escolha **Manual Deploy → Deploy latest commit**. Acompanhe os logs. A sequência saudável contém a instalação, os testes, “Estrutura do banco verificada” e, por fim, o endereço em que o servidor está ouvindo. Nenhuma URI, senha ou CA deve aparecer no log.

## 7. Criar do zero com o Blueprint gratuito

Use esta opção somente se ainda não houver Web Service.

1. Envie `render.yaml` e a pasta `Apostila-Roblox-Studio` ao mesmo repositório Git.
2. No Render, escolha **New → Blueprint**.
3. Conecte o repositório e selecione a branch correta.
4. O Render lerá `render.yaml` da raiz.
5. Quando solicitado, informe `DATABASE_URL`, `AIVEN_CA_CERT` e `PUBLIC_ORIGIN`.
6. Confirme que o serviço criado é um **Web Service Free** e não contém Pre-Deploy Command.
7. Aplique o Blueprint e acompanhe build e start.

Se o endereço final diferir do valor previsto em `PUBLIC_ORIGIN`, corrija a variável com a URL mostrada no painel e faça novo deploy. Um erro nessa variável bloqueia requisições de escrita de conta por proteção de origem.

O Blueprint não fixa região. Depois de conhecer a localização exibida pela Aiven, escolha no Render a região gratuita com menor latência prática antes de criar o Web Service. As plataformas podem não oferecer correspondência exata no plano gratuito.

## 8. Restringir a Aiven aos endereços de saída do Render

O PostgreSQL da Aiven pode iniciar aceitando conexões de qualquer endereço (`0.0.0.0/0`). TLS protege o conteúdo, mas restringir a origem reduz a superfície de ataque.

1. Faça primeiro um deploy funcional.
2. No serviço Render, abra a área **Connect** e copie **todos** os intervalos CIDR listados em **Outbound** para a região do serviço.
3. No serviço PostgreSQL da Aiven, abra as configurações de rede/IP filter.
4. Adicione cada CIDR de saída compartilhado do Render.
5. Remova `0.0.0.0/0` somente depois de salvar todos os intervalos.
6. No Render, faça **Manual Deploy → Deploy latest commit** e teste `/api/health`.

O Render gratuito usa faixas compartilhadas, não IP dedicado. Se o computador local também precisar acessar o banco, adicione separadamente o seu IP público com `/32` e remova-o quando o trabalho terminar.

Quando o Render alterar as faixas publicadas ou a região do serviço, atualize a lista da Aiven antes do próximo deploy. Se a conexão parar logo após a restrição, restaure temporariamente a regra necessária, confira todos os CIDRs e restrinja novamente.

## 9. Verificação obrigatória após publicar

Substitua o domínio abaixo pelo endereço real.

1. Abra `https://seu-servico.onrender.com/api/health`.
2. Confirme status HTTP `200` e JSON com `"status": "ok"` e `"database": "ok"`.
3. Abra a página inicial e confirme CSS, navegação e módulos.
4. Crie uma conta de teste com senha exclusiva para esse ambiente.
5. Marque dois capítulos como concluídos.
6. Atualize a página; o progresso deve permanecer.
7. Saia e entre novamente; o progresso deve retornar.
8. Abra outro navegador ou perfil privado, entre na mesma conta e confirme a sincronização.
9. Teste senha incorreta e tentativas repetidas; a resposta deve ser genérica e o limitador deve atuar.
10. Inspecione os logs do Render; segredos, cookies e senhas não podem aparecer.
11. Deixe o serviço ocioso por mais de 15 minutos e teste o cold start. Uma espera inicial é normal no plano gratuito.

Nunca faça essas verificações com uma senha usada em outro site.

## 10. Fluxo de atualização

Para cada atualização:

1. execute `npm ci` e `npm test` localmente;
2. confira que `.env`, certificados e credenciais não entraram no commit;
3. envie o commit à branch conectada;
4. deixe o auto-deploy executar ou use **Deploy latest commit**;
5. acompanhe build, migração de startup e health check;
6. teste login, progresso e páginas principais.

O `render.yaml` usa `autoDeployTrigger: commit`. Desative o auto-deploy no painel se preferir publicar manualmente para economizar minutos de build.

O Render gratuito mantém opções limitadas de rollback. Um rollback de código não desfaz o esquema do banco. Por isso, evolua o banco em duas fases: primeiro adicione estruturas compatíveis; depois que a aplicação nova estiver estável e os dados migrados, remova estruturas antigas manualmente e com backup.

## 11. Uso consciente dos limites gratuitos

- Não use serviços de “keep alive”. Aceite o cold start; pings contínuos consomem horas e tráfego.
- Não aumente `DATABASE_POOL_MAX` acima de `5` nesta aplicação. O padrão `3` deixa conexões livres para a Aiven e para manutenção.
- Não grave uploads, sessões ou progresso no disco do Render.
- Monitore uso de disco, conexões e estado no console Aiven.
- Se a Aiven desligar o serviço por inatividade, ligue-o no console, espere o estado ativo e faça novo deploy/restart no Render.
- Backups incluídos ajudam, mas não substituem exportações periódicas para dados importantes nem criam SLA.
- O tráfego entre Render e Aiven passa pela rede pública com TLS verificado. Distância entre as regiões aumenta latência.

## 12. Diagnóstico rápido

| Sintoma | Causa provável | O que conferir |
| --- | --- | --- |
| build falha em `npm ci` | lockfile incompatível ou versão não enviada | `package.json`, `package-lock.json` e log da primeira falha |
| build falha nos testes | regressão do site/configuração | nome do teste e arquivo indicado; corrija antes de publicar |
| configuração pede Pre-Deploy pago | campo antigo ainda preenchido | apague o Pre-Deploy Command; a migração ocorre em `npm start` |
| `DATABASE_URL não foi definida` | segredo ausente | Environment do Web Service, sem espaços ou aspas extras |
| `AIVEN_CA_CERT é obrigatória` | CA ausente ou nome incorreto | variável com PEM completo e quebras de linha |
| erro de certificado | CA incompleta ou URI do serviço errado | baixe novamente a CA do mesmo serviço Aiven |
| timeout/`ECONNREFUSED` no start | Aiven desligada, URI incorreta ou filtro de IP | estado do serviço, host/porta e todos os CIDRs Render |
| aplicação reinicia sem ficar saudável | migração falhou quatro vezes | primeira mensagem de erro no log e estado da Aiven |
| `/api/health` retorna `503` | banco indisponível depois da partida | Aiven, rede, limites e conexões |
| primeira visita demora | cold start gratuito | aguarde; não configure pings artificiais |
| `502` ou porta não detectada | processo não chegou a iniciar | start log, migração e uso de `PORT`/`0.0.0.0` |
| cadastro/progresso retorna `403` | `PUBLIC_ORIGIN` diferente do endereço aberto | protocolo, domínio exato e ausência de barra final |
| `too many connections` | limite Aiven atingido | mantenha pool `3`, uma instância e encerre clientes administrativos |
| progresso existe só em um navegador | conta não autenticada ou API inacessível | sessão, `/api/session`, console do navegador e health check |

Não corrija falhas desativando TLS, expondo o banco ao navegador ou colocando a senha no código.

## 13. Rotação de credenciais

Se uma senha, URI ou CA for exposta:

1. revogue ou troque a credencial na Aiven imediatamente;
2. atualize `DATABASE_URL` e, se necessário, `AIVEN_CA_CERT` no Render;
3. salve e faça novo deploy;
4. confirme o health check e o login;
5. remova o segredo do histórico Git — apagar apenas o arquivo do último commit não elimina versões anteriores.

Alterar segredos reinicia o serviço e pode interromper sessões brevemente.

## 14. Checklist final

- [ ] um único Render Web Service com plan `Free`;
- [ ] um único Aiven PostgreSQL com plan `Free`;
- [ ] Root Directory `Apostila-Roblox-Studio`;
- [ ] Build Command `npm ci --omit=dev && npm test`;
- [ ] Pre-Deploy Command vazio;
- [ ] Start Command `npm start`;
- [ ] Health Check `/api/health`;
- [ ] `DATABASE_POOL_MAX=3`;
- [ ] URI e CA apenas no Environment do Render;
- [ ] `PUBLIC_ORIGIN` igual à URL HTTPS real;
- [ ] nenhuma variável `PORT` criada manualmente;
- [ ] migração de startup e health check aprovados;
- [ ] conta e sincronização testadas em dois navegadores;
- [ ] faixas de saída do Render permitidas na Aiven;
- [ ] nenhum segredo no repositório ou nos logs;
- [ ] cold start aceito e documentado.

## 15. Fontes oficiais

- [Render — Free instances](https://render.com/docs/free)
- [Render — Deploys e disponibilidade de Pre-Deploy Command](https://render.com/docs/deploys)
- [Render — Web Services, porta e endereço de escuta](https://render.com/docs/web-services)
- [Render — Blueprint YAML Reference](https://render.com/docs/blueprint-spec)
- [Render — Outbound IP addresses](https://render.com/docs/outbound-ip-addresses)
- [Render — Health checks](https://render.com/docs/health-checks)
- [Aiven — PostgreSQL Free tier](https://aiven.io/docs/products/postgresql/concepts/pg-free-tier)
- [Aiven — Create a PostgreSQL service](https://aiven.io/docs/products/postgresql/get-started)
- [Aiven — PostgreSQL connection limits](https://aiven.io/docs/products/postgresql/reference/pg-connection-limits)
- [Aiven — Connect Node.js to PostgreSQL](https://aiven.io/docs/products/postgresql/howto/connect-node)
- [Aiven — Restrict access with IP filters](https://aiven.io/docs/platform/howto/restrict-access)
- [Aiven — Power cycle a PostgreSQL service](https://aiven.io/docs/products/postgresql/howto/power-cycle-service)
