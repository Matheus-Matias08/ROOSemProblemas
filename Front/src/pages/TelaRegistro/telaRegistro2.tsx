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
import { Ionicons } from '@expo/vector-icons'; // Importando os ícones
import { RegisterStepTwoFormData } from '../../types';

export default function TelaRegistroEtapa2({ route, navigation }: any) {
  // Resgata os dados (nome, cpf, email) vindos da primeira etapa
  const { nome, cpf, email } = route.params || {};

  console.log("Dados Recebidos da etapa 1: ", route.params);

  const [formData, setFormData] = useState<RegisterStepTwoFormData>({
    senha: '',
    confirmarSenha: '',
  });

  // Estados para controlar a visibilidade de cada senha de forma independente
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const handleChange = (field: keyof RegisterStepTwoFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Avança para a Etapa 3 repassando todos os dados acumulados
  const handleNextStep = () => {
    if (!isFormValid) return;

    // Nome da rota corrigido para coincidir com o AppNavigator (TelaRegistro3)
    navigation.navigate('TelaRegistro3', {
      nome,
      cpf,
      email,
      senha: formData.senha,
    });
  };

  const handleGoToLogin = () => {
    if (navigation) {
      navigation.navigate('Login');
    }
  };

  // Validação: as duas senhas devem ter pelo menos 6 caracteres e ser idênticas
  const isFormValid =
    formData.senha.length >= 6 &&
    formData.confirmarSenha.length >= 6 &&
    formData.senha === formData.confirmarSenha;

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
            
            {/* Card Principal Escuro */}
            <View style={styles.card}>
              
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

              {/* Form Inputs */}
              <View style={styles.formContainer}>
                
                {/* Campo Senha com Olhinho */}
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Senha"
                    placeholderTextColor="#8E8E93"
                    secureTextEntry={!mostrarSenha}
                    autoCapitalize="none"
                    value={formData.senha}
                    onChangeText={(val) => handleChange('senha', val)}
                  />
                  <TouchableOpacity 
                    style={styles.eyeButton} 
                    onPress={() => setMostrarSenha(!mostrarSenha)}
                  >
                    <Ionicons 
                      name={mostrarSenha ? 'eye' : 'eye-off'} 
                      size={20} 
                      color="#8E8E93" 
                    />
                  </TouchableOpacity>
                </View>

                {/* Campo Confirme a Senha com Olhinho */}
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirme a Senha"
                    placeholderTextColor="#8E8E93"
                    secureTextEntry={!mostrarConfirmarSenha}
                    autoCapitalize="none"
                    value={formData.confirmarSenha}
                    onChangeText={(val) => handleChange('confirmarSenha', val)}
                  />
                  <TouchableOpacity 
                    style={styles.eyeButton} 
                    onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                  >
                    <Ionicons 
                      name={mostrarConfirmarSenha ? 'eye' : 'eye-off'} 
                      size={20} 
                      color="#8E8E93" 
                    />
                  </TouchableOpacity>
                </View>

                {/* Botão Continuar para Endereço */}
                <TouchableOpacity
                  style={[
                    styles.button,
                    isFormValid && styles.buttonActive,
                  ]}
                  activeOpacity={0.8}
                  disabled={!isFormValid}
                  onPress={handleNextStep}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      isFormValid && styles.buttonTextActive,
                    ]}
                  >
                    CONTINUAR
                  </Text>
                </TouchableOpacity>

                {/* Link Já possuo uma conta */}
                <TouchableOpacity
                  style={styles.loginLink}
                  onPress={handleGoToLogin}
                >
                  <Text style={styles.loginLinkText}>Já possuo uma conta</Text>
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
  logoImage: {
    width: 60,
    height: 60,
    marginBottom: 6,
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
    marginBottom: 28,
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
  formContainer: {
    width: '100%',
    gap: 14,
  },
  passwordContainer: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#48484A',
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  passwordInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    height: '100%',
  },
  eyeButton: {
    padding: 4,
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
  loginLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginLinkText: {
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