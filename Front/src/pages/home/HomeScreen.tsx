import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Tipagem para a navegação (ajuste conforme o nome das rotas no seu AppNavigator)
type RootStackParamList = {
  Home: undefined;
  Relatar: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [relatos, setRelatos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os relatos cadastrados no banco de dados
  const buscarRelatos = async () => {
    try {
      // ⚠️ Substitua pelo IP da sua máquina se estiver testando no celular físico (ex: http://192.168.x.x:8080/api/relatos)
      // Se estiver usando o Emulador Android do Expo, use 'http://10.0.2.2:8080/api/relatos'
      const response = await fetch('http://localhost:8080/api/relatos');
      const data = await response.json();
      setRelatos(data);
    } catch (error) {
      console.error('Erro ao buscar relatos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarRelatos();
  }, []);

  return (
    <View style={styles.container}>
      {/* Topo / Header com Logo e Busca */}
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandGreen}>ROOSEM</Text>
          <Text style={styles.brandWhite}>PROBLEMAS</Text>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar"
            placeholderTextColor="#8E8E93"
          />
        </View>
      </View>

      {/* Lista de Relatos (Feed) */}
      <ScrollView contentContainerStyle={styles.feedList} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#00A3FF" style={{ marginTop: 40 }} />
        ) : relatos.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum relato cadastrado ainda.</Text>
        ) : (
          relatos.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                {/* Como o model tem 'descrição', usamos ela como título ou resumo */}
                <Text style={styles.cardTitle}>{item.descrição || 'Sem descrição'}</Text>
              </View>

              {/* Exibe a primeira foto se houver, ou uma imagem padrão */}
              <Image 
                source={{ 
                  uri: item.fotos && item.fotos.length > 0 
                    ? item.fotos[0].url // Ajuste conforme o atributo da sua classe Foto 
                    : 'https://via.placeholder.com/400' 
                }} 
                style={styles.cardImage} 
              />

              <View style={styles.cardFooter}>
                <Text style={styles.cardInfo}>
                  {item.enderecos ? `${item.enderecos.bairro || 'Endereço'} | ` : ''} {item.data}
                </Text>

                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.likeButton}>
                    <Ionicons name="thumbs-up-outline" size={18} color="#00A3FF" />
                    <Text style={styles.likeCount}>{item.curtidas || 0}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="share-social-outline" size={18} color="#FFFFFF" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="alert-circle-outline" size={19} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Barra de Navegação Inferior (Bottom Bar) */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.barItem}>
          <Ionicons name="document-text-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.barItem}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={18} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Botão de Adicionar Relato com Navegação */}
        <TouchableOpacity 
          style={styles.addButton} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Relatar')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.barItem}>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.barItem}>
          <Ionicons name="menu" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  brandContainer: {
    flexDirection: 'row',
  },
  brandGreen: {
    color: '#00FF00',
    fontSize: 16,
    fontWeight: '900',
  },
  brandWhite: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#3A3A3C',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 36,
    width: 150,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    paddingVertical: 0,
  },
  feedList: {
    padding: 16,
    paddingBottom: 90,
    gap: 16,
  },
  emptyText: {
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#3A3A3C',
    overflow: 'hidden',
  },
  cardHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#2C2C2E',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  cardInfo: {
    color: '#E5E5EA',
    fontSize: 12,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  likeCount: {
    color: '#00A3FF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  iconButton: {
    padding: 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#171717',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
    paddingHorizontal: 10,
  },
  barItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3A3A3C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#00A3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
    marginTop: -2,
  },
});