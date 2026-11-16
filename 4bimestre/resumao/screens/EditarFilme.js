import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

import { db } from '../firebase/firebase';
import FilmeForm from './FilmeForm';

export default function EditarFilme({ navigation, route }) {
  const filme = route.params?.filme;
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function salvar(atualizacao) {
    if (atualizacao.erroValidacao) {
      setErro(atualizacao.erroValidacao);
      return;
    }
    if (!filme?.id) {
      setErro('Não foi possível identificar este filme.');
      return;
    }
    setErro('');
    setCarregando(true);
    try {
      await updateDoc(doc(db, 'filmes', filme.id), {
        ...atualizacao,
        atualizadoEm: serverTimestamp(),
      });
      navigation.goBack();
    } catch {
      setErro('Não foi possível atualizar o filme. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FilmeForm
        carregando={carregando}
        erro={erro}
        initialValues={filme}
        onSubmit={salvar}
        submitLabel="Atualizar filme"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: '#f4f1ea' } });