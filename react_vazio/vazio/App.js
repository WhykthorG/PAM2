import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

// Dados estáticos dos jogadores organizados por posição.
// Cada posição contém uma lista de perfis com nome, idade, camisa, gols,
// descrição e habilidades.
const screens = {
  Goleiro: [
    {
      name: 'Alisson Becker',
      age: 33,
      shirt: 1,
      goals: 0,
      description:
        'Um goleiro seguro e experiente, com excelente posicionamento e reflexos rápidos. Fundamental na saída de bola e uma verdadeira muralha para transmitir confiança à zaga.',
      abilities: [
        'Posicionamento impecável',
        'Reflexos apurados',
        'Jogo com os pés',
        'Liderança defensiva',
      ],
    },
    {
      name: 'Ederson Moraes',
      age: 32,
      shirt: 23,
      goals: 0,
      description:
        'Reconhecido mundialmente pela sua precisão nos passes longos e frieza sob pressão, atua quase como um líbero para iniciar jogadas ofensivas desde a defesa.',
      abilities: [
        'Lançamentos precisos',
        'Frieza sob pressão',
        'Cobertura defensiva',
        'Defesa de pênaltis',
      ],
    },
    {
      name: 'Weverton',
      age: 38,
      shirt: 12,
      goals: 0,
      description:
        'Goleiro veterano com forte presença de área e liderança. Traz uma bagagem imensa de títulos e estabilidade emocional para o grupo em momentos decisivos.',
      abilities: [
        'Agilidade em curtas distâncias',
        'Defesa de puro reflexo',
        'Experiência e liderança',
        'Comando da grande área',
      ],
    },
  ],
  Defensores: [
    {
      name: 'Marquinhos',
      age: 32,
      shirt: 4,
      goals: 8,
      description:
        'Zagueiro técnico e veloz, capaz de antecipar jogadas com maestria. É um dos pilares defensivos da Seleção, aliando raça, tempo de bola e ótima impulsão.',
      abilities: [
        'Antecipação de jogadas',
        'Desarme preciso',
        'Cabeceio defensivo e ofensivo',
        'Saída de bola limpa',
      ],
    },
    {
      name: 'Gabriel Magalhães',
      age: 28,
      shirt: 3,
      goals: 5,
      description:
        'Zagueiro canhoto de imponente presença física. Forte nos duelos corpo a corpo e letal na bola aérea ofensiva durante escanteios e faltas.',
      abilities: [
        'Força física',
        'Domínio aéreo',
        'Marcação implacável',
        'Passe longo',
      ],
    },
    {
      name: 'Bremer',
      age: 29,
      shirt: 14,
      goals: 2,
      description:
        'Especialista em marcação individual e desarmes contundentes. Oferece agressividade defensiva e vitalidade para recuperar a posse de bola.',
      abilities: [
        'Bote certeiro',
        'Imposição física',
        'Cobertura rápida',
        'Interceptação',
      ],
    },
    {
      name: 'Roger Ibañez',
      age: 27,
      shirt: 24,
      goals: 1,
      description:
        'Zagueiro moderno que combina velocidade e técnica. Adapta-se bem a diferentes esquemas táticos, cobrindo espaços amplos com facilidade.',
      abilities: [
        'Velocidade de recuperação',
        'Versatilidade tática',
        'Combate no mano a mano',
        'Agilidade',
      ],
    },
    {
      name: 'Léo Pereira',
      age: 30,
      shirt: 15,
      goals: 1,
      description:
        'Canhoto com excelente visão de jogo para quebrar linhas com passes verticais. Forte no jogo aéreo e calmo com a bola nos pés.',
      abilities: [
        'Construção de jogo',
        'Jogo aéreo',
        'Calma sob pressão',
        'Precisão no passe',
      ],
    },
    {
      name: 'Danilo',
      age: 34,
      shirt: 13,
      goals: 1,
      description:
        'Lateral experiente que atua frequentemente na construção pelo meio. Traz equilíbrio defensivo e tático indispensável para o balanço da equipe.',
      abilities: [
        'Inteligência tática',
        'Apoio pelo meio-campo',
        'Marcação em bloco',
        'Liderança',
      ],
    },
    {
      name: 'Alex Sandro',
      age: 35,
      shirt: 6,
      goals: 2,
      description:
        'Lateral de força e resistência. Sabe o momento exato de apoiar o ataque e cruzar com veneno, recompondo a defesa com muita eficácia.',
      abilities: [
        'Cruzamento forte',
        'Resistência física',
        'Marcação lateral',
        'Experiência internacional',
      ],
    },
    {
      name: 'Douglas Santos',
      age: 32,
      shirt: 16,
      goals: 0,
      description:
        'Um lateral muito equilibrado, que oferece segurança na marcação e apoio inteligente, além de ser ótimo na retenção de bola no campo de ataque.',
      abilities: [
        'Cruzamento preciso',
        'Dinâmica de jogo',
        'Apoio constante',
        'Boa técnica de passe',
      ],
    },
    {
      name: 'Wesley',
      age: 22,
      shirt: 2,
      goals: 0,
      description:
        'Lateral-direito explosivo e de muita força física. Chega com frequência ao fundo do campo para cruzamentos e ataca os espaços com velocidade.',
      abilities: [
        'Arrancada ofensiva',
        'Velocidade',
        'Ultrapassagem',
        'Fôlego inesgotável',
      ],
    },
  ],
  'Meio-campistas': [
    {
      name: 'Casemiro',
      age: 34,
      shirt: 5,
      goals: 8,
      description:
        'O cão de guarda do meio-campo brasileiro. Mestre em interceptações e desarmes, também contribui com lançamentos e finalizações de média distância.',
      abilities: [
        'Desarme cirúrgico',
        'Posicionamento tático',
        'Chute de longa distância',
        'Liderança absoluta',
      ],
    },
    {
      name: 'Bruno Guimarães',
      age: 28,
      shirt: 8,
      goals: 3,
      description:
        'Motor do meio-campo, dita o ritmo do jogo com passes curtos e longos. É incansável na marcação e tem grande visão para assistências.',
      abilities: [
        'Ritmo de jogo',
        'Passe em profundidade',
        'Intensidade na pressão',
        'Distribuição de bola',
      ],
    },
    {
      name: 'Fabinho',
      age: 32,
      shirt: 17,
      goals: 0,
      description:
        'Volante de passadas largas, impecável na proteção da zaga. Oferece equilíbrio, cobre espaços deixados pelos laterais e tem ótimo aproveitamento nos passes.',
      abilities: [
        'Proteção da zaga',
        'Cobertura defensiva',
        'Precisão nos pases',
        'Forte marcação',
      ],
    },
    {
      name: 'Lucas Paquetá',
      age: 28,
      shirt: 20,
      goals: 11,
      description:
        'Meia criativo, habilidoso e de muita entrega física. Conecta defesa e ataque com dribles curtos, toques de efeito e muita visão de jogo.',
      abilities: [
        'Drible em espaço curto',
        'Assistências criativas',
        'Pisada na área',
        'Esforço defensivo',
      ],
    },
    {
      name: 'Danilo Santos',
      age: 25,
      shirt: 18,
      goals: 0,
      description:
        'Volante jovem, canhoto e combativo, capaz de atuar em alta intensidade de área a área. Fundamental na recuperação e rápida transição.',
      abilities: [
        'Dinamismo "box-to-box"',
        'Roubada de bola',
        'Intensidade física',
        'Transição ofensiva',
      ],
    },
  ],
  Atacantes: [
    {
      name: 'Vinícius Júnior',
      age: 25,
      shirt: 7,
      goals: 25,
      description:
        'A principal flecha do ataque brasileiro. Um jogador letal, com dribles desconcertantes, explosão fenomenal e capacidade de decidir qualquer jogo.',
      abilities: [
        'Velocidade explosiva',
        'Drible 1 contra 1',
        'Finalização letal',
        'Imprevisibilidade',
      ],
    },
    {
      name: 'Neymar Jr.',
      age: 34,
      shirt: 10,
      goals: 79,
      description:
        'O camisa 10 e cérebro do time. Um gênio com a bola nos pés, capaz de criar jogadas do nada, achar passes impossíveis e balançar as redes com maestria.',
      abilities: [
        'Genialidade criativa',
        'Bola parada',
        'Visão de jogo inigualável',
        'Controle absoluto da bola',
      ],
    },
    {
      name: 'Raphinha',
      age: 29,
      shirt: 11,
      goals: 10,
      description:
        'Atacante canhoto que atua pela direita, oferecendo cruzamentos venenosos, muita combatividade sem a bola e finalizações fortes de fora da área.',
      abilities: [
        'Corte para o meio',
        'Chute de longe',
        'Dedicação tática',
        'Bola parada',
      ],
    },
    {
      name: 'Matheus Cunha',
      age: 27,
      shirt: 9,
      goals: 3,
      description:
        'Atacante móvel e inteligente, sabe fazer o pivô, abrir espaços para os pontas e finalizar com frieza dentro e fora da área.',
      abilities: [
        'Movimentação inteligente',
        'Pivô',
        'Finalização precisa',
        'Pressão na saída de bola',
      ],
    },
    {
      name: 'Endrick',
      age: 19,
      shirt: 19,
      goals: 5,
      description:
        'Joia de força e potência fora do comum para a idade. Combina explosão muscular, um chute poderoso de perna esquerda e muito faro de gol.',
      abilities: [
        'Explosão física',
        'Chute potente',
        'Personalidade forte',
        'Presença de área',
      ],
    },
    {
      name: 'Gabriel Martinelli',
      age: 24,
      shirt: 22,
      goals: 4,
      description:
        'Ponta incansável e incisivo. Ataca o espaço defensivo com agressividade, tem muita facilidade para entrar na área e definir cruzado.',
      abilities: [
        'Velocidade contínua',
        'Infiltração rápida',
        'Definição com os dois pés',
        'Verticalidade',
      ],
    },
    {
      name: 'Luiz Henrique',
      age: 25,
      shirt: 21,
      goals: 2,
      description:
        'Atacante de muita técnica, improviso e agilidade. Gosta de conduzir a bola colada ao pé e usar mudanças de ritmo para quebrar as linhas adversárias.',
      abilities: [
        'Drible em velocidade',
        'Condução de bola',
        'Agilidade',
        'Criatividade pelos lados',
      ],
    },
    {
      name: 'Igor Thiago',
      age: 24,
      shirt: 25,
      goals: 1,
      description:
        'Centroavante de referência, forte fisicamente e temível na bola aérea. Funciona como um verdadeiro "tanque" na área adversária.',
      abilities: [
        'Força no jogo aéreo',
        'Proteção de bola',
        'Posicionamento de centroavante',
        'Combate físico',
      ],
    },
    {
      name: 'Rayan',
      age: 19,
      shirt: 26,
      goals: 0,
      description:
        'Jovem promessa do ataque, com muita habilidade no 1 contra 1 e coragem para tentar jogadas diferentes, trazendo imprevisibilidade ao time.',
      abilities: [
        'Drible curto',
        'Ousadia e improviso',
        'Facilidade de finalização',
        'Versatilidade no ataque',
      ],
    },
  ],
};

