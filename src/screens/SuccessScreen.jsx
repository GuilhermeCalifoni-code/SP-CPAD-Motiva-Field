import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, Alert, ActivityIndicator,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../styles/tokens';

export default function SuccessScreen({ navigation }) {
  const { user, ordemAtiva, concluirServico } = useApp();
  const [loading, setLoading] = useState(false);
  const [concluido, setConcluido] = useState(false);
  const oc = ordemAtiva?.ocorrencia;
  const agora = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

  const handleConcluir = () => {
    Alert.alert(
      'Confirmar Conclusão',
      'Tem certeza que o serviço foi concluído e o perímetro está seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          style: 'destructive',
          onPress: () => {
            setLoading(true);
            setTimeout(() => {
              concluirServico();
              setConcluido(true);
              setLoading(false);
              setTimeout(() => navigation.replace('Login'), 2000);
            }, 1000);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
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

      {/* Corpo */}
      <View style={styles.body}>
        {/* Anel de confirmação */}
        <View style={styles.ringOuter}>
          <View style={[styles.ringInner, concluido && styles.ringConcluido]}>
            <Text style={styles.checkIcon}>{concluido ? '✓' : '✓'}</Text>
          </View>
        </View>

        <Text style={styles.title}>
          {concluido
            ? 'REGISTRADO COM\nSUCESSO!'
            : `ROÇADA NO KM ${oc?.km}\nFINALIZADA?`}
        </Text>
        <Text style={styles.subtitle}>
          {concluido
            ? 'Serviço registrado no sistema. Aguarde nova ordem de serviço.'
            : 'Certifique-se de que todas as ferramentas foram recolhidas e o perímetro está seguro antes de confirmar.'}
        </Text>

        {/* Card de detalhamento */}
        {!concluido && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardIcon}>
                <Text style={{ fontSize: 18 }}>👷</Text>
              </View>
              <Text style={styles.cardTitle}>Detalhamento</Text>
            </View>
            <View style={styles.cardBody}>
              <DetailRow label="Frente de Serviço" value="Manutenção Rodoviária" />
              <DetailRow label="Localização" value={`${oc?.rodovia} · KM ${oc?.km}`} />
              <DetailRow label="Operador" value={`${user?.name} · Mat. ${user?.matricula}`} />
              <DetailRow label="Registrado em" value={agora} />
            </View>
          </View>
        )}
      </View>

      {/* Rodapé */}
      {!concluido && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.btnConcluido, loading && { opacity: 0.7 }]}
            onPress={handleConcluir}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#1A1A1A" />
              : <Text style={styles.btnConcluidoText}>SERVIÇO CONCLUÍDO</Text>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnVoltar}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.btnVoltarText}>VOLTAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

function DetailRow({ label, value }) {
  return (
    <View style={detailStyles.row}>
      <Text style={detailStyles.label}>{label}</Text>
      <Text style={detailStyles.value}>{value}</Text>
    </View>
  );
}

const detailStyles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  label: { fontSize: 12, color: colors.textoMuted, flex: 1 },
  value: { fontSize: 12, color: colors.texto, fontWeight: '500', flex: 2, textAlign: 'right' },
});

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
  body: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    padding: 20,
  },
  ringOuter: {
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: '#F5F9DC',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 28,
  },
  ringInner: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: colors.amarelo,
    alignItems: 'center', justifyContent: 'center',
  },
  ringConcluido: { backgroundColor: colors.verde },
  checkIcon: { fontSize: 44 },
  title: {
    fontSize: 20, fontWeight: '700', color: colors.texto,
    textAlign: 'center', marginBottom: 10,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 14, color: colors.textoMuted,
    textAlign: 'center', lineHeight: 22,
    maxWidth: 280, marginBottom: 4,
  },
  card: {
    width: '100%', marginTop: 20,
    backgroundColor: colors.branco,
    borderRadius: 16, padding: 16,
    borderWidth: 0.5, borderColor: colors.borda,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  cardIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: colors.roxoFundo,
    alignItems: 'center', justifyContent: 'center',
  },
  cardTitle: { fontSize: 13, fontWeight: '600', color: colors.texto },
  cardBody: { gap: 2 },
  footer: { padding: 16, paddingBottom: 32, gap: 4 },
  btnConcluido: {
    backgroundColor: colors.amarelo,
    borderRadius: 14, padding: 17,
    alignItems: 'center',
  },
  btnConcluidoText: { color: '#1A1A1A', fontSize: 16, fontWeight: '700', letterSpacing: 1 },
  btnVoltar: { alignItems: 'center', padding: 8 },
  btnVoltarText: { color: colors.roxo, fontSize: 14, fontWeight: '600' },
});
