import React, { createContext, useContext, useReducer } from 'react';
import { ordemServico, currentUser } from '../data/mockData';

const AppContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
  ordemAtiva: ordemServico,
  servicoConcluido: false,
  navegacaoAtiva: false,
  ultimoProtocolo: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...initialState };
    case 'SELECIONAR_OCORRENCIA':
      // Fluxo alternativo: o operador escolhe outra ocorrência da lista
      return {
        ...state,
        ordemAtiva: { ...ordemServico, ocorrencia: action.payload },
        servicoConcluido: false,
      };
    case 'INICIAR_NAVEGACAO':
      return { ...state, navegacaoAtiva: true };
    case 'CHEGAR_LOCAL':
      return { ...state, navegacaoAtiva: false };
    case 'CONCLUIR_SERVICO':
      // A ordem NÃO é apagada: zerá-la deixava a tela anterior com campos vazios.
      return { ...state, servicoConcluido: true, ultimoProtocolo: action.payload ?? null };
    case 'NOVA_ORDEM':
      return { ...state, servicoConcluido: false, ordemAtiva: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = (cpf, senha) => {
    if (cpf && senha) {
      dispatch({ type: 'LOGIN', payload: currentUser });
      return true;
    }
    return false;
  };

  const valor = {
    ...state,
    login,
    logout:               () => dispatch({ type: 'LOGOUT' }),
    selecionarOcorrencia: (oc) => dispatch({ type: 'SELECIONAR_OCORRENCIA', payload: oc }),
    iniciarNavegacao:     () => dispatch({ type: 'INICIAR_NAVEGACAO' }),
    chegarLocal:          () => dispatch({ type: 'CHEGAR_LOCAL' }),
    concluirServico:      (protocolo) => dispatch({ type: 'CONCLUIR_SERVICO', payload: protocolo }),
  };

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de AppProvider');
  return ctx;
};