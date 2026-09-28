import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';

export default function Home() {
  const usuarios = [
    { id: '1', nome: 'Senku Ishigami', rank: 'S', tag: 'Cientista', numero: '01' },
    { id: '2', nome: 'Chrome', rank: 'A', tag: 'Explorador', numero: '02' },
    { id: '3', nome: 'Kohaku', rank: 'A', tag: 'Guerreira', numero: '03' },
    { id: '4', nome: 'Gen Asagiri', rank: 'A', tag: 'Mentalista', numero: '04' },
    { id: '5', nome: 'Tsukasa Shishio', rank: 'S', tag: 'Guerreiro', numero: '05' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>

          {/* HEADER */}
          <View style={styles.header}>
            <View>
              <Text style={styles.logoSmall}>DR. STONE</Text>
              <Text style={styles.logoMain}>REINO DA CIÊNCIA</Text>
            </View>

            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profileText}>S</Text>
            </TouchableOpacity>
          </View>

          {/* SAUDAÇÃO */}
          <View style={styles.welcome}>
            <Text style={styles.welcomeSmall}>BEM-VINDO DE VOLTA</Text>
            <Text style={styles.welcomeTitle}>Vamos reconstruir o mundo.</Text>
          </View>

          {/* HERO */}
          <View style={styles.heroCard}>
            <View style={styles.heroTop}>
              <View style={styles.scienceBadge}>
                <Text style={styles.scienceBadgeText}>CIÊNCIA</Text>
              </View>

              <Text style={styles.heroNumber}>3.700+</Text>
            </View>

            <View style={styles.heroContent}>
              <Text style={styles.heroLabel}>PROJETO EM DESTAQUE</Text>

              <Text style={styles.heroTitle}>
                Reino da Ciência
              </Text>

              <Text style={styles.heroDescription}>
                Conheça os cientistas e guerreiros responsáveis por
                reconstruir a civilização através da ciência.
              </Text>

              <TouchableOpacity style={styles.heroButton}>
                <Text style={styles.heroButtonText}>
                  EXPLORAR PROJETO
                </Text>

                <Text style={styles.arrow}>→</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.heroCircleLarge} />
            <View style={styles.heroCircleSmall} />
          </View>

          {/* STATUS */}
          <View style={styles.sectionTitleRow}>
            <View>
              <Text style={styles.sectionEyebrow}>PROGRESSO</Text>
              <Text style={styles.sectionTitle}>Status da ciência</Text>
            </View>

            <Text style={styles.sectionIcon}>⚗</Text>
          </View>

          <View style={styles.statsContainer}>

            <View style={styles.statCard}>
              <View style={styles.statIconBox}>
                <Text style={styles.statIcon}>⚛</Text>
              </View>

              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Descobertas</Text>

              <View style={styles.progressBackground}>
                <View style={styles.progressBlue} />
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIconBoxGreen}>
                <Text style={styles.statIcon}>★</Text>
              </View>

              <Text style={styles.statNumber}>08</Text>
              <Text style={styles.statLabel}>Favoritos</Text>

              <View style={styles.progressBackground}>
                <View style={styles.progressGreen} />
              </View>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIconBoxPurple}>
                <Text style={styles.statIcon}>⚡</Text>
              </View>

              <Text style={styles.statNumber}>05</Text>
              <Text style={styles.statLabel}>Projetos</Text>

              <View style={styles.progressBackground}>
                <View style={styles.progressPurple} />
              </View>
            </View>

          </View>

          {/* PERSONAGENS */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionEyebrow}>EQUIPE</Text>
              <Text style={styles.sectionTitle}>Personagens</Text>
            </View>

            <TouchableOpacity>
              <Text style={styles.viewAll}>VER TODOS →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.charactersContainer}>
            <FlatList
              data={usuarios}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.characterCard}>

                  <View style={styles.characterNumber}>
                    <Text style={styles.characterNumberText}>
                      {item.numero}
                    </Text>
                  </View>

                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {item.nome.charAt(0)}
                    </Text>
                  </View>

                  <View style={styles.characterInfo}>
                    <Text style={styles.characterName}>
                      {item.nome}
                    </Text>

                    <Text style={styles.characterTag}>
                      {item.tag}
                    </Text>
                  </View>

                  <View style={styles.rankContainer}>
                    <Text style={styles.rankLabel}>LVL</Text>
                    <Text style={styles.rank}>
                      {item.rank}
                    </Text>
                  </View>

                </TouchableOpacity>
              )}
            />
          </View>

          {/* FRASE */}
          <View style={styles.quoteCard}>
            <Text style={styles.quoteMark}>“</Text>

            <Text style={styles.quote}>
              A ciência é simplesmente a maneira como descobrimos
              o mundo ao nosso redor.
            </Text>

            <Text style={styles.quoteAuthor}>
              — SENKU ISHIGAMI
            </Text>
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
    paddingBottom: 30,
  },

  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 16,
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },

  logoSmall: {
    color: '#38bdf8',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 3,
  },

  logoMain: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 2,
  },

  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
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

  /* WELCOME */

  welcome: {
    marginBottom: 20,
  },

  welcomeSmall: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 7,
  },

  welcomeTitle: {
    color: '#f8fafc',
    fontSize: 27,
    fontWeight: '900',
    lineHeight: 32,
    maxWidth: 320,
  },

  /* HERO */

  heroCard: {
    minHeight: 245,
    backgroundColor: '#0f172a',
    borderRadius: 28,
    padding: 22,
    marginBottom: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#164e63',
    position: 'relative',
  },

  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  scienceBadge: {
    backgroundColor: '#082f49',
    borderWidth: 1,
    borderColor: '#0ea5e9',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  scienceBadgeText: {
    color: '#67e8f9',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  heroNumber: {
    color: '#334155',
    fontSize: 13,
    fontWeight: '900',
  },

  heroContent: {
    marginTop: 28,
    zIndex: 2,
  },

  heroLabel: {
    color: '#38bdf8',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 5,
  },

  heroTitle: {
    color: '#f8fafc',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
  },

  heroDescription: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 20,
    maxWidth: 280,
    marginBottom: 20,
  },

  heroButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  heroButtonText: {
    color: '#020617',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  arrow: {
    color: '#020617',
    fontSize: 17,
    fontWeight: '900',
    marginLeft: 8,
  },

  heroCircleLarge: {
    position: 'absolute',
    right: -60,
    bottom: -70,
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: '#0ea5e9',
    opacity: 0.25,
  },

  heroCircleSmall: {
    position: 'absolute',
    right: 25,
    bottom: 30,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#22d3ee',
    opacity: 0.2,
  },

  /* SECTIONS */

  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
    marginTop: 28,
  },

  sectionEyebrow: {
    color: '#38bdf8',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 3,
  },

  sectionTitle: {
    color: '#f8fafc',
    fontSize: 21,
    fontWeight: '900',
  },

  sectionIcon: {
    color: '#38bdf8',
    fontSize: 25,
  },

  viewAll: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },

  /* STATS */

  statsContainer: {
    flexDirection: 'row',
    gap: 9,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 13,
    borderWidth: 1,
    borderColor: '#1e293b',
  },

  statIconBox: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#082f49',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  statIconBoxGreen: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#052e2b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  statIconBoxPurple: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#2e1065',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  statIcon: {
    color: '#67e8f9',
    fontSize: 15,
    fontWeight: '900',
  },

  statNumber: {
    color: '#f8fafc',
    fontSize: 23,
    fontWeight: '900',
  },

  statLabel: {
    color: '#64748b',
    fontSize: 9,
    marginTop: 2,
    marginBottom: 10,
  },

  progressBackground: {
    height: 3,
    borderRadius: 3,
    backgroundColor: '#1e293b',
    overflow: 'hidden',
  },

  progressBlue: {
    width: '80%',
    height: 3,
    backgroundColor: '#38bdf8',
  },

  progressGreen: {
    width: '55%',
    height: 3,
    backgroundColor: '#34d399',
  },

  progressPurple: {
    width: '65%',
    height: 3,
    backgroundColor: '#a78bfa',
  },

  /* CHARACTERS */

  charactersContainer: {
    backgroundColor: '#0b1120',
    borderRadius: 22,
    padding: 10,
    borderWidth: 1,
    borderColor: '#1e293b',
  },

  characterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    borderRadius: 15,
    padding: 11,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: '#1e293b',
  },

  characterNumber: {
    width: 28,
    marginRight: 8,
  },

  characterNumberText: {
    color: '#334155',
    fontSize: 10,
    fontWeight: '900',
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#e0f2fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: {
    color: '#075985',
    fontSize: 18,
    fontWeight: '900',
  },

  characterInfo: {
    flex: 1,
  },

  characterName: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '800',
  },

  characterTag: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 3,
  },

  rankContainer: {
    alignItems: 'center',
    paddingLeft: 8,
  },

  rankLabel: {
    color: '#475569',
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 1,
  },

  rank: {
    color: '#38bdf8',
    fontSize: 17,
    fontWeight: '900',
    marginTop: 1,
  },

  /* QUOTE */

  quoteCard: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#071827',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#164e63',
  },

  quoteMark: {
    color: '#38bdf8',
    fontSize: 35,
    fontWeight: '900',
    height: 28,
  },

  quote: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
    marginTop: 5,
  },

  quoteAuthor: {
    color: '#38bdf8',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginTop: 12,
  },
});
