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
import { RegisterFormData } from '../../types';

export default function TelaRegistro({ navigation }: any) {
  const [formData, setFormData] = useState<RegisterFormData>({
    nome: '',
    cpf: '',
    email: '',
  });

  // Função para formatar o CPF no padrão 000.000.000-00
  const formatCPF = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const truncated = cleaned.slice(0, 11);

    return truncated
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  // Função para capitalizar a primeira letra de cada nome
  const formatName = (text: string) => {
    return text.replace(/(^\w|\s\w)/g, (letter) => letter.toUpperCase());
  };
  
  const handleNameChange = (value: string) => {
    const formattedName = formatName(value);
    setFormData((prev) => ({ ...prev, nome: formattedName }));
  };
  
  const handleCpfChange = (value: string) => {
    const formattedCpf = formatCPF(value);
    setFormData((prev) => ({ ...prev, cpf: formattedCpf }));
  };
  
  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoToLogin = () => {
    if (navigation) {
      navigation.navigate('Login');
    }
  };

  // Verifica se o nome tem texto, se o CPF está completo (14 chars) e se o e-mail é válido
  const isFormValid =
    formData.nome.trim().length > 0 &&
    formData.cpf.length === 14 &&
    formData.email.includes('@') &&
    formData.email.includes('.');

const handleNext = () => {
  if (isFormValid) {
    navigation.navigate('TelaRegistro2', {
      nome: formData.nome,
      cpf: formData.cpf,
      email: formData.email,
    });
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
            
            {/* Card Principal Escuro (AQUI ESTAVA FALTANDO A ABERTURA) */}
            <View style={styles.card}>
              
              <View style={styles.logoContainer}>
                {/* Logo / Ícone */}
                <Image 
                  source={require('../../../assets/logo.png')} 
                  style={styles.logoImage} 
                  resizeMode="contain" 
                /> 
                
                {/* Texto da Logo Alinhado à Esquerda */}
                <View style={styles.brandTextContainer}>
                  <Text style={styles.brandGreen}>ROOSEM</Text>
                  <Text style={styles.brandWhite}>PROBLEMAS</Text>
                </View>
              </View>

              {/* Form Inputs */}
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nome"
                  placeholderTextColor="#8E8E93"
                  autoCapitalize="words"
                  value={formData.nome}
                  onChangeText={handleNameChange}
                />

                {/* Campo CPF */}
                <TextInput
                  style={styles.input}
                  placeholder="CPF"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  maxLength={14}
                  value={formData.cpf}
                  onChangeText={handleCpfChange}
                />

                {/* Campo E-mail */}
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor="#8E8E93"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(val) => handleChange('email', val)}
                />

                {/* Botão Continuar */}
                <TouchableOpacity
                  style={[styles.button, isFormValid && styles.buttonActive]}
                  disabled={!isFormValid}
                  onPress={handleNext}
                >
                  <Text style={[styles.buttonText, isFormValid && styles.buttonTextActive]}>
                    CONTINUAR
                  </Text>
                </TouchableOpacity>

                {/* Link para Login */}
                <TouchableOpacity
                  style={styles.loginLink}
                  onPress={handleGoToLogin}
                >
                  <Text style={styles.loginLinkText}>Já possuo uma conta</Text>
                </TouchableOpacity>
              </View>

            </View> {/* Fechamento do Card */}

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
    marginBottom: 28,
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