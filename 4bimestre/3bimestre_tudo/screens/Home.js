import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const initialAnimes = [
  { id: '1', nome: 'Attack on Titan', tipo: 'Ação', ano: '2013', nota: '9.1', episodios: 87, descricao: 'A humanidade luta pela sobrevivência em um mundo cercado por titãs. Segredos, estratégia e reviravoltas transformam essa história em uma aventura inesquecível.' },
  { id: '2', nome: 'Fullmetal Alchemist: Brotherhood', tipo: 'Fantasia', ano: '2009', nota: '9.1', episodios: 64, descricao: 'Os irmãos Elric viajam em busca da Pedra Filosofal para recuperar o que perderam após uma tentativa de alquimia proibida.' },
  { id: '3', nome: 'One Piece', tipo: 'Aventura', ano: '1999', nota: '9.0', episodios: 1100, descricao: 'Monkey D. Luffy e sua tripulação cruzam os mares em busca do lendário One Piece e do sonho de se tornar o Rei dos Piratas.' },
  { id: '4', nome: 'Naruto', tipo: 'Ação', ano: '2002', nota: '8.4', episodios: 220, descricao: 'Um jovem ninja determinado enfrenta desafios e constrói amizades enquanto persegue o sonho de se tornar Hokage.' },
  { id: '5', nome: 'Demon Slayer', tipo: 'Ação', ano: '2019', nota: '8.6', episodios: 63, descricao: 'Tanjiro entra para a corporação de caçadores de demônios em busca de uma cura para sua irmã Nezuko.' },
  { id: '6', nome: 'Jujutsu Kaisen', tipo: 'Ação', ano: '2020', nota: '8.6', episodios: 47, descricao: 'Estudantes de jujutsu enfrentam maldições perigosas em batalhas cheias de energia e técnicas sobrenaturais.' },
  { id: '7', nome: 'Hunter x Hunter', tipo: 'Aventura', ano: '2011', nota: '9.0', episodios: 148, descricao: 'Gon parte em uma jornada para encontrar o pai e se tornar um Hunter, descobrindo um mundo cheio de desafios.' },
  { id: '8', nome: 'Spy x Family', tipo: 'Comédia', ano: '2022', nota: '8.3', episodios: 37, descricao: 'Um espião, uma assassina e uma criança telepata formam uma família improvável para cumprir missões secretas.' },
  { id: '9', nome: 'Frieren e a Jornada para o Além', tipo: 'Fantasia', ano: '2023', nota: '9.3', episodios: 28, descricao: 'Após a grande aventura, a elfa Frieren reflete sobre o tempo, a amizade e as memórias deixadas por seus companheiros.' },
  { id: '10', nome: 'Death Note', tipo: 'Suspense', ano: '2006', nota: '8.6', episodios: 37, descricao: 'Um estudante encontra um caderno sobrenatural e entra em um intenso jogo de inteligência com um detetive.' },
  { id: '11', nome: 'My Hero Academia', tipo: 'Ação', ano: '2016', nota: '8.2', episodios: 159, descricao: 'Em um mundo onde quase todos têm poderes, Izuku Midoriya luta para se tornar um herói.' },
  { id: '12', nome: 'Cowboy Bebop', tipo: 'Ficção científica', ano: '1998', nota: '8.9', episodios: 26, descricao: 'Uma equipe de caçadores de recompensas viaja pelo espaço em aventuras marcadas por música, humor e mistério.' },
];

export default function Home() {
  const [animes, setAnimes] = useState(initialAnimes);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  const genres = ['Todos', ...new Set(animes.map((anime) => anime.tipo))];

  const visibleAnimes = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return animes.filter((anime) => {
      const matchesQuery = `${anime.nome} ${anime.tipo}`.toLocaleLowerCase().includes(normalizedQuery);
      const matchesGenre = selectedGenre === 'Todos' || anime.tipo === selectedGenre;
      const matchesFavorites = !showFavorites || favorites.includes(anime.id);
      return matchesQuery && matchesGenre && matchesFavorites;
    });
  }, [animes, favorites, query, selectedGenre, showFavorites]);

  function toggleFavorite(id) {
    setFavorites((current) => (
      current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id]
    ));
  }

  function addAnime() {
    const trimmedTitle = title.trim();
    const trimmedGenre = genre.trim();
    const trimmedDescription = description.trim();
    if (!trimmedTitle || !trimmedGenre || !trimmedDescription) {
      setFormError('Preencha o nome, o gênero e a descrição.');
      return;
    }

    setAnimes((current) => [{
      id: `${Date.now()}`,
      nome: trimmedTitle,
      tipo: trimmedGenre,
      ano: '—',
      nota: '—',
      episodios: '—',
      descricao: trimmedDescription,
    }, ...current]);
    setSelectedGenre('Todos');
    setShowFavorites(false);
    setQuery('');
    setTitle('');
    setGenre('');
    setDescription('');
    setFormError('');
    setShowAddForm(false);
  }

  function closeAddForm() {
    setShowAddForm(false);
    setFormError('');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={visibleAnimes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={(
          <View style={styles.headerContent}>
            <View style={styles.header}>
              <View>
                <Text style={styles.logoSmall}>SUA BIBLIOTECA DE</Text>
                <Text style={styles.logoMain}>ANIMES</Text>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={() => setShowAddForm(true)} accessibilityLabel="Cadastrar anime">
                <Text style={styles.addButtonText}>＋</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.heroCard}>
              <Text style={styles.heroBadge}>ANIMEDEX · CATÁLOGO</Text>
              <Text style={styles.heroTitle}>Encontre sua próxima história.</Text>
              <Text style={styles.heroDescription}>Explore títulos, descubra novos gêneros e monte sua lista de favoritos.</Text>
              <TouchableOpacity style={styles.heroButton} onPress={() => setShowAddForm(true)}>
                <Text style={styles.heroButtonText}>＋  ADICIONAR ANIME</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{animes.length}</Text>
                <Text style={styles.statLabel}>NO CATÁLOGO</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statNumber, { color: '#f9a8d4' }]}>{favorites.length}</Text>
                <Text style={styles.statLabel}>FAVORITOS</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statNumber, { color: '#fcd34d' }]}>{genres.length - 1}</Text>
                <Text style={styles.statLabel}>GÊNEROS</Text>
              </View>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Buscar anime ou gênero..."
              placeholderTextColor="#64748b"
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              accessibilityLabel="Buscar animes"
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
              {genres.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.filterChip, selectedGenre === item && !showFavorites && styles.filterChipActive]}
                  onPress={() => {
                    setSelectedGenre(item);
                    setShowFavorites(false);
                  }}
                >
                  <Text style={[styles.filterText, selectedGenre === item && !showFavorites && styles.filterTextActive]}>{item}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.filterChip, showFavorites && styles.favoriteFilterActive]}
                onPress={() => setShowFavorites((current) => !current)}
              >
                <Text style={[styles.filterText, showFavorites && styles.filterTextActive]}>♥ Favoritos</Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionEyebrow}>BIBLIOTECA</Text>
                <Text style={styles.sectionTitle}>{showFavorites ? 'Seus favoritos' : 'Todos os animes'}</Text>
              </View>
              <Text style={styles.resultCount}>{visibleAnimes.length} títulos</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={(
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⌕</Text>
            <Text style={styles.emptyTitle}>Nenhum anime encontrado</Text>
            <Text style={styles.emptyText}>Tente outro termo ou escolha um gênero diferente.</Text>
          </View>
        )}
        renderItem={({ item, index }) => {
          const isFavorite = favorites.includes(item.id);
          return (
            <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={() => setSelectedAnime(item)}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardNumber}>Nº {String(index + 1).padStart(2, '0')}</Text>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(item.id)}
                  accessibilityLabel={isFavorite ? `Remover ${item.nome} dos favoritos` : `Adicionar ${item.nome} aos favoritos`}
                >
                  <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}>{isFavorite ? '♥' : '♡'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.iconWrap}>
                <Text style={styles.iconText}>{item.nome.charAt(0).toUpperCase()}</Text>
              </View>
              <Text style={styles.cardName} numberOfLines={2}>{item.nome}</Text>
              <Text style={styles.cardType}>{item.tipo.toUpperCase()}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardYear}>{item.ano}</Text>
                <Text style={styles.cardRating}>★ {item.nota}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Modal visible={Boolean(selectedAnime)} transparent animationType="slide" onRequestClose={() => setSelectedAnime(null)}>
        {selectedAnime && (
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedAnime(null)}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
              <Text style={styles.modalEyebrow}>{selectedAnime.tipo.toUpperCase()} · {selectedAnime.ano}</Text>
              <Text style={styles.modalTitle}>{selectedAnime.nome}</Text>
              <Text style={styles.modalRating}>★  {selectedAnime.nota}  ·  {selectedAnime.episodios} episódios</Text>
              <Text style={styles.modalDescription}>{selectedAnime.descricao}</Text>
              <TouchableOpacity style={styles.modalAction} onPress={() => toggleFavorite(selectedAnime.id)}>
                <Text style={styles.modalActionText}>
                  {favorites.includes(selectedAnime.id) ? '♥  Remover dos favoritos' : '♡  Adicionar aos favoritos'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>

      <Modal visible={showAddForm} transparent animationType="slide" onRequestClose={closeAddForm}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <TouchableOpacity style={styles.closeButton} onPress={closeAddForm}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalEyebrow}>SUA BIBLIOTECA</Text>
            <Text style={styles.modalTitle}>Novo anime</Text>
            <TextInput style={styles.formInput} placeholder="Nome do anime" placeholderTextColor="#64748b" value={title} onChangeText={setTitle} />
            <TextInput style={styles.formInput} placeholder="Gênero (ex.: Aventura)" placeholderTextColor="#64748b" value={genre} onChangeText={setGenre} />
            <TextInput
              style={[styles.formInput, styles.descriptionInput]}
              placeholder="Uma breve descrição"
              placeholderTextColor="#64748b"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />
            {formError ? <Text style={styles.formError}>{formError}</Text> : null}
            <TouchableOpacity style={styles.modalAction} onPress={addAnime}>
              <Text style={styles.modalActionText}>ADICIONAR AO CATÁLOGO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#080b14' },
  listContent: { paddingBottom: 32, paddingHorizontal: 16 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 12 },
  headerContent: { paddingTop: 16, paddingBottom: 4 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  logoSmall: { color: '#a78bfa', fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  logoMain: { color: '#f8fafc', fontSize: 30, fontWeight: '900', letterSpacing: 1 },
  addButton: { width: 44, height: 44, borderRadius: 16, backgroundColor: '#8b5cf6', alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: '#fff', fontSize: 28, lineHeight: 32, fontWeight: '500' },
  heroCard: { backgroundColor: '#171329', borderRadius: 24, borderWidth: 1, borderColor: '#35265b', padding: 20, marginBottom: 14 },
  heroBadge: { color: '#c4b5fd', fontSize: 10, fontWeight: '900', letterSpacing: 1.4, marginBottom: 12 },
  heroTitle: { color: '#fff', fontSize: 27, lineHeight: 34, fontWeight: '900', marginBottom: 8 },
  heroDescription: { color: '#b8b2ca', fontSize: 13, lineHeight: 20, marginBottom: 16 },
  heroButton: { alignSelf: 'flex-start', backgroundColor: '#8b5cf6', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11 },
  heroButtonText: { color: '#fff', fontSize: 10, fontWeight: '900', letterSpacing: 0.6 },
  statsContainer: { flexDirection: 'row', marginHorizontal: -4, marginBottom: 18 },
  statCard: { flex: 1, backgroundColor: '#111522', borderRadius: 16, borderWidth: 1, borderColor: '#22283a', padding: 12, marginHorizontal: 4 },
  statNumber: { color: '#c4b5fd', fontSize: 22, fontWeight: '900', marginBottom: 3 },
  statLabel: { color: '#858ca0', fontSize: 8, fontWeight: '800', letterSpacing: 0.6 },
  searchInput: { backgroundColor: '#111522', borderWidth: 1, borderColor: '#272d3d', borderRadius: 14, paddingHorizontal: 15, paddingVertical: 13, color: '#f8fafc', fontSize: 14, marginBottom: 12 },
  filters: { paddingBottom: 18 },
  filterChip: { backgroundColor: '#111522', borderWidth: 1, borderColor: '#272d3d', borderRadius: 999, paddingHorizontal: 13, paddingVertical: 8, marginRight: 7 },
  filterChipActive: { backgroundColor: '#8b5cf6', borderColor: '#8b5cf6' },
  favoriteFilterActive: { backgroundColor: '#9d174d', borderColor: '#ec4899' },
  filterText: { color: '#a1a8b8', fontSize: 11, fontWeight: '700' },
  filterTextActive: { color: '#fff' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 13 },
  sectionEyebrow: { color: '#a78bfa', fontSize: 9, fontWeight: '900', letterSpacing: 1.8, marginBottom: 4 },
  sectionTitle: { color: '#f8fafc', fontSize: 21, fontWeight: '900' },
  resultCount: { color: '#858ca0', fontSize: 11, paddingBottom: 3 },
  card: { flex: 1, minWidth: '48%', backgroundColor: '#111522', borderRadius: 19, borderWidth: 1, borderColor: '#22283a', padding: 13, marginHorizontal: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardNumber: { color: '#71798d', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
  favoriteButton: { padding: 2 },
  favoriteIcon: { color: '#747b8f', fontSize: 20 },
  favoriteIconActive: { color: '#f472b6' },
  iconWrap: { width: 48, height: 48, borderRadius: 15, backgroundColor: '#20183b', borderWidth: 1, borderColor: '#49347c', alignItems: 'center', justifyContent: 'center', marginBottom: 11 },
  iconText: { color: '#ddd6fe', fontSize: 22, fontWeight: '900' },
  cardName: { color: '#f8fafc', fontSize: 14, lineHeight: 19, fontWeight: '800', minHeight: 38, marginBottom: 5 },
  cardType: { color: '#b39af8', fontSize: 9, fontWeight: '800', letterSpacing: 0.8, marginBottom: 10 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#252a3a', paddingTop: 9 },
  cardYear: { color: '#858ca0', fontSize: 10, fontWeight: '700' },
  cardRating: { color: '#fcd34d', fontSize: 10, fontWeight: '800' },
  emptyState: { alignItems: 'center', paddingHorizontal: 24, paddingVertical: 42 },
  emptyIcon: { color: '#a78bfa', fontSize: 40, marginBottom: 8 },
  emptyTitle: { color: '#f8fafc', fontSize: 16, fontWeight: '800', marginBottom: 6 },
  emptyText: { color: '#9299aa', fontSize: 12, textAlign: 'center', lineHeight: 18 },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.72)' },
  modalCard: { backgroundColor: '#111522', borderTopLeftRadius: 26, borderTopRightRadius: 26, borderWidth: 1, borderColor: '#343047', padding: 24, paddingBottom: 32 },
  closeButton: { alignSelf: 'flex-end', width: 34, height: 34, borderRadius: 17, backgroundColor: '#252a3a', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  closeButtonText: { color: '#fff', fontSize: 25, lineHeight: 28 },
  modalEyebrow: { color: '#b39af8', fontSize: 10, fontWeight: '900', letterSpacing: 1.4, marginBottom: 8 },
  modalTitle: { color: '#fff', fontSize: 25, lineHeight: 31, fontWeight: '900', marginBottom: 10 },
  modalRating: { color: '#fcd34d', fontSize: 12, fontWeight: '700', marginBottom: 16 },
  modalDescription: { color: '#c1c5d0', fontSize: 14, lineHeight: 22, marginBottom: 20 },
  modalAction: { backgroundColor: '#8b5cf6', borderRadius: 13, alignItems: 'center', paddingVertical: 14, marginTop: 8 },
  modalActionText: { color: '#fff', fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },
  formInput: { backgroundColor: '#090c15', borderWidth: 1, borderColor: '#2b3041', borderRadius: 12, paddingHorizontal: 13, paddingVertical: 12, color: '#fff', fontSize: 14, marginBottom: 10 },
  descriptionInput: { minHeight: 90 },
  formError: { color: '#fda4af', fontSize: 12, marginBottom: 4 },
});
