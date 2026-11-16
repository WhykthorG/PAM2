import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase/firebase';

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function cadastrar() {
    setErro('');
    setCarregando(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), senha);
    } catch (error) {
      const mensagens = {
        'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
        'auth/invalid-email': 'Informe um endereço de e-mail válido.',
        'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
      };
      setErro(mensagens[error.code] || 'Não foi possível criar sua conta. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.eyebrow}>CINECLUBE</Text>
          <Text style={styles.title}>Monte sua{ '\n' }coleção.</Text>
          <Text style={styles.subtitle}>Crie uma conta para começar seu catálogo.</Text>

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            accessibilityLabel="E-mail"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="voce@exemplo.com"
            placeholderTextColor="#858b94"
            style={styles.input}
            value={email}
          />
          <Text style={styles.label}>Senha</Text>
          <TextInput
            accessibilityLabel="Senha"
            autoCapitalize="none"
            onChangeText={setSenha}
            placeholder="Mínimo de 6 caracteres"
            placeholderTextColor="#858b94"
            secureTextEntry
            style={styles.input}
            value={senha}
          />

          {erro ? <Text accessibilityRole="alert" style={styles.error}>{erro}</Text> : null}
          <Pressable
            accessibilityRole="button"
            disabled={carregando || !email.trim() || senha.length < 6}
            onPress={cadastrar}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed, (carregando || !email.trim() || senha.length < 6) && styles.disabled]}
          >
            {carregando ? <ActivityIndicator color="#141414" /> : <Text style={styles.primaryText}>Criar conta</Text>}
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Login')} style={styles.linkButton}>
            <Text style={styles.linkText}>Já tem uma conta? <Text style={styles.linkStrong}>Entrar</Text></Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f1ea' },
  flex: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 26, width: '100%', maxWidth: 520, alignSelf: 'center' },
  eyebrow: { color: '#b5482f', fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 14 },
  title: { color: '#20211f', fontSize: 38, fontWeight: '800', lineHeight: 43 },
  subtitle: { color: '#62645f', fontSize: 16, lineHeight: 23, marginTop: 12, marginBottom: 34 },
  label: { color: '#30312e', fontSize: 14, fontWeight: '700', marginBottom: 8 },
  input: { backgroundColor: '#fffefa', borderColor: '#d8d3c8', borderWidth: 1, borderRadius: 8, color: '#20211f', fontSize: 16, paddingHorizontal: 14, paddingVertical: 13, marginBottom: 18 },
  error: { color: '#a12f24', fontSize: 14, marginBottom: 12 },
  primaryButton: { minHeight: 50, backgroundColor: '#d7673f', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  primaryText: { color: '#fffefa', fontSize: 16, fontWeight: '800' },
  pressed: { opacity: 0.82 },
  disabled: { opacity: 0.5 },
  linkButton: { alignItems: 'center', paddingVertical: 20 },
  linkText: { color: '#62645f', fontSize: 14 },
  linkStrong: { color: '#a8432d', fontWeight: '800' },
});