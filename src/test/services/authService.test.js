import { describe } from '@jest/globals';
import AuthService from '../../services/authService';
import bcryptjs from 'bcryptjs';
import Usuario from '../../models/usuario';

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {
  it('O usuario deve possuir um nome, email e senha', async () => {
    //arrange - o que se quer testar
    const usuarioMock = {
      nome: 'Thomaz',
      email: 'thomaz@test.com.br',
    };
    //act - onde buscar
    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);

    //assert - comparar arrange com asset
    await expect(usuarioSalvo).rejects.toThrowError('A senha de usuário é obrigatória!');

  });

  it('A senha do usuario precisa ser criptografada quando for salva no banco de dados', async () => {
    const usuarioMock = {
      nome: 'Thomaz',
      email: 'thomaz@test.com.br',
      senha: '123456',
    };
    const resultado = await authService.cadastrarUsuario(usuarioMock);
    const senhasIguais = await bcryptjs.compare('123456', resultado.content.senha);
    expect(senhasIguais).toStrictEqual(true);

    await Usuario.excluir(resultado.content.id);
  });

  it('Não pode ser cadastrado um usuário com e-mail duplicado', async () => {
    const usuarioMock = {
      nome: 'Thomaz',
      email: 'thomaz@teste.com.br',
      senha: '123456',
    };

    const usuarioSave = authService.cadastrarUsuario(usuarioMock);

    await expect(usuarioSave).rejects.toThrowError('O email já esta cadastrado!');
  });

    it('Ao cadastrar um usuário deve ser retornada uma mensagem informando que o usuário foi cadastrado', async () => {
    const data = {
      nome: 'John Doe',
      email: 'johndoe@teste.com',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);

    expect(resultado.message).toEqual('usuario criado');

    await Usuario.excluir(resultado.content.id);
  });

    it('Ao cadastrar um usuário, validar o retorno das informações do usuário', async () => {
    const data = {
      nome: 'Thomaz',
      email: 't@t',
      senha: '123456',
    };

    const resultado = await authService.cadastrarUsuario(data);

    expect(resultado.content).toMatchObject(data);

    await Usuario.excluir(resultado.content.id);
  });
});
