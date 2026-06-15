import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, SafeAreaView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../styles/tokens';
import { statusColors } from '../data/mockData';

export default function WorkOrderScreen({ navigation }) {
  const { user, ordemAtiva, logout, iniciarNavegacao } = useApp();
  const oc = ordemAtiva?.ocorrencia;
  const status = statusColors[oc?.status] ?? statusColors.NORMAL;

  const handleIniciarRota = () => {
    iniciarNavegacao();
    navigation.navigate('Navigation');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.initials ?? 'OP'}</Text>
          </View>
          <Text style={styles.headerBrand}>Motiva Field</Text>
        </View>
        <TouchableOpacity onPress={() => { logout(); navigation.replace('Login'); }}>
          <Text style={styles.btnSair}>Sair</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.greeting}>
          <Text style={styles.greetSub}>Bem-vindo de volta,</Text>
          <Text style={styles.greetName}>Olá, {user?.name?.split(' ')[0] ?? 'Operador'}!</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.osLabel}>Ordem de Serviço Ativa</Text>
              <Text style={styles.osTitle}>Rodovia {oc?.rodovia},{'\n'}KM {oc?.km}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: status.bg }]}>
              <Text style={[styles.badgeText, { color: status.text }]}>{status.label}</Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCell}>
              <Text style={styles.statLabel}>Crescimento</Text>
              <Text style={[styles.statVal, { color: colors.vermelho }]}>{oc?.crescimento}</Text>
            </View>
            <View style={[styles.statCell, styles.statCellRight]}>
              <Text style={styles.statLabel}>Prioridade</Text>
              <Text style={[styles.statVal, { color: colors.vermelho }]}>Nível {oc?.prioridade}</Text>
            </View>
          </View>

          {/* Mapa mock visual */}
          <View style={styles.mapMock}>
            <View style={styles.mapRoad} />
            <View style={styles.mapPin}>
              <Text style={styles.mapPinText}>📍</Text>
            </View>
            <View style={styles.mapLabel}>
              <Text style={styles.mapLabelText}>{oc?.rodovia} · KM {oc?.km}</Text>
            </View>
            <Text style={styles.mapCoord}>
              {oc?.lat?.toFixed(4)}, {oc?.lng?.toFixed(4)}
            </Text>
          </View>

          <View style={styles.previsao}>
            <Text style={styles.previsaoText}>⏱ Previsão de conclusão: {oc?.previsaoConclusao}</Text>
          </View>

          <TouchableOpacity style={styles.btnPrimary} onPress={handleIniciarRota}>
            <Text style={styles.btnPrimaryText}>📍  INICIAR ROTA</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.cardRow]}>
          <View style={styles.cardRowLeft}>
            <View style={styles.condIcon}>
              <Text style={{ fontSize: 20 }}>🌤</Text>
            </View>
            <View>
              <Text style={styles.condTitle}>Condições Locais</Text>
              <Text style={styles.condSub}>
                {oc?.condicoesLocais?.temperatura}°C · {oc?.condicoesLocais?.clima} · {oc?.condicoesLocais?.umidadeRelativa}% UR
              </Text>
            </View>
          </View>
          <Text style={styles.arrow}>›</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Instruções de Segurança</Text>
          {ordemAtiva?.instrucoes?.map((inst, i) => (
            <View key={i} style={styles.instrucaoRow}>
              <Text style={styles.instrucaoNum}>{i + 1}</Text>
              <Text style={styles.instrucaoText}>{inst}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cinzaFundo },
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
  body: { flex: 1, padding: 16 },
  greeting: { marginBottom: 4 },
  greetSub: { color: colors.textoMuted, fontSize: 13 },
  greetName: { color: colors.texto, fontSize: 22, fontWeight: '700' },
  card: {
    backgroundColor: colors.branco, borderRadius: 16, padding: 16,
    marginTop: 14, borderWidth: 0.5, borderColor: colors.borda,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  osLabel: { fontSize: 10, color: colors.textoMuted, letterSpacing: 1, textTransform: 'uppercase' },
  osTitle: { color: colors.texto, fontSize: 20, fontWeight: '700', marginTop: 4 },
  badge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  statsGrid: {
    flexDirection: 'row', borderRadius: 10, overflow: 'hidden',
    backgroundColor: colors.borda, gap: 1, marginVertical: 12,
  },
  statCell: { flex: 1, backgroundColor: '#F8F8FC', padding: 10 },
  statLabel: { fontSize: 11, color: colors.textoMuted },
  statVal: { fontSize: 15, fontWeight: '600', marginTop: 2 },
  mapMock: {
    width: '100%', height: 160, borderRadius: 12,
    backgroundColor: '#2A5C3A', marginBottom: 12,
    overflow: 'hidden', alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  mapRoad: {
    position: 'absolute', top: 0, bottom: 0,
    width: 36, backgroundColor: 'rgba(61,26,110,0.6)',
  },
  mapPin: { zIndex: 2 },
  mapPinText: { fontSize: 32 },
  mapLabel: {
    position: 'absolute', bottom: 10, left: 10,
    backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  mapLabelText: { color: '#FFF', fontSize: 11 },
  mapCoord: {
    position: 'absolute', top: 10, right: 10,
    color: 'rgba(255,255,255,0.6)', fontSize: 10,
  },
  previsao: { marginBottom: 4 },
  previsaoText: { color: colors.textoMuted, fontSize: 13 },
  btnPrimary: {
    backgroundColor: colors.roxo, borderRadius: 14, padding: 16,
    alignItems: 'center', marginTop: 14,
  },
  btnPrimaryText: { color: '#FFF', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  cardRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  condIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: colors.roxoFundo, alignItems: 'center', justifyContent: 'center',
  },
  condTitle: { fontSize: 13, fontWeight: '500', color: colors.texto },
  condSub: { fontSize: 12, color: colors.textoMuted, marginTop: 2 },
  arrow: { color: '#CCC', fontSize: 18 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: colors.texto, marginBottom: 10 },
  instrucaoRow: { flexDirection: 'row', gap: 10, marginBottom: 8, alignItems: 'flex-start' },
  instrucaoNum: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: colors.roxoFundo, color: colors.roxo,
    fontSize: 12, fontWeight: '700', textAlign: 'center', lineHeight: 22,
  },
  instrucaoText: { flex: 1, fontSize: 13, color: colors.textoMuted, lineHeight: 18 },
});