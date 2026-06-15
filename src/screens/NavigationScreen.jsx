import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../styles/tokens';
import { navigationMock } from '../data/mockData';

export default function NavigationScreen({ navigation }) {
  const { user, ordemAtiva, chegarLocal } = useApp();
  const [passoAtual, setPassoAtual] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const destino = ordemAtiva?.ocorrencia;

  const handleCheguei = () => {
    chegarLocal();
    navigation.navigate('Success');
  };

  const passo = navigationMock.passos[passoAtual];
  const distRestante = (navigationMock.distanciaTotal * (1 - progresso / 100)).toFixed(1);
  const tempoRestante = Math.round(navigationMock.tempoEstimado * (1 - progresso / 100));

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.initials ?? 'OP'}</Text>
          </View>
          <Text style={styles.headerBrand}>Motiva Field</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.btnSair}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Área do mapa mock */}
      <View style={styles.mapArea}>
        {/* Instrução */}
        <View style={styles.instrucaoCard}>
          <View style={styles.instrucaoIcon}>
            <Text style={{ color: '#FFF', fontSize: 20 }}>↑</Text>
          </View>
          <View>
            <Text style={styles.instrucaoLabel}>Próxima manobra</Text>
            <Text style={styles.instrucaoVal}>{passo?.instrucao ?? navigationMock.proximaManobra}</Text>
          </View>
        </View>

        {/* Mapa visual simulado */}
        <View style={styles.mapVisual}>
          {/* Fundo de mapa */}
          <View style={styles.mapGrid}>
            {[...Array(6)].map((_, i) => (
              <View key={i} style={styles.mapGridLine} />
            ))}
          </View>
          {/* Rota animada */}
          <View style={styles.rotaContainer}>
            <View style={[styles.rotaProgress, { height: `${progresso}%` }]} />
          </View>
          {/* Pin destino */}
          <View style={styles.pinDestino}>
            <Text style={{ fontSize: 24 }}>📍</Text>
            <Text style={styles.pinLabel}>KM {destino?.km}</Text>
          </View>
          {/* Posição atual */}
          <View style={[styles.pinAtual, { bottom: `${progresso}%` }]}>
            <View style={styles.pinAtualDot} />
          </View>
          {/* Progresso */}
          <View style={styles.progressoBadge}>
            <Text style={styles.progressoText}>{progresso}% concluído</Text>
          </View>
        </View>

        {/* Passos de navegação */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.passosScroll}>
          {navigationMock.passos.map((p, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.passoCard, passoAtual === i && styles.passoCardAtivo]}
              onPress={() => setPassoAtual(i)}
            >
              <Text style={[styles.passoNum, passoAtual === i && styles.passoNumAtivo]}>{i + 1}</Text>
              <Text style={[styles.passoText, passoAtual === i && styles.passoTextAtivo]}>
                {p.distancia}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Painel inferior */}
      <View style={styles.bottomPanel}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>DESTINO</Text>
            <Text style={styles.statVal}>KM {destino?.km}</Text>
          </View>
          <View style={[styles.statItem, styles.statBorder]}>
            <Text style={styles.statLabel}>TEMPO</Text>
            <Text style={styles.statVal}>{tempoRestante} min</Text>
          </View>
          <View style={[styles.statItem, styles.statBorder]}>
            <Text style={styles.statLabel}>DISTÂNCIA</Text>
            <Text style={styles.statVal}>{distRestante} km</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btnCheguei} onPress={handleCheguei}>
          <Text style={styles.btnChegueiText}>CHEGUEI AO LOCAL</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.branco },
  header: {
    backgroundColor: colors.branco,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
    borderBottomWidth: 0.5, borderBottomColor: colors.borda,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.roxo, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  headerBrand: { color: colors.roxo, fontSize: 15, fontWeight: '700' },
  btnSair: { color: colors.textoMuted, fontSize: 13 },
  mapArea: { flex: 1, backgroundColor: '#F0EEF8' },
  instrucaoCard: {
    margin: 16, backgroundColor: colors.branco,
    borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 0.5, borderColor: colors.borda,
  },
  instrucaoIcon: {
    width: 42, height: 42, borderRadius: 10,
    backgroundColor: colors.roxo, alignItems: 'center', justifyContent: 'center',
  },
  instrucaoLabel: { fontSize: 11, color: colors.textoMuted },
  instrucaoVal: { fontSize: 15, fontWeight: '700', color: colors.texto },
  mapVisual: {
    flex: 1, marginHorizontal: 16,
    backgroundColor: '#E8E4F8', borderRadius: 16,
    overflow: 'hidden', position: 'relative',
    alignItems: 'center',
  },
  mapGrid: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    flexDirection: 'row', justifyContent: 'space-around',
  },
  mapGridLine: {
    width: 0.5, backgroundColor: 'rgba(91,45,158,0.1)', flex: 1,
  },
  rotaContainer: {
    position: 'absolute', width: 8, top: 20, bottom: 20,
    backgroundColor: 'rgba(91,45,158,0.2)', borderRadius: 4,
  },
  rotaProgress: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: colors.roxo, borderRadius: 4,
  },
  pinDestino: {
    position: 'absolute', top: 16, alignItems: 'center',
  },
  pinLabel: {
    fontSize: 11, fontWeight: '700', color: colors.roxo,
    backgroundColor: 'white', paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: 6,
  },
  pinAtual: {
    position: 'absolute', alignItems: 'center', justifyContent: 'center',
  },
  pinAtualDot: {
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: colors.roxo,
    borderWidth: 3, borderColor: 'white',
  },
  progressoBadge: {
    position: 'absolute', bottom: 12,
    backgroundColor: colors.roxo, borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5,
  },
  progressoText: { color: 'white', fontSize: 12, fontWeight: '600' },
  passosScroll: { maxHeight: 70, paddingHorizontal: 12, marginTop: 8 },
  passoCard: {
    backgroundColor: 'white', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 10,
    marginRight: 8, alignItems: 'center', flexDirection: 'row', gap: 8,
    borderWidth: 0.5, borderColor: colors.borda,
  },
  passoCardAtivo: { backgroundColor: colors.roxo, borderColor: colors.roxo },
  passoNum: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: colors.roxoFundo, color: colors.roxo,
    fontSize: 11, fontWeight: '700', textAlign: 'center', lineHeight: 20,
  },
  passoNumAtivo: { backgroundColor: 'rgba(255,255,255,0.3)', color: 'white' },
  passoText: { fontSize: 12, color: colors.textoMuted },
  passoTextAtivo: { color: 'white' },
  bottomPanel: {
    backgroundColor: colors.branco,
    borderTopWidth: 0.5, borderTopColor: colors.borda, padding: 16,
  },
  statsRow: { flexDirection: 'row', marginBottom: 14 },
  statItem: { flex: 1, alignItems: 'center' },
  statBorder: { borderLeftWidth: 0.5, borderLeftColor: colors.borda },
  statLabel: { fontSize: 10, color: colors.textoMuted, textTransform: 'uppercase', letterSpacing: 0.6 },
  statVal: { fontSize: 18, fontWeight: '700', color: colors.texto, marginTop: 2 },
  btnCheguei: {
    backgroundColor: colors.roxo, borderRadius: 14, padding: 16, alignItems: 'center',
  },
  btnChegueiText: { color: '#FFF', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
});