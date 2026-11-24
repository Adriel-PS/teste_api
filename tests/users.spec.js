const { test, expect } = require('../src/fixtures/apiFixture');
const { buildCreateUserPayload } = require('../src/data/payloads/userPayload');

test.describe('Testes de API - Usuários (/users)', () => {

  test('Deve listar todos os usuários com sucesso', async ({ userService }) => {
    const response = await userService.getAllUsers();

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('Deve obter um usuário por ID', async ({ userService }) => {
    const userId = 1;
    const response = await userService.getUserById(userId);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id', userId);
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('email');
  });

  test('Deve criar um novo usuário com sucesso', async ({ userService }) => {
    const newUserData = buildCreateUserPayload();
    const response = await userService.createUser(newUserData);

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toMatchObject({
      name: newUserData.name,
      email: newUserData.email,
    });
    expect(body).toHaveProperty('id');
  });

  test('Deve atualizar dados de um usuário via PUT', async ({ userService }) => {
    const userId = 1;
    const updateData = buildCreateUserPayload({ name: 'Nome Atualizado' });
    const response = await userService.updateUser(userId, updateData);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Nome Atualizado');
  });

  test('Deve atualizar parcialmente dados de um usuário via PATCH', async ({ userService }) => {
    const userId = 1;
    const patchData = { name: 'Nome Via Patch' };
    const response = await userService.partialUpdateUser(userId, patchData);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Nome Via Patch');
  });

  test('Deve remover um usuário com sucesso', async ({ userService }) => {
    const userId = 1;
    const response = await userService.deleteUser(userId);

    expect(response.status()).toBe(200);
  });
});
