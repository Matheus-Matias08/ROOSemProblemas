import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { api } from '../../service/api';

type RootStackParamList = {
  Home: undefined;
  Relatar: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [relatos, setRelatos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Busca os relatos na API
  const buscarRelatos = async () => {
    try {
      const response = await api.get('/relatos/listar');
      setRelatos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar relatos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Recarrega os dados sempre que a tela receber foco
  useFocusEffect(
    useCallback(() => {
      buscarRelatos();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    buscarRelatos();
  };

  // Resolve o caminho da imagem retornado pelo Backend
  const resolverUriImagem = (item: any): string => {
    const fallback = 'https://via.placeholder.com/400';
    if (!item?.fotos || !Array.isArray(item.fotos) || item.fotos.length === 0) {
      return fallback;
    }

    const caminho = item.fotos[0]?.caminho;
    if (!caminho) return fallback;

    // Caso a imagem venha como HTTP/HTTPS externa ou Base64
    if (caminho.startsWith('http') || caminho.startsWith('data:image')) {
      return caminho;
    }

    // Pega apenas o nome do arquivo se o backend retornar caminho do Windows (C:\...) ou Linux (/...)
    const nomeArquivo = caminho.split(/[/\\]/).pop();
    const baseURL = api.defaults.baseURL?.replace(/\/$/, '') || '';

    return `${baseURL}/uploads/${nomeArquivo}`;
  };

  const renderCard = ({ item }: { item: any }) => {
    const imagemUri = resolverUriImagem(item);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            {item.titulo || item.descricao || 'Sem descrição'}
          </Text>
        </View>

        <Image
          source={{ uri: imagemUri }}
          style={styles.cardImage}
          resizeMode="cover"
        />

        <View style={styles.cardFooter}>
          <Text style={styles.cardInfo}>
            {item.enderecoTexto ? `${item.enderecoTexto} | ` : ''}
            {item.data || ''}
          </Text>

          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.likeButton}>
              <Ionicons name="thumbs-up-outline" size={18} color="#00A3FF" />
              <Text style={styles.likeCount}>{item.curtidas ?? 0}</Text>
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
    );
  };

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

      {/* Feed com FlatList */}
      {loading ? (
        <ActivityIndicator size="large" color="#00A3FF" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={relatos}
          keyExtractor={(item, index) => (item.id ? String(item.id) : `item-${index}`)}
          renderItem={renderCard}
          contentContainerStyle={styles.feedList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum relato cadastrado ainda.</Text>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#00A3FF" />
          }
        />
      )}

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
    padding: 12,
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