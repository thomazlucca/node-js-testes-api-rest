import { describe } from '@jest/globals';
import AuthService from '../../services/authService';

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {
  it('O usuario deve possuir um nome, email e senha', async () => {
    //arrange - o que se quer testar
    const usuarioMock = {
      nome: 'Thomaz',
      email: 'thomaz@teste.com.br',
    };
    //asset - onde buscar
    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);

    //assert - comparar arrange com asset
    await expect(usuarioSalvo).rejects.toThrowError('A senha de usuário é obrigatória!');
  });
});
