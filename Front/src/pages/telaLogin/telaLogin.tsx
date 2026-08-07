import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
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

export default function TelaLogin({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Validação simples para habilitar o botão de entrar
  const isFormValid = email.includes('@') && email.includes('.') && senha.length > 0;

  const handleLogin = async () => {
    if (isFormValid) {
      try {
        const response = await fetch('http://172.16.236.10:8080/usuarios/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            senha: senha,
          }),
        });

        console.log('Status code retornado:', response.status);
        const respostaTexto = await response.text();
        console.log('Corpo da resposta do servidor:', respostaTexto);

        if (response.ok) {
          const usuarioLogado = JSON.parse(respostaTexto);
          console.log('Login realizado com sucesso:', usuarioLogado);
          
          // Vai direto para a Home sem barreiras
          navigation.replace('Home');
        } else {
          alert(`Erro ${response.status}: ${respostaTexto || 'E-mail ou senha incorretos!'}`);
        }
      } catch (error) {
        console.error('Erro de rede ou ao conectar com o servidor:', error);
        alert('Não foi possível conectar ao servidor. Verifique o console.');
      }
    }
  };

  const handleGoToRegister = () => {
    navigation.navigate('TelaRegistro1');
  };

  const handleForgotPassword = () => {
    console.log('Ir para recuperar senha');
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

              <Text style={styles.slogan}>Ajude a cidade a tornar melhor!</Text>

              {/* Form Inputs */}
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor="#8E8E93"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />

                {/* Campo de Senha com o Olhinho */}
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Senha"
                    placeholderTextColor="#8E8E93"
                    secureTextEntry={!mostrarSenha}
                    value={senha}
                    onChangeText={setSenha}
                  />
                  
                  <TouchableOpacity 
                    style={styles.eyeButton} 
                    onPress={() => setMostrarSenha(!mostrarSenha)}
                    >
                    {/* 2. Substitui o emoji pelo componente de ícone */}
                    <Ionicons 
                        name={mostrarSenha ? 'eye' : 'eye-off'} 
                        size={20} 
                        color="#8E8E93" 
                    />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.forgotPasswordLink}
                  onPress={handleForgotPassword}
                >
                  <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
                </TouchableOpacity>

                {/* Botão Entrar que vai para a HomeScreen */}
                <TouchableOpacity
                  style={[styles.button, isFormValid && styles.buttonActive]}
                  disabled={!isFormValid}
                  onPress={handleLogin}
                >
                  <Text style={[styles.buttonText, isFormValid && styles.buttonTextActive]}>
                    ENTRAR
                  </Text>
                </TouchableOpacity>

                {/* Link para o Registro */}
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
    marginBottom: 12,
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
  slogan: {
    width: '100%',
    paddingLeft: 8,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 24,
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
  eyeIcon: {
    fontSize: 18,
  },
  forgotPasswordLink: {
    alignItems: 'flex-end',
    marginRight: 8,
    marginTop: -4,
    marginBottom: 4,
  },
  forgotPasswordText: {
    color: '#00A3FF',
    fontSize: 13,
    fontWeight: '500',
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
  buttonActive: {
    backgroundColor: '#00FF00',
  },
  buttonTextActive: {
    color: '#000000',
  },
  registerLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  registerLinkText: {
    color: '#00A3FF',
    fontSize: 15,
    fontWeight: '600',
  },
});