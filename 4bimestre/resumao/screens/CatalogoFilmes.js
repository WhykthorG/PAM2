import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import { auth, db } from '../firebase/firebase';

function FilmeCard({ filme, onEdit }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Editar ${filme.titulo}`}
      onPress={onEdit}
      style={({ pressed }) => [styles.filmCard, pressed && styles.pressed]}
    >
      <View style={styles.cardTop}>
        <Text style={styles.genre}>{filme.genero || 'FILME'}</Text>
        {filme.nota != null ? <Text style={styles.rating}>★ {filme.nota}</Text> : null}
      </View>
      <Text style={styles.filmTitle}>{filme.titulo}</Text>
      {filme.ano ? <Text style={styles.year}>{filme.ano}</Text> : null}
      {filme.descricao ? <Text numberOfLines={3} style={styles.description}>{filme.descricao}</Text> : null}
      <Text style={styles.editHint}>Toque para editar</Text>
    </Pressable>
  );
}

export default function CatalogoFilmes({ navigation }) {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const usuario = auth.currentUser;

  useEffect(() => {
    if (!usuario) {
      setCarregando(false);
      return undefined;
    }
    const filmesDoUsuario = query(
      collection(db, 'filmes'),
      where('ownerId', '==', usuario.uid),
    );
    return onSnapshot(
      filmesDoUsuario,
      (snapshot) => {
        setFilmes(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
        setErro('');
        setCarregando(false);
      },
      () => {
        setErro('Não foi possível carregar o catálogo. Verifique a conexão e as regras do Firestore.');
        setCarregando(false);
      },
    );
  }, [usuario]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={filmes}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={carregando ? (
          <ActivityIndicator color="#b5482f" style={styles.loader} />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Sua coleção começa aqui.</Text>
            <Text style={styles.emptyText}>Adicione um filme para montar seu catálogo pessoal.</Text>
          </View>
        )}
        ListHeaderComponent={(
          <View>
            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>CINECLUBE</Text>
                <Text style={styles.heading}>Meus filmes</Text>
              </View>
              <Pressable accessibilityRole="button" onPress={() => signOut(auth)} hitSlop={10}>
                <Text style={styles.signOut}>Sair</Text>
              </Pressable>
            </View>
            <View style={styles.summary}>
              <Text style={styles.summaryNumber}>{filmes.length}</Text>
              <Text style={styles.summaryLabel}>{filmes.length === 1 ? 'filme na coleção' : 'filmes na coleção'}</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.navigate('CriarFilme')}
              style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
            >
              <Text style={styles.addButtonText}>+  Adicionar filme</Text>
            </Pressable>
            {erro ? <Text accessibilityRole="alert" style={styles.error}>{erro}</Text> : null}
            {filmes.length > 0 ? <Text style={styles.sectionTitle}>CATÁLOGO</Text> : null}
          </View>
        )}
        renderItem={({ item }) => (
          <FilmeCard filme={item} onEdit={() => navigation.navigate('EditarFilme', { filme: item })} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f4f1ea' },
  listContent: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 18, paddingBottom: 32, width: '100%', maxWidth: 760, alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  eyebrow: { color: '#b5482f', fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 5 },
  heading: { color: '#20211f', fontSize: 30, fontWeight: '800' },
  signOut: { color: '#6d6e68', fontSize: 14, fontWeight: '700', padding: 8 },
  summary: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#d8d3c8', paddingVertical: 16, flexDirection: 'row', alignItems: 'baseline', gap: 9 },
  summaryNumber: { color: '#b5482f', fontSize: 27, fontWeight: '800' },
  summaryLabel: { color: '#62645f', fontSize: 14 },
  addButton: { minHeight: 50, backgroundColor: '#20211f', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 18, marginBottom: 24 },
  addButtonText: { color: '#fffefa', fontSize: 15, fontWeight: '800' },
  sectionTitle: { color: '#777870', fontSize: 11, fontWeight: '800', letterSpacing: 1.8, marginBottom: 12 },
  filmCard: { backgroundColor: '#fffefa', borderWidth: 1, borderColor: '#e1dcd1', borderRadius: 8, padding: 17, marginBottom: 12 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  genre: { color: '#a8432d', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  rating: { color: '#a8432d', fontSize: 14, fontWeight: '800' },
  filmTitle: { color: '#20211f', fontSize: 20, fontWeight: '800' },
  year: { color: '#777870', fontSize: 13, marginTop: 4 },
  description: { color: '#62645f', fontSize: 14, lineHeight: 20, marginTop: 10 },
  editHint: { color: '#a8432d', fontSize: 12, fontWeight: '700', marginTop: 13 },
  emptyState: { alignItems: 'center', paddingHorizontal: 18, paddingVertical: 42 },
  emptyTitle: { color: '#20211f', fontSize: 19, fontWeight: '800', textAlign: 'center' },
  emptyText: { color: '#62645f', fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 8, maxWidth: 300 },
  loader: { marginVertical: 40 },
  error: { color: '#a12f24', fontSize: 14, marginBottom: 16 },
  pressed: { opacity: 0.82 },
});