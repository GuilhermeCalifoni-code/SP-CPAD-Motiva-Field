import React, { createContext, useContext, useReducer } from 'react';
import { ordemServico, currentUser, occurrences } from '../data/mockData';

const AppContext = createContext(null);

function buildOrdem(occurrence, seq) {
  return {
    ...ordemServico,
    id: `os-mock-${occurrence.id}`,
    numero: `OS-2026-${String(seq).padStart(4, '0')}`,
    ocorrencia: occurrence,
  };
}

const initialState = {
  user: null,
  isAuthenticated: false,
  ordemAtiva: null,
  servicoConcluido: false,
  navegacaoAtiva: false,
  ordemIndex: 0,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN': {
      const cicloVazio = state.ordemIndex > 0 && state.ordemIndex % occurrences.length === 0;
      const precisaNovaOrdem = !state.ordemAtiva && !cicloVazio;
      const novaOrdem = precisaNovaOrdem
        ? buildOrdem(occurrences[state.ordemIndex % occurrences.length], state.ordemIndex + 1)
        : state.ordemAtiva;
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        ordemAtiva: novaOrdem,
        ordemIndex: precisaNovaOrdem ? state.ordemIndex + 1 : state.ordemIndex,
      };
    }
    case 'LOGOUT':
      return { ...initialState, ordemIndex: state.ordemIndex };
    case 'INICIAR_NAVEGACAO':
      return { ...state, navegacaoAtiva: true };
    case 'CHEGAR_LOCAL':
      return { ...state, navegacaoAtiva: false };
    case 'CONCLUIR_SERVICO':
      return { ...state, servicoConcluido: true, ordemAtiva: null };
    case 'NOVA_ORDEM':
      return { ...state, servicoConcluido: false, ordemAtiva: action.payload };
    case 'BUSCAR_NOVA_ORDEM':
      return {
        ...state,
        servicoConcluido: false,
        ordemAtiva: buildOrdem(occurrences[state.ordemIndex % occurrences.length], state.ordemIndex + 1),
        ordemIndex: state.ordemIndex + 1,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = (cpf, senha) => {
    if (cpf && senha === '123456') {
      dispatch({ type: 'LOGIN', payload: currentUser });
      return true;
    }
    return false;
  };

  const logout = () => dispatch({ type: 'LOGOUT' });
  const iniciarNavegacao = () => dispatch({ type: 'INICIAR_NAVEGACAO' });
  const chegarLocal = () => dispatch({ type: 'CHEGAR_LOCAL' });
  const concluirServico = () => dispatch({ type: 'CONCLUIR_SERVICO' });
  const buscarNovaOrdem = () => dispatch({ type: 'BUSCAR_NOVA_ORDEM' });

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        iniciarNavegacao,
        chegarLocal,
        concluirServico,
        buscarNovaOrdem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de AppProvider');
  return ctx;
};
