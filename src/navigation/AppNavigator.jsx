import React, { useState, useCallback, useMemo } from 'react';
import LoginScreen       from '../screens/LoginScreen';
import WorkOrderScreen   from '../screens/WorkOrderScreen';
import NavigationScreen  from '../screens/NavigationScreen';
import SuccessScreen     from '../screens/SuccessScreen';
import OccurrencesScreen from '../screens/OccurrencesScreen';
import HistoryScreen     from '../screens/HistoryScreen';

const TELAS = {
  Login:       LoginScreen,
  WorkOrder:   WorkOrderScreen,
  Navigation:  NavigationScreen,
  Success:     SuccessScreen,
  Occurrences: OccurrencesScreen,
  History:     HistoryScreen,
};

export default function AppNavigator() {
  // Pilha de verdade: o goBack anterior voltava sempre para o Login,
  // o que quebrava a volta da tela de navegação para a ordem de serviço.
  const [pilha, setPilha] = useState([{ nome: 'Login', params: {} }]);
  const atual = pilha[pilha.length - 1];

  const navigation = useMemo(() => ({
    navigate: (nome, params = {}) => setPilha((p) => [...p, { nome, params }]),
    replace:  (nome, params = {}) => setPilha((p) => [...p.slice(0, -1), { nome, params }]),
    goBack:   () => setPilha((p) => (p.length > 1 ? p.slice(0, -1) : p)),
    reset:    (nome, params = {}) => setPilha([{ nome, params }]),
    podeVoltar: pilha.length > 1,
  }), [pilha.length]);

  const Tela = TELAS[atual.nome] ?? LoginScreen; // nunca renderiza vazio
  return <Tela navigation={navigation} route={{ params: atual.params }} />;
} 