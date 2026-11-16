import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const campos = [
  { key: 'titulo', label: 'Título', placeholder: 'Nome do filme' },
  { key: 'genero', label: 'Gênero', placeholder: 'Drama, comédia...' },
  { key: 'ano', label: 'Ano', placeholder: '2024', keyboardType: 'number-pad' },
  { key: 'nota', label: 'Nota (0 a 10)', placeholder: '8.5', keyboardType: 'decimal-pad' },
];

export default function FilmeForm({ initialValues = {}, submitLabel, onSubmit, erro, carregando }) {
  const [valores, setValores] = useState({
    titulo: initialValues.titulo || '',
    genero: initialValues.genero || '',
    ano: initialValues.ano == null ? '' : String(initialValues.ano),
    nota: initialValues.nota == null ? '' : String(initialValues.nota),
    descricao: initialValues.descricao || '',
  });

  function atualizar(campo, valor) {
    setValores((atuais) => ({ ...atuais, [campo]: valor }));
  }

  async function enviar() {
    const ano = valores.ano.trim() ? Number(valores.ano) : null;
    const nota = valores.nota.trim() ? Number(valores.nota.replace(',', '.')) : null;
    if (!valores.titulo.trim()) {
      onSubmit({ erroValidacao: 'Informe o título do filme.' });
      return;
    }
    if ((ano !== null && (!Number.isInteger(ano) || ano < 1888 || ano > 2100)) ||
      (nota !== null && (Number.isNaN(nota) || nota < 0 || nota > 10))) {
      onSubmit({ erroValidacao: 'Confira o ano e a nota informados.' });
      return;
    }
    await onSubmit({
      titulo: valores.titulo.trim(),
      genero: valores.genero.trim(),
      ano,
      nota,
      descricao: valores.descricao.trim(),
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.eyebrow}>SUA COLEÇÃO</Text>
      <Text style={styles.title}>{submitLabel === 'Salvar filme' ? 'Novo filme' : 'Editar filme'}</Text>
      <Text style={styles.subtitle}>Guarde os detalhes para encontrar este título depois.</Text>

      {campos.map((campo) => (
        <View key={campo.key}>
          <Text style={styles.label}>{campo.label}</Text>
          <TextInput
            keyboardType={campo.keyboardType || 'default'}
            onChangeText={(valor) => atualizar(campo.key, valor)}
            placeholder={campo.placeholder}
            placeholderTextColor="#858b94"
            style={styles.input}
            value={valores[campo.key]}
          />
        </View>
      ))}

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        multiline
        onChangeText={(valor) => atualizar('descricao', valor)}
        placeholder="Uma observação sobre o filme"
        placeholderTextColor="#858b94"
        style={[styles.input, styles.description]}
        textAlignVertical="top"
        value={valores.descricao}
      />

      {erro ? <Text accessibilityRole="alert" style={styles.error}>{erro}</Text> : null}
      <Pressable
        accessibilityRole="button"
        disabled={carregando}
        onPress={enviar}
        style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed, carregando && styles.disabled]}
      >
        {carregando ? <ActivityIndicator color="#fffefa" /> : <Text style={styles.primaryText}>{submitLabel}</Text>}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24, paddingBottom: 40, width: '100%', maxWidth: 620, alignSelf: 'center' },
  eyebrow: { color: '#b5482f', fontSize: 12, fontWeight: '800', letterSpacing: 2, marginTop: 10, marginBottom: 10 },
  title: { color: '#20211f', fontSize: 32, fontWeight: '800' },
  subtitle: { color: '#62645f', fontSize: 15, lineHeight: 22, marginTop: 8, marginBottom: 24 },
  label: { color: '#30312e', fontSize: 14, fontWeight: '700', marginBottom: 8 },
  input: { backgroundColor: '#fffefa', borderColor: '#d8d3c8', borderWidth: 1, borderRadius: 8, color: '#20211f', fontSize: 16, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 18 },
  description: { minHeight: 110 },
  error: { color: '#a12f24', fontSize: 14, marginBottom: 14 },
  primaryButton: { minHeight: 50, backgroundColor: '#b5482f', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#fffefa', fontSize: 16, fontWeight: '800' },
  pressed: { opacity: 0.82 },
  disabled: { opacity: 0.5 },
});