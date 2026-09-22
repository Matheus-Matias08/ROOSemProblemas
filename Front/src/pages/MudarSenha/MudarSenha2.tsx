import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

export default function TelaRedefinirSenha({ navigation }: any) {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Valida se as senhas foram preenchidas e se correspondem
  const isFormValid =
    novaSenha.length >= 6 && novaSenha === confirmarSenha;

  const handleMudarSenha = () => {
    if (isFormValid) {
      // Lógica de alteração de senha aqui
      navigation.navigate('TelaLogin');
    }
  };

  const handleGoToRegister = () => {
    if (navigation) {
      navigation.navigate('TelaRegistro');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
              {/* Logo */}
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../../assets/logo.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
                <View style={styles.brandTextContainer}>
                  <Text style={styles.brandGreen}>ROOSEM</Text>
                  <Text style={styles.brandWhite}>PROBLEMAS</Text>
                </View>
              </View>

              {/* Título de instrução */}
              <Text style={styles.titleText}>Digite sua nova senha</Text>

              {/* Formulário de Senha */}
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nova senha"
                  placeholderTextColor="#8E8E93"
                  secureTextEntry
                  value={novaSenha}
                  onChangeText={setNovaSenha}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Confirme a nova senha"
                  placeholderTextColor="#8E8E93"
                  secureTextEntry
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                />

                {/* Botão MUDAR */}
                <TouchableOpacity
                  style={[styles.button, isFormValid && styles.buttonActive]}
                  disabled={!isFormValid}
                  onPress={handleMudarSenha}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      isFormValid && styles.buttonTextActive,
                    ]}
                  >
                    MUDAR
                  </Text>
                </TouchableOpacity>

                {/* Link para criar conta */}
                <TouchableOpacity
                  style={styles.registerLink}
                  onPress={handleGoToRegister}
                >
                  <Text style={styles.registerLinkText}>Não possuo uma conta</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: 'rgba(23, 23, 23, 0.92)',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: 36,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  logoContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: 8,
    marginBottom: 20,
  },
  logoImage: {
    width: 60,
    height: 60,
    marginBottom: 6,
  },
  brandTextContainer: {
    alignItems: 'flex-start',
  },
  brandGreen: {
    color: '#00FF00',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0.5,
    lineHeight: 38,
  },
  brandWhite: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0.5,
    lineHeight: 38,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'flex-start',
    paddingLeft: 4,
    marginBottom: 16,
  },
  formContainer: {
    width: '100%',
    gap: 14,
  },
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#48484A',
    borderRadius: 26,
    paddingHorizontal: 20,
    color: '#FFFFFF',
    fontSize: 15,
    backgroundColor: 'transparent',
  },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#4A4A4A',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#E5E5EA',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  registerLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  registerLinkText: {
    color: '#00A3FF',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonActive: {
    backgroundColor: '#00FF00',
  },
  buttonTextActive: {
    color: '#000000',
  },
});