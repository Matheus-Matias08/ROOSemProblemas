import React, { useState, useRef } from 'react';
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

export default function TelaValidacaoCodigo({ navigation }: any) {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Avança para o próximo input automaticamente ao digitar
    if (text && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Volta para o input anterior se apagar
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const isCodeComplete = code.every((digit) => digit.trim().length === 1);

  const handleProsseguir = () => {
    if (isCodeComplete) {
      navigation.navigate('MudarSenha2');
    }
  };

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack();
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
              {/* Seta de Voltar */}
              <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <Text style={styles.backButtonText}>←</Text>
              </TouchableOpacity>

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

              {/* Mensagem Explicativa */}
              <Text style={styles.instructionsText}>
                Enviamos um código no seu Email para validar a troca de senha
              </Text>

              {/* Inputs do Código */}
              <View style={styles.codeContainer}>
                {code.map((digit, index) => (
                  <React.Fragment key={index}>
                    <TextInput
                      ref={(el) => (inputsRef.current[index] = el)}
                      style={[
                        styles.codeInput,
                        digit ? styles.codeInputFilled : null,
                      ]}
                      keyboardType="numeric"
                      maxLength={1}
                      value={digit}
                      onChangeText={(text) => handleCodeChange(text, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                    />
                    {index === 2 && <Text style={styles.separator}>-</Text>}
                  </React.Fragment>
                ))}
              </View>

              {/* Link Reenviar código */}
              <TouchableOpacity style={styles.resendLink}>
                <Text style={styles.resendLinkText}>Reenviar código</Text>
              </TouchableOpacity>

              {/* Botão Prosseguir */}
              <TouchableOpacity
                style={[styles.button, isCodeComplete && styles.buttonActive]}
                disabled={!isCodeComplete}
                onPress={handleProsseguir}
              >
                <Text
                  style={[
                    styles.buttonText,
                    isCodeComplete && styles.buttonTextActive,
                  ]}
                >
                  Prosseguir
                </Text>
              </TouchableOpacity>
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
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: 8,
    marginTop: 15,
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
  instructionsText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 6,
    marginBottom: 16,
  },
  codeInput: {
    width: 44,
    height: 48,
    borderWidth: 1,
    borderColor: '#48484A',
    borderRadius: 22,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  codeInputFilled: {
    borderColor: '#FFFFFF',
  },
  separator: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendLink: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  resendLinkText: {
    color: '#00A3FF',
    fontSize: 13,
    fontWeight: '600',
  },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#4A4A4A',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
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
});