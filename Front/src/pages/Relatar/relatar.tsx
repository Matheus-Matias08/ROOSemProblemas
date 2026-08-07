import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  Switch,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RelatarScreen({ navigation }: any) {
  const [anonimo, setAnonimo] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Ouve quando o teclado abre ou fecha para ajustar o espaço sem quebrar a barra inferior
  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        {/* Header com Logo e Botão Enviar */}
        <View style={styles.header}>
          <View style={styles.brandContainer}>
            <Text style={styles.brandGreen}>ROOSEM</Text>
            <Text style={styles.brandWhite}>PROBLEMAS</Text>
          </View>

          <TouchableOpacity style={styles.sendButton} activeOpacity={0.8}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={[
            styles.formContainer, 
            { paddingBottom: keyboardHeight > 0 ? keyboardHeight + 40 : 120 }
          ]} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Caixa de Foto */}
          <TouchableOpacity style={styles.imagePickerBox} activeOpacity={0.8}>
            <Ionicons name="camera-outline" size={54} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Switch Relato Anônimo */}
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Relato Anônimo</Text>
            <Switch
              trackColor={{ false: '#3A3A3C', true: '#00A3FF' }}
              thumbColor={anonimo ? '#FFFFFF' : '#f4f3f4'}
              onValueChange={() => setAnonimo(!anonimo)}
              value={anonimo}
            />
          </View>

          {/* Input Título */}
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Titulo:"
              placeholderTextColor="#8E8E93"
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>

          {/* Input Endereço */}
          <View style={styles.inputBoxIcon}>
            <TextInput
              style={styles.inputFlex}
              placeholder="Endereço:"
              placeholderTextColor="#8E8E93"
              value={endereco}
              onChangeText={setEndereco}
            />
            <Ionicons name="location-sharp" size={20} color="#FFFFFF" />
          </View>

          {/* Input Descrição */}
          <View style={styles.textAreaBox}>
            <TextInput
              style={styles.textArea}
              placeholder="Descreva o relato:"
              placeholderTextColor="#8E8E93"
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>
        </ScrollView>

        {/* Barra de Navegação Inferior (Fica fixa na base certinha) */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.barItem} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="document-text-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.barItem}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
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
  sendButton: {
    backgroundColor: '#3A3A3C',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sendButtonText: {
    color: '#8E8E93',
    fontWeight: 'bold',
    fontSize: 14,
  },
  formContainer: {
    padding: 16,
    gap: 14,
  },
  imagePickerBox: {
    width: '100%',
    height: 180,
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#3A3A3C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#3A3A3C',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  switchLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  inputBox: {
    backgroundColor: '#1C1C1E',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#3A3A3C',
    paddingHorizontal: 14,
    height: 48,
    justifyContent: 'center',
  },
  inputBoxIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#3A3A3C',
    paddingHorizontal: 14,
    height: 48,
  },
  input: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  inputFlex: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  textAreaBox: {
    backgroundColor: '#1C1C1E',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#3A3A3C',
    paddingHorizontal: 14,
    paddingVertical: 10,
    height: 140,
  },
  textArea: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
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