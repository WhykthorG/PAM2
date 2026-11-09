import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

export default function Home() {
  const animes = [
    {
      id: '1',
      nome: 'Attack on Titan',
      tipo: 'Ação',
      rank: 'S',
      descricao:
        'Humanos lutam pela sobrevivência em um mundo dominado por gigantes, com estratégia, tragédia e reviravoltas intensas.',
    },
    {
      id: '2',
      nome: 'Fullmetal Alchemist',
      tipo: 'Fantasia',
      rank: 'S',
      descricao:
        'Dois irmãos percorrem o mundo em busca da Pedra Filosofal, enfrentando poderes, mistérios e consequências humanas.',
    },
    {
      id: '3',
      nome: 'One Piece',
      tipo: 'Aventura',
      rank: 'S',
      descricao:
        'Monkey D. Luffy parte em uma jornada épica para encontrar o maior tesouro e se tornar Rei dos Piratas.',
    },
    {
      id: '4',
      nome: 'Naruto',
      tipo: 'Shonen',
      rank: 'S',
      descricao:
        'Um ninja problemático se esforça para provar seu valor e atingir seu sonho de se tornar Hokage.',
    },
    {
      id: '5',
      nome: 'Demon Slayer',
      tipo: 'Ação',
      rank: 'A',
      descricao:
        'Tanjiro luta para salvar sua irmã e derrotar demônios em uma jornada de dor, coragem e beleza visual.',
    },
    {
      id: '6',
      nome: 'Jujutsu Kaisen',
      tipo: 'Combate',
      rank: 'A',
      descricao:
        'Estudantes de feitiçaria enfrentam maldições mortais com habilidades extraordinárias e batalhas emocionantes.',
    },
    {
      id: '7',
      nome: 'Hunter x Hunter',
      tipo: 'Aventura',
      rank: 'S',
      descricao:
        'Gon e seus amigos caminham por desafios perigosos em busca de força, amizade e propósito.',
    },
    {
      id: '8',
      nome: 'Spy x Family',
      tipo: 'Comédia',
      rank: 'A',
      descricao:
        'Uma família de agentes secretos tenta manter uma fachada perfeita enquanto vive situações absurdas e adoráveis.',
    },
    {
      id: '9',
      nome: 'Frieren',
      tipo: 'Drama',
      rank: 'A',
      descricao:
        'Uma elfa viajante reflete sobre a passagem do tempo, a amizade e o impacto das memórias após uma grande aventura.',
    },
    {
      id: '10',
      nome: 'Death Note',
      tipo: 'Suspense',
      rank: 'S',
      descricao:
        'Uma mente brilhante entra em um jogo mortal envolvendo poder, justiça e consequências imprevisíveis.',
    },
    {
      id: '11',
      nome: 'My Hero Academia',
      tipo: 'Super-herói',
      rank: 'A',
      descricao:
        'Em um mundo onde quase todos têm poderes, Izuku busca se tornar um herói e mudar o destino de muitos.',
    },
    {
      id: '12',
      nome: 'Cowboy Bebop',
      tipo: 'Sci-Fi',
      rank: 'S',
      descricao:
        'Uma tripulação de caçadores de recompensas navega entre espaço, música e lembranças em uma jornada única.',
    },
  ];

  const stats = [
    { label: 'Animes', value: '120+', color: '#38bdf8' },
    { label: 'Favoritos', value: '48', color: '#34d399' },
    { label: 'Top 10', value: '12', color: '#a78bfa' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={animes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.container}>
            <View style={styles.header}>
              <View>
                <Text style={styles.logoSmall}>ANIME</Text>
                <Text style={styles.logoMain}>POKÉDEX</Text>
              </View>

              <TouchableOpacity style={styles.profileButton}>
                <Text style={styles.profileText}>A</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.heroCard}>
              <View style={styles.heroTop}>
                <Text style={styles.heroBadge}>TOP 12</Text>
                <Text style={styles.heroNumber}>ANIMEDEX</Text>
              </View>

              <Text style={styles.heroTitle}>Descubra animes lendários</Text>
              <Text style={styles.heroDescription}>
                Explore mundos, batalhas e histórias que marcaram gerações.
              </Text>

              <TouchableOpacity style={styles.heroButton}>
                <Text style={styles.heroButtonText}>VER CATÁLOGO</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
              {stats.map((item) => (
                <View key={item.label} style={styles.statCard}>
                  <Text style={[styles.statNumber, { color: item.color }]}>{item.value}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              ))}
            </View>

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionEyebrow}>CATALOGO</Text>
                <Text style={styles.sectionTitle}>Animes registrados</Text>
              </View>
            </View>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.9}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardNumber}>#{item.id.padStart(2, '0')}</Text>
              <Text style={[styles.rank, { color: item.rank === 'S' ? '#38bdf8' : '#fbbf24' }]}>
                {item.rank}
              </Text>
            </View>

            <View style={styles.iconWrap}>
              <Text style={styles.iconText}>{item.nome.charAt(0)}</Text>
            </View>

            <Text style={styles.cardName}>{item.nome}</Text>
            <Text style={styles.cardType}>{item.tipo}</Text>
            <Text style={styles.cardDescription}>{item.descricao}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#020617',
  },
  listContent: {
    paddingBottom: 30,
    paddingHorizontal: 14,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  container: {
    paddingTop: 18,
    paddingBottom: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  logoSmall: {
    color: '#7dd3fc',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 3,
  },
  logoMain: {
    color: '#f8fafc',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 1,
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#38bdf8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#67e8f9',
    fontSize: 18,
    fontWeight: '900',
  },
  heroCard: {
    backgroundColor: '#0f172a',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#1d4ed8',
    padding: 18,
    marginBottom: 16,
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroBadge: {
    color: '#7dd3fc',
    backgroundColor: '#082f49',
    borderWidth: 1,
    borderColor: '#38bdf8',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  heroNumber: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },
  heroTitle: {
    color: '#f8fafc',
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 8,
  },
  heroDescription: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  heroButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#38bdf8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  heroButtonText: {
    color: '#020617',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 12,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 9,
    fontWeight: '700',
  },
  sectionHeader: {
    marginBottom: 12,
    paddingTop: 4,
  },
  sectionEyebrow: {
    color: '#38bdf8',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 4,
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '900',
  },
  card: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#0f172a',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 12,
    marginHorizontal: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardNumber: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  rank: {
    fontSize: 16,
    fontWeight: '900',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#082f49',
    borderWidth: 1,
    borderColor: '#38bdf8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    color: '#e0f2fe',
    fontSize: 24,
    fontWeight: '900',
  },
  cardName: {
    color: '#f8fafc',
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 4,
  },
  cardType: {
    color: '#7dd3fc',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  cardDescription: {
    color: '#cbd5e1',
    fontSize: 11,
    lineHeight: 16,
  },
});
