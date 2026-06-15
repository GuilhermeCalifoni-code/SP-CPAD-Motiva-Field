import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, KeyboardAvoidingView,
  Platform, Alert, ActivityIndicator,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../styles/tokens';

export default function LoginScreen({ navigation }) {
  const { login } = useApp();
  const [cpf, setCpf]     = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  const formatCpf = (text) => {
    const nums = text.replace(/\D/g, '').slice(0, 11);
    return nums
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleLogin = async () => {
    if (!cpf || !senha) {
      Alert.alert('Campos obrigatórios', 'Preencha CPF e senha para continuar.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const ok = login(cpf, senha);
      setLoading(false);
      if (ok) {
        navigation.replace('WorkOrder');
      } else {
        Alert.alert('Erro', 'CPF ou senha inválidos.');
      }
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Logo */}
        <View style={styles.logoArea}>
          <View style={styles.logoBox}>
            <Text style={styles.logoIcon}>▲</Text>
          </View>
          <Text style={styles.title}>Bem-vindo ao{'\n'}Monitoramento Integrado</Text>
          <Text style={styles.subtitle}>CCR Motiva · Gestão de Vegetação</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu CPF"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={cpf}
              onChangeText={(t) => setCpf(formatCpf(t))}
              keyboardType="numeric"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="••••••••"
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!showSenha}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowSenha(!showSenha)}
              >
                <Text style={styles.eyeIcon}>{showSenha ? '👁' : '👁‍🗨'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgot}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnEntrar, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color="#1A1A1A" />
              : <Text style={styles.btnEntrarText}>ENTRAR</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnBio} onPress={handleLogin}>
            <Text style={styles.btnBioText}>⬡ Acessar com Biometria / FaceID</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>© CCR Motiva · Gestão de Vegetação</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#2A0A5E' },
  container: {
    flex: 1,
    backgroundColor: '#3D1A6E',
    paddingHorizontal: 28,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },
  logoArea: { alignItems: 'center', marginTop: 20 },
  logoBox: {
    width: 64, height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(200,240,0,0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(200,240,0,0.4)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
  },
  logoIcon: { fontSize: 28, color: '#C8F000' },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    marginTop: 6,
  },
  form: { gap: 14 },
  inputGroup: { gap: 6 },
  label: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 15,
  },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  eyeBtn: {
    position: 'absolute', right: 14,
    height: '100%', justifyContent: 'center',
  },
  eyeIcon: { fontSize: 18 },
  forgot: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    textAlign: 'right',
  },
  btnEntrar: {
    backgroundColor: colors.amarelo,
    borderRadius: 14,
    padding: 17,
    alignItems: 'center',
    marginTop: 8,
  },
  btnEntrarText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  btnBio: { alignItems: 'center', paddingVertical: 8 },
  btnBioText: { color: 'rgba(255,255,255,0.4)', fontSize: 13 },
  footer: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 11,
    textAlign: 'center',
  },
});