export default function App() {
  // Estado que guarda a posição selecionada pelo usuário.
  // Quando é null, o app mostra o menu de posições. Quando tem valor,
  // exibe os perfis dos jogadores daquela posição.
  const [activeScreen, setActiveScreen] = useState(null);

  return (
    // ScrollView permite rolar o conteúdo da tela para caber em telas menores.
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {activeScreen === null ? (
        // Tela inicial: mostra o menu de posições para o usuário escolher.
        <View style={styles.menuWrapper}>
          <Text style={styles.appHeader}>Seleção Brasileira</Text>
          <Text style={styles.appSubheader}>Escolha uma posição para ver os perfis dos jogadores</Text>
          <View style={styles.menu}>
            {/* Cria um botão para cada posição disponível no objeto screens */}
            {Object.keys(screens).map((position) => (
              <Pressable
                key={position}
                style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                android_ripple={{ color: '#ff6d43' }}
                onPress={() => setActiveScreen(position)}
              >
                <Text style={styles.menuText}>{position}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : (
        // Tela de perfil: exibe as cartas dos jogadores para a posição selecionada.
        <View style={styles.card}>
          <View style={styles.cardPatternGrid} />
          <View style={styles.cardOverlayDots} />
          <View style={styles.cardAccent} />
          <View style={styles.cardTitleArea}>
            <View>
              <Text style={styles.cardTitle}>{activeScreen}</Text>
              <Text style={styles.cardSubtitle}>
                {screens[activeScreen].length} perfis disponíveis
              </Text>
            </View>
            <Text style={styles.cardTag}>Seleção</Text>
          </View>

          {/* Corpo do cartão com todos os jogadores da posição selecionada */}
          <View style={styles.cardBody}>
            {screens[activeScreen].map((player, index) => (
              <View key={index} style={styles.playerSection}>
                <Text style={styles.playerCategory}>Perfil do Jogador</Text>
                <Text style={styles.playerMeta}>Copa do Mundo • Seleção Brasileira</Text>

                <View style={styles.playerRow}>
                  <View style={styles.playerColumn}>
                    <Text style={styles.inlineLabel}>Nome</Text>
                    <Text style={styles.inlineValue}>{player.name}</Text>
                  </View>
                  <View style={styles.playerColumn}>
                    <Text style={styles.inlineLabel}>Anos</Text>
                    <Text style={styles.inlineValue}>{player.age}</Text>
                  </View>
                  <View style={styles.playerColumn}>
                    <Text style={styles.inlineLabel}>Camisa</Text>
                    <Text style={styles.inlineValue}>{player.shirt}</Text>
                  </View>
                  <View style={styles.playerColumn}>
                    <Text style={styles.inlineLabel}>Gols</Text>
                    <Text style={styles.inlineValue}>{player.goals}</Text>
                  </View>
                </View>

                <Text style={styles.sectionLabel}>Descrição</Text>
                <Text style={styles.playerDescription}>{player.description}</Text>

                <Text style={styles.sectionLabel}>Habilidades</Text>
                <View style={styles.featureGrid}>
                  {player.abilities.map((ability, abilityIndex) => (
                    <View key={abilityIndex} style={styles.featureItem}>
                      <View style={styles.featureIcon} />
                      <Text style={styles.featureText}>{ability}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            <Pressable style={styles.backButton} onPress={() => setActiveScreen(null)}>
              <Text style={styles.backButtonText}>Voltar</Text>
            </Pressable>
          </View>
        </View>
      )}
      {/* StatusBar define a cor dos ícones da barra de status do dispositivo */}
      <StatusBar style="dark" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Estilos aplicados ao container principal da tela.
  container: {
    flex: 1,
    backgroundColor: '#eff7ec',
  },
  content: {
    padding: 24,
    paddingBottom: 44,
  },
  menuWrapper: {
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
  },
  appHeader: {
    fontSize: 34,
    fontWeight: '900',
    color: '#00572d',
    marginBottom: 6,
  },
  appSubheader: {
    fontSize: 16,
    color: '#264a31',
    marginBottom: 22,
    lineHeight: 24,
    maxWidth: 620,
  },
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#ffcc00',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#00572d',
    shadowColor: '#00572d',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  menuItemPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  menuText: {
    color: '#0033a0',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  // Estilo do cartão que envolve a tela de perfis.
  card: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 32,
    padding: 22,
    overflow: 'hidden',
    shadowColor: '#00572d',
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 8,
  },
  // Elemento de fundo decorativo que cria um halo verde suave no cartão.
  cardPatternGrid: {
    position: 'absolute',
    top: -30,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(0, 83, 44, 0.12)',
  },
  // Círculo amarelo semi-transparente usado como detalhe visual no canto inferior.
  cardOverlayDots: {
    position: 'absolute',
    bottom: -18,
    left: -18,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 204, 0, 0.14)',
  },
  // Elemento de destaque em forma de aro para reforçar a estética do cartão.
  cardAccent: {
    position: 'absolute',
    top: 18,
    left: -10,
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    borderColor: 'rgba(0, 51, 160, 0.18)',
    opacity: 0.5,
  },
  cardTitleArea: {
    position: 'relative',
    padding: 18,
    backgroundColor: '#00572d',
    borderRadius: 24,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  // Cabeçalho da seção de perfis com título e tag.
  cardTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  cardSubtitle: {
    color: '#c8e69e',
    fontSize: 13,
    marginTop: 4,
  },
  cardTag: {
    color: '#00572d',
    backgroundColor: '#ffcc00',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 0.08,
  },
  cardBody: {
    position: 'relative',
    zIndex: 2,
  },
  // Cartão individual de cada jogador, com fundo levemente diferenciado.
  playerSection: {
    backgroundColor: '#eff7ec',
    borderRadius: 26,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#c3e4b6',
  },
  playerCategory: {
    fontSize: 16,
    fontWeight: '800',
    color: '#00572d',
    marginBottom: 6,
  },
  playerMeta: {
    color: '#264a31',
    marginBottom: 14,
    lineHeight: 20,
  },
  playerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  playerColumn: {
    width: '48%',
    marginBottom: 10,
  },
  inlineLabel: {
    fontSize: 12,
    color: '#264a31',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  inlineValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0033a0',
  },
  sectionLabel: {
    color: '#0033a0',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
  },
  playerDescription: {
    color: '#264a31',
    lineHeight: 22,
    fontSize: 14,
    marginBottom: 14,
  },
  // Grade de habilidades do jogador, exibida em dois colunas responsivas.
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#c3e4b6',
    marginBottom: 12,
  },
  featureIcon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ffcc00',
    marginRight: 12,
  },
  featureText: {
    color: '#264a31',
    fontSize: 13,
    flex: 1,
  },
  // Botão que volta para a tela inicial de seleção de posições.
  backButton: {
    backgroundColor: '#0033a0',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  backButtonText: {
    color: '#ffcc00',
    fontSize: 15,
    fontWeight: '800',
  },
});
