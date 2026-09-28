import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

export default function Login({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.gridOverlay} />

          <View style={styles.card}>
            <View style={styles.badgeRow}>
              <Text style={styles.badge}>SCIENCE</Text>
            </View>

            <View style={styles.illustrationWrap}>
              <View style={styles.glowOne} />
              <View style={styles.glowTwo} />
              <View style={styles.glowThree} />
              <Image
                source={{
                  uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
                }}
                style={styles.image}
              />
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.title}>Bem-vindo</Text>
              <Text style={styles.subtitle}>Faça login para continuar</Text>

              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="fulano@hotmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#7dd3fc"
              />

              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="abc@123"
                secureTextEntry
                placeholderTextColor="#7dd3fc"
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#020617',
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020617',
    padding: 22,
    minHeight: '100%',
    position: 'relative',
  },
  gridOverlay: {
    position: 'absolute',
    width: '140%',
    height: '140%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1e293b',
    opacity: 0.18,
    transform: [{ rotate: '12deg' }],
  },
  card: {
    width: '100%',
    maxWidth: 390,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#22d3ee',
    padding: 18,
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 10,
  },
  badgeRow: {
    marginBottom: 18,
    alignItems: 'flex-start',
  },
  badge: {
    fontSize: 11,
    letterSpacing: 2.5,
    color: '#dbeafe',
    fontWeight: '900',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#22d3ee',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  illustrationWrap: {
    position: 'relative',
    height: 210,
    borderRadius: 28,
    backgroundColor: '#0b1220',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 18,
  },
  glowOne: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#38bdf8',
    opacity: 0.2,
    right: -25,
    top: -35,
  },
  glowTwo: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#a78bfa',
    opacity: 0.25,
    left: -35,
    bottom: -35,
  },
  glowThree: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#22d3ee',
    opacity: 0.18,
    right: 40,
    bottom: 20,
  },
  image: {
    width: 155,
    height: 155,
    borderRadius: 77,
    borderWidth: 4,
    borderColor: '#e0f2fe',
    backgroundColor: '#f8fafc',
    zIndex: 1,
  },
  formContainer: {
    backgroundColor: '#020617',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#e0f2fe',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#bae6fd',
    marginBottom: 22,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#dbeafe',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0b1220',
    borderWidth: 1,
    borderColor: '#1d4ed8',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#f8fafc',
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  button: {
    backgroundColor: '#22d3ee',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 18,
    elevation: 5,
  },
  buttonText: {
    color: '#06131f',
    fontSize: 16,
    fontWeight: '900',
  },
});