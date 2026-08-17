import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../service/api';

export default function RelatarScreen({ navigation, route }: any) {
  const [anonimo, setAnonimo] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  // Busca o ID do usuário salvo e a localização ao carregar a tela
  useEffect(() => {
    carregarUsuarioLogado();
    obterLocalizacaoAtual();
  }, []);

  const carregarUsuarioLogado = async () => {
    try {
      // Tenta resgatar o ID salvo no AsyncStorage
      const idSalvo = await AsyncStorage.getItem('@usuario_id');
      if (idSalvo) {
        setUsuarioId(idSalvo);
      } else if (route.params?.usuarioId) {
        // Fallback caso venha via navegação
        setUsuarioId(String(route.params.usuarioId));
      }
    } catch (error) {
      console.log('Erro ao carregar ID do usuário:', error);
    }
  };

  const obterLocalizacaoAtual = async () => {
    setLoadingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Não foi possível acessar a localização. Você pode digitar o endereço manualmente.'
        );
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode && reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        const rua = address.street || address.name || '';
        const numero = address.streetNumber ? `, ${address.streetNumber}` : '';
        const bairro = address.district || address.subregion ? ` - ${address.district || address.subregion}` : '';
        
        const enderecoCompleto = `${rua}${numero}${bairro}`.trim();

        if (enderecoCompleto) {
          setEndereco(enderecoCompleto);
        } else {
          setEndereco(`Lat: ${location.coords.latitude.toFixed(4)}, Long: ${location.coords.longitude.toFixed(4)}`);
        }
      }
    } catch (error) {
      console.log('Erro ao obter localização:', error);
      Alert.alert(
        'Aviso de Sinal',
        'Não foi possível obter o endereço exato pelo GPS. Por favor, digite a localização.'
      );
    } finally {
      setLoadingLocation(false);
    }
  };

  const selecionarOuTirarFoto = () => {
    Alert.alert(
      'Adicionar Foto',
      'Escolha como deseja enviar a imagem:',
      [
        { text: 'Câmera', onPress: abrirCamera },
        { text: 'Galeria', onPress: abrirGaleria },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.5, // Qualidade reduzida para evitar erros de limite no Spring Boot
    });

    if (!result.canceled && result.assets[0].uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  const abrirCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a câmera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.5, // Qualidade reduzida para evitar erros de limite no Spring Boot
    });

    if (!result.canceled && result.assets[0].uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSendRelato = async () => {
    if (!usuarioId || usuarioId === 'undefined') {
      Alert.alert(
        'Sessão expirada', 
        'Não foi possível identificar o usuário logado. Por favor, faça login novamente.'
      );
      return;
    }

    if (!titulo.trim() || !descricao.trim()) {
      Alert.alert('Atenção', 'Preencha o título e a descrição do relato.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('titulo', titulo.trim());
      formData.append('descricao', descricao.trim());
      formData.append('endereco', endereco.trim());
      formData.append('anonimo', String(anonimo));
      formData.append('usuarioId', String(usuarioId));

      if (imageUri) {
        const filename = imageUri.split('/').pop() || 'relato.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const ext = match ? match[1].toLowerCase() : 'jpeg';
        const type = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;

        formData.append('foto', {
          uri: Platform.OS === 'android' ? imageUri : imageUri.replace('file://', ''),
          name: filename,
          type: type,
        } as any);
      }

      await api.post('/relatos/cadastrar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Alert.alert('Sucesso', 'Relato enviado com sucesso!');
      navigation.navigate('Home');
    } catch (error: any) {
      console.log('Erro ao enviar relato:', error?.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível salvar o relato.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.rootContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.header}>
          <Text style={styles.brandGreen}>ROOSEM<Text style={styles.brandWhite}>PROBLEMAS</Text></Text>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendRelato} disabled={loading}>
            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.sendButtonText}>Enviar</Text>}
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={styles.formContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity style={styles.imagePickerBox} onPress={selecionarOuTirarFoto}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            ) : (
              <Ionicons name="camera-outline" size={54} color="#FFFFFF" />
            )}
          </TouchableOpacity>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Relato Anônimo</Text>
            <Switch
              trackColor={{ false: '#3A3A3C', true: '#00A3FF' }}
              value={anonimo}
              onValueChange={setAnonimo}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Título:"
            placeholderTextColor="#8E8E93"
            value={titulo}
            onChangeText={setTitulo}
          />

          <View style={styles.inputBoxIcon}>
            <TextInput
              style={styles.inputFlex}
              placeholder="Endereço:"
              placeholderTextColor="#8E8E93"
              value={endereco}
              onChangeText={setEndereco}
            />
            <TouchableOpacity 
              onPress={obterLocalizacaoAtual} 
              activeOpacity={0.7}
              style={{ padding: 4 }}
            >
              {loadingLocation ? (
                <ActivityIndicator size="small" color="#00A3FF" />
              ) : (
                <Ionicons name="location-sharp" size={24} color="#00A3FF" />
              )}
            </TouchableOpacity>
          </View>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva o relato:"
            placeholderTextColor="#8E8E93"
            multiline
            numberOfLines={5}
            value={descricao}
            onChangeText={setDescricao}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: { flex: 1, backgroundColor: '#121212' },
  container: { flex: 1, paddingTop: 44 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderColor: '#2C2C2E' },
  brandGreen: { color: '#00FF00', fontSize: 16, fontWeight: '900' },
  brandWhite: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  sendButton: { backgroundColor: '#00FF00', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16 },
  sendButtonText: { color: '#000', fontWeight: 'bold' },
  formContainer: { padding: 16, gap: 14 },
  imagePickerBox: { width: '100%', height: 180, backgroundColor: '#1C1C1E', borderRadius: 16, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  previewImage: { width: '100%', height: '100%' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1C1C1E', borderRadius: 14, padding: 14 },
  switchLabel: { color: '#FFF', fontWeight: 'bold' },
  input: { backgroundColor: '#1C1C1E', borderRadius: 14, paddingHorizontal: 14, height: 48, color: '#FFF' },
  inputBoxIcon: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C1E', borderRadius: 14, paddingHorizontal: 14, height: 48 },
  inputFlex: { flex: 1, color: '#FFF' },
  textArea: { height: 120, textAlignVertical: 'top', paddingTop: 12 },
});