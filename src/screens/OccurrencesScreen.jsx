import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, RefreshControl,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { buscarOcorrencias } from '../data/mockService';
import { statusColors } from '../data/mockData';
import { colors, spacing, radius } from '../styles/tokens';
import { EstadoCarregando, EstadoVazio, EstadoErro } from '../components/Estados';
import SeletorCenario from '../components/SeletorCenario';

export default function OccurrencesScreen({ navigation }) {
  const { selecionarOcorrencia } = useApp();
  const [resposta, setResposta] = useState(null);
  const [atualizando, setAtualizando] = useState(false);

  const carregar = useCallback(async () => {
    setResposta(null);
    setResposta(await buscarOcorrencias());
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  const puxarParaAtualizar = async () => {
    setAtualizando(true);
    setResposta(await buscarOcorrencias());
    setAtualizando(false);
  };

  const abrir = (oc) => {
    selecionarOcorrencia(oc);
    navigation.navigate('WorkOrder');
  };

  const renderItem = ({ item }) => {
    const st = statusColors[item.status] ?? statusColors.NORMAL;
    return (
      <TouchableOpacity style={s.card} onPress={() => abrir(item)} activeOpacity={0.85}>
        <View style={s.cardTopo}>
          <Text style={s.rodovia}>{item.rodovia} · KM {item.km}</Text>
          <View style={[s.badge, { backgroundColor: st.bg }]}>
            <Text style={[s.badgeTexto, { color: st.text }]}>{st.label}</Text>
          </View>
        </View>
        <Text style={s.descricao}>{item.descricao}</Text>
        <View style={s.rodape}>
          <Text style={s.meta}>Crescimento {item.crescimento}</Text>
          <Text style={s.meta}>Prev. {item.previsaoConclusao}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const corpo = () => {
    if (!resposta) return <EstadoCarregando mensagem="Buscando ocorrências..." />;
    if (resposta.estado === 'ERRO')
      return <EstadoErro mensagem={resposta.mensagem} aoTentarNovamente={carregar} />;
    if (resposta.estado === 'VAZIO')
      return <EstadoVazio mensagem={resposta.mensagem} icone="🌱" rotuloAcao="Atualizar" aoTocar={carregar} />;

    return (
      <FlatList
        data={resposta.dados}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: spacing.lg }}
        refreshControl={<RefreshControl refreshing={atualizando} onRefresh={puxarParaAtualizar} tintColor={colors.roxo} />}
      />
    );
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.voltar}>‹ Voltar</Text>
        </TouchableOpacity>
        <Text style={s.titulo}>Ocorrências</Text>
        <SeletorCenario aoTrocar={carregar} />
      </View>
      {corpo()}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cinzaFundo },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
    backgroundColor: colors.branco, borderBottomWidth: 1, borderBottomColor: colors.borda,
  },
  voltar: { color: colors.roxo, fontSize: 15, fontWeight: '600' },
  titulo: { fontSize: 16, fontWeight: '700', color: colors.texto },
  card: {
    backgroundColor: colors.cinzaCard, borderRadius: radius.lg,
    padding: spacing.lg, marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.borda,
  },
  cardTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  rodovia: { fontSize: 16, fontWeight: '700', color: colors.texto },
  badge: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radius.full },
  badgeTexto: { fontSize: 10, fontWeight: '700' },
  descricao: { marginTop: spacing.sm, fontSize: 14, color: colors.textoMuted, lineHeight: 20 },
  rodape: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md },
  meta: { fontSize: 12, color: colors.textoMuted },
});