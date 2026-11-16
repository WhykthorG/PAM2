import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { auth, db } from '../firebase/firebase';
import FilmeForm from './FilmeForm';

export default function CriarFilme({ navigation }) {
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function salvar(filme) {
    if (filme.erroValidacao) {
      setErro(filme.erroValidacao);
      return;
    }
    const usuario = auth.currentUser;
    if (!usuario) {
      setErro('Sua sessão expirou. Entre novamente.');
      return;
    }
    setErro('');
    setCarregando(true);
    try {
      await addDoc(collection(db, 'filmes'), {
        ...filme,
        ownerId: usuario.uid,
        criadoEm: serverTimestamp(),
        atualizadoEm: serverTimestamp(),
      });
      navigation.goBack();
    } catch {
      setErro('Não foi possível salvar o filme. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FilmeForm
        carregando={carregando}
        erro={erro}
        onSubmit={salvar}
        submitLabel="Salvar filme"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: '#f4f1ea' } });