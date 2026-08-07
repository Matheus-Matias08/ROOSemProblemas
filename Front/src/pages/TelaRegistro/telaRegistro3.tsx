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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { api } from '../../service/api';

export default function TelaRegistroEtapa3({ route, navigation }: any) {
  // Resgata todos os dados acumulados nas Etapas 1 e 2
  const { nome, cpf, email, senha } = route.params || {};

  const [loading, setLoading] = useState(false);
  
  // Estado espelhando EXATAMENTE os atributos da classe Endereco no Java
  const [formData, setFormData] = useState({
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFinishRegister = async () => {
    setLoading(true);

    try {
      // PASSO 1: Envia o POST para cadastrar o Endereço primeiro
      const payloadEndereco = {
        cep: formData.cep,
        rua: formData.rua,
        numero: formData.numero,
        bairro: formData.bairro,
      };

      console.log("1. Cadastrando Endereço...", payloadEndereco);
      // Certifique-se de que no Spring Boot existe um @PostMapping neste caminho:
      const resEndereco = await api.post('/enderecos/cadastrar', payloadEndereco); 
      
      // Captura o ID gerado pelo banco de dados para o endereço recém-criado
      const idEnderecoCriado = resEndereco.data.id; 
      console.log("-> ID do Endereço criado:", idEnderecoCriado);

      // PASSO 2: Com o ID em mãos, envia o POST do Usuário
      const payloadUsuario = {
        nome,
        cpf,
        email,
        senha,
        idEndereco: idEnderecoCriado, // Passa a referência para salvar na chave estrangeira
      };

      console.log("2. Cadastrando Usuário...", payloadUsuario);
      const resUsuario = await api.post('/usuarios/cadastrar', payloadUsuario);

      if (resUsuario.status === 201 || resUsuario.status === 200) {
        // Navega direto para a Home assim que o servidor responder
        navigation.reset({
          index: 0,
          routes: [{ name: 'TelaLogin' }],
        });
      }
    } catch (error: any) {
      console.error('Erro no fluxo de cadastro:', error?.response?.data || error.message);

      const errorMessage =
        error?.response?.data?.message ||
        'Não foi possível concluir o cadastro. Verifique a conexão com a API.';

      Alert.alert('Erro no Cadastro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    if (navigation) {
      navigation.navigate('Login');
    }
  };

  // Validação: Exige que os 4 campos do endereço sejam preenchidos
  const isFormValid =
    formData.cep.trim().length > 0 &&
    formData.rua.trim().length > 0 &&
    formData.numero.trim().length > 0 &&
    formData.bairro.trim().length > 0;

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

              {/* Form Inputs de Endereço */}
              <View style={styles.formContainer}>
                
                {/* Campo CEP */}
                <TextInput
                  style={styles.input}
                  placeholder="CEP"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  value={formData.cep}
                  onChangeText={(val) => handleChange('cep', val)}
                />

                {/* Campo Rua */}
                <TextInput
                  style={styles.input}
                  placeholder="Rua"
                  placeholderTextColor="#8E8E93"
                  value={formData.rua}
                  onChangeText={(val) => handleChange('rua', val)}
                />

                {/* Campo Número */}
                <TextInput
                  style={styles.input}
                  placeholder="Número"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  value={formData.numero}
                  onChangeText={(val) => handleChange('numero', val)}
                />

                {/* Campo Bairro */}
                <TextInput
                  style={styles.input}
                  placeholder="Bairro"
                  placeholderTextColor="#8E8E93"
                  value={formData.bairro}
                  onChangeText={(val) => handleChange('bairro', val)}
                />

                {/* Botão Cadastrar Final */}
                <TouchableOpacity
                  style={[
                    styles.button,
                    isFormValid && styles.buttonActive,
                  ]}
                  activeOpacity={0.8}
                  disabled={!isFormValid || loading}
                  onPress={handleFinishRegister}
                >
                  {loading ? (
                    <ActivityIndicator color="#000000" />
                  ) : (
                    <Text
                      style={[
                        styles.buttonText,
                        isFormValid && styles.buttonTextActive,
                      ]}
                    >
                      FINALIZAR CADASTRO
                    </Text>
                  )}
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