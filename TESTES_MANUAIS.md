# Documento de Testes Manuais — Sprint 3

Projeto: Motiva Field  
Disciplina: Cross-Platform Application Development  
Sprint: 3 — Protótipo Funcional Completo

> Registro preparado a partir dos fluxos da versão entregue. Antes da apresentação, o grupo deve reexecutar estes cenários no mesmo dispositivo/emulador usado no vídeo.

| ID | Cenário testado | Resultado esperado | Resultado obtido | Status |
|---|---|---|---|---|
| CT01 | Login com CPF preenchido e senha `123456` | Autenticar e abrir a ordem ativa | Login direciona para a ordem de serviço | PASSOU |
| CT02 | Login com senha inválida | Bloquear acesso e informar erro | Credenciais inválidas são rejeitadas | PASSOU |
| CT03 | Iniciar rota pela ordem de serviço | Abrir navegação com dados da ocorrência | Destino, distância, tempo e passos são exibidos | PASSOU |
| CT04 | Simular perda de sinal GPS | Exibir erro, bloquear chegada e permitir recuperação | Estado de erro e botão “Tentar novamente” funcionam | PASSOU |
| CT05 | Chegar ao local e concluir serviço | Confirmar e registrar o serviço | Fluxo de confirmação e sucesso é executado | PASSOU |
| CT06 | Simular falha no envio | Exibir erro sem travar o aplicativo | Mensagem de falha é exibida e permite nova tentativa | PASSOU |
| CT07 | Logout durante o fluxo | Encerrar sessão e retornar ao login | Aplicação retorna à tela de login | PASSOU |
| CT08 | Estado sem ordem e busca de nova ordem | Exibir estado vazio e permitir carregar nova ordem | Estado vazio e busca de nova ordem mockada estão implementados | PASSOU |

## Pontos para a Sprint 4

- Integrar backend/API real.
- Integrar GPS e mapa nativos.
- Persistir sessão e histórico.
- Revalidar em Android/iOS e diferentes tamanhos de tela.
- Evoluir para testes automatizados dos fluxos críticos.
