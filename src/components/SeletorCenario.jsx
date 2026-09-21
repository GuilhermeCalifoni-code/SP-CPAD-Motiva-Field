import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { CENARIOS, getCenario, setCenario } from '../data/mockService';
import { colors, spacing, radius } from '../styles/tokens';

const ROTULOS = {
  [CENARIOS.NORMAL]:    'Dados normais',
  [CENARIOS.VAZIO]:     'Sem registros',
  [CENARIOS.ERRO_REDE]: 'Erro de conexão',
  [CENARIOS.LENTO]:     'Conexão lenta',
};

export default function SeletorCenario({ aoTrocar }) {
  const [aberto, setAberto] = useState(false);
  const [atual, setAtual] = useState(getCenario());

  const escolher = (c) => {
    setCenario(c);
    setAtual(c);
    setAberto(false);
    aoTrocar?.(c);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setAberto(true)} style={s.chip} activeOpacity={0.8}>
        <Text style={s.chipTexto}>🧪</Text>
      </TouchableOpacity>

      <Modal visible={aberto} transparent animationType="fade" onRequestClose={() => setAberto(false)}>
        <TouchableOpacity style={s.fundo} activeOpacity={1} onPress={() => setAberto(false)}>
          <View style={s.caixa}>
            <Text style={s.titulo}>Cenário de teste</Text>
            {Object.values(CENARIOS).map((c) => (
              <TouchableOpacity key={c} style={s.item} onPress={() => escolher(c)}>
                <Text style={[s.itemTexto, atual === c && s.itemAtivo]}>
                  {atual === c ? '● ' : '○ '}{ROTULOS[c]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const s = StyleSheet.create({
  chip: {
    width: 34, height: 34, borderRadius: radius.full,
    backgroundColor: colors.roxoFundo, alignItems: 'center', justifyContent: 'center',
  },
  chipTexto: { fontSize: 16 },
  fundo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center' },
  caixa: {
    backgroundColor: colors.branco, borderRadius: radius.lg,
    padding: spacing.xl, width: 260,
  },
  titulo: {
    fontSize: 13, fontWeight: '700', color: colors.textoMuted,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.lg,
  },
  item: { paddingVertical: spacing.md },
  itemTexto: { fontSize: 15, color: colors.texto },
  itemAtivo: { color: colors.roxo, fontWeight: '700' },
});