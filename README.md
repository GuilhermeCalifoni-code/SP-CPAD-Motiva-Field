# 🌿 Motiva Field

App mobile para monitoramento e gestão de vegetação em rodovias — CCR Motiva.

**Sprint 3 · Cross-Platform Application Development · FIAP 2026**
Prof. Hercules Lima

---

## 👥 Integrantes

| Nome | RM |
|---|---|
| Guilherme Domingues Califoni | 565157 |
| Enzo Ribeiro Domingues Piazentin | 564216 |
| Bento Donato Garcia | 561621 |
| Lucas Mendes | 563667 |
| Antonio Lucas Santana Tavares| 565516 |
| Gustavo Schimith | 564800 |

---

## 📱 Sobre o Projeto

O **Motiva Field** é o app mobile para operadores de campo da CCR Motiva. O operador recebe ordens de serviço com localização GPS exata, navega até o ponto de intervenção e confirma a conclusão do serviço — tudo de forma digital, substituindo processos manuais em papel.

### Fluxo Principal
```
Login → Ordem de Serviço → Navegação Guiada → Confirmação
```

---

## 🗂️ Estrutura do Projeto

```
motiva-field/
├── App.jsx                         # Raiz — Provider + Navigator
├── app.json                        # Configuração Expo
├── package.json
└── src/
    ├── context/
    │   └── AppContext.jsx          # Context API + useReducer (estado global)
    ├── data/
    │   └── mockData.js             # 🗃️ Todos os mocks da Sprint 2
    ├── navigation/
    │   └── AppNavigator.jsx        # Stack Navigator (4 telas)
    ├── screens/
    │   ├── LoginScreen.jsx         # Tela 1 — Autenticação
    │   ├── WorkOrderScreen.jsx     # Tela 2 — Ordem de Serviço
    │   ├── NavigationScreen.jsx    # Tela 3 — Navegação GPS
    │   └── SuccessScreen.jsx       # Tela 4 — Confirmação
    └── styles/
        └── tokens.js               # Design tokens (cores, espaçamentos)
```

---

## 🗃️ Mock de Dados (`src/data/mockData.js`)

Os mocks simulam dados reais do sistema Motiva/CCR:

| Export | Descrição |
|---|---|
| `currentUser` | Operador logado (Carlos Almeida, Mat. 4471) |
| `occurrences` | 3 ocorrências em SP-270, SP-330 e BR-101 com NDVI, coordenadas GPS, status CRÍTICO/ALERTA/NORMAL |
| `vegetacaoTrechos` | 4 trechos com índice NDVI, risco e datas de roçada |
| `historicoIntervencoes` | 4 intervenções registradas com operador, duração e status |
| `ordemServico` | OS ativa com instruções de segurança e equipamentos |
| `navigationMock` | Rota mockada com passos de navegação, tempo e distância |
| `statusColors` | Mapeamento visual de status → cores |

**Os dados são realistas**: rodovias reais da CCR (SP-270 Raposo Tavares, SP-330 Anhanguera, BR-101), KMs específicos, índices NDVI entre 0.30–0.82, condições climáticas e previsões de roçada baseadas em sazonalidade.

---

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- App **Expo Go** no celular (iOS ou Android)

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/GuilhermeCalifoni-code/SP-CPAD-Motiva-Field.git
cd SP-CPAD-Motiva-Field

# 2. Instalar dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npx expo start

# 4. Escanear o QR Code com o app Expo Go
```

### Rodando em Emulador

```bash
# Android
npx expo start --android

# iOS (apenas macOS)
npx expo start --ios
```

---

## 🎨 Design

- **Paleta**: Roxo escuro `#3D1A6E` + Amarelo-verde `#C8F000` (identidade visual CCR Motiva)
- **Tipografia**: Sora (títulos) + Inter (corpo)
- **Estilização**: React Native `StyleSheet` nativo — sem bibliotecas de UI

---

## 🔌 Recursos Nativos Utilizados

| Recurso | Uso |
|---|---|
| **GPS / Location** | Navegação simulada — preparada para integração com `expo-location` na Sprint 4 |
| **MapView** | Mapa visual mockado — preparado para integração com `react-native-maps` na Sprint 4 |
| **Context API** | Estado global de autenticação e ordem de serviço |

---

## 📋 Decisões Técnicas

- **Context API + useReducer**: gerenciamento de estado global sem Redux, adequado para o escopo do app
- **Mock em JS puro**: dados estruturados em `mockData.js`, prontos para substituição por chamadas de API/backend na Sprint 4
- **Stack Navigator**: navegação linear que reflete o fluxo real do operador (Login → OS → Nav → Confirmação)
- **StyleSheet nativo**: máxima performance em dispositivos de campo (sem overhead de bibliotecas)

---

## ✅ Status das Funcionalidades — Sprint 3

| Funcionalidade | Status | Observação |
|---|---|---|
| Login | ✅ Concluído | Fluxos de sucesso e erro com dados mockados |
| Ordem de serviço | ✅ Concluído | Exibe ocorrência, risco, condições e instruções |
| Estado sem ordem | ✅ Concluído | Tela vazia com busca de nova ordem mockada |
| Navegação guiada | ✅ Concluído | Passos, progresso, tempo e distância simulados |
| Erro de GPS | ✅ Concluído | Estado de erro e recuperação simulados |
| Confirmação do serviço | ✅ Concluído | Confirmação, loading e sucesso |
| Falha no envio | ✅ Concluído | Estado de erro simulado sem interromper o app |
| Logout | ✅ Concluído | Retorna ao login em todos os fluxos |
| Integração com API real | ⏳ Sprint 4 | Atualmente substituída por mocks |
| GPS real / MapView | ⏳ Sprint 4 | Nesta Sprint a navegação é simulada visualmente |

## 🧪 Testes Manuais

Os testes da Sprint 3 estão documentados em [`TESTES_MANUAIS.md`](./TESTES_MANUAIS.md), cobrindo login, ordem de serviço, navegação, erro de GPS, conclusão, falha de envio, logout e estado vazio.

## 🔧 Pendências e Plano para a Sprint 4

1. Integrar a aplicação ao backend/API definitiva quando disponível.
2. Substituir o GPS e o mapa simulados por recursos nativos reais.
3. Persistir autenticação e histórico de ordens.
4. Ampliar validações, acessibilidade e testes em dispositivos físicos.
5. Criar testes automatizados para os fluxos críticos.

## 🔗 Links

- **Repositório**: https://github.com/GuilhermeCalifoni-code/SP-CPAD-Motiva-Field
- **Vídeo Demo**: https://youtu.be/6ueYJ6vzVAQ?is=AmVvLxJH_DKuP3c3
- **Protótipo Figma**: https://canva.link/4zdkrv69yrsgorr

---

> Motiva Field · Sprint 3 · FIAP 2026 · CCR Motiva
