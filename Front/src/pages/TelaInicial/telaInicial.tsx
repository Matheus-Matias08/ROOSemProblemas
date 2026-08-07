import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';

export default function TelaInicial({ navigation }: any) {
  const handleGoToLogin = () => {
    navigation.navigate('TelaLogin');
  };

  const handleGoToRegister = () => {
    navigation.navigate('TelaRegistro1');
  };

  const handleGovLogin = () => {
    console.log('Entrar com GOV.BR pressionado');
  };
  

  return (
    <ImageBackground
      source={require('../../../assets/images.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        
        {/* Card Principal Escuro (Igual às outras telas) */}
        <View style={styles.card}>
          
          {/* Logo + Texto DENTRO do Card */}
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

          {/* Botões de Ação */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonOutline}
              activeOpacity={0.8}
              onPress={handleGoToLogin}
            >
              <Text style={styles.buttonTextWhite}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonOutline}
              activeOpacity={0.8}
              onPress={handleGoToRegister}
            >
              <Text style={styles.buttonTextWhite}>CRIAR CONTA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonGreen}
              activeOpacity={0.8}
              onPress={handleGovLogin}
            >
              <Text style={styles.buttonTextGreen}>ENTRAR COM GOV</Text>
            </TouchableOpacity>
          </View>

        </View>

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
    marginBottom: 32,
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
  buttonsContainer: {
    width: '100%',
    gap: 14,
  },
  buttonOutline: {
    width: '100%',
    height: 52,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonGreen: {
    width: '100%',
    height: 52,
    backgroundColor: '#00FF00',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  buttonTextWhite: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  buttonTextGreen: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
});