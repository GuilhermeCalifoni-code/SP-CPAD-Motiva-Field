import React, { createContext, useContext, useReducer } from 'react';
import { ordemServico, currentUser } from '../data/mockData';

const AppContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
  ordemAtiva: ordemServico,
  servicoConcluido: false,
  navegacaoAtiva: false,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...initialState };
    case 'INICIAR_NAVEGACAO':
      return { ...state, navegacaoAtiva: true };
    case 'CHEGAR_LOCAL':
      return { ...state, navegacaoAtiva: false };
    case 'CONCLUIR_SERVICO':
      return { ...state, servicoConcluido: true, ordemAtiva: null };
    case 'NOVA_ORDEM':
      return { ...state, servicoConcluido: false, ordemAtiva: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = (cpf, senha) => {
    // Mock: qualquer senha válida loga como currentUser
    if (cpf && senha) {
      dispatch({ type: 'LOGIN', payload: currentUser });
      return true;
    }
    return false;
  };

  const logout = () => dispatch({ type: 'LOGOUT' });
  const iniciarNavegacao = () => dispatch({ type: 'INICIAR_NAVEGACAO' });
  const chegarLocal = () => dispatch({ type: 'CHEGAR_LOCAL' });
  const concluirServico = () => dispatch({ type: 'CONCLUIR_SERVICO' });

  return (
    <AppContext.Provider value={{ ...state, login, logout, iniciarNavegacao, chegarLocal, concluirServico }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp deve ser usado dentro de AppProvider');
  return ctx;
};
