export interface RegisterFormData {
  nome: string;
  cpf: string;
  email: string;
}

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};
export interface RegisterStepTwoFormData {
  senha: string;
  confirmarSenha: string;
}