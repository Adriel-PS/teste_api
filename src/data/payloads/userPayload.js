/**
 * Factory para criação de payloads de teste de Usuário
 */
function buildCreateUserPayload(overrides = {}) {
  const timestamp = Date.now();
  return {
    name: `User Test ${timestamp}`,
    username: `usertest_${timestamp}`,
    email: `user_${timestamp}@example.com`,
    address: {
      street: 'Rua Exemplo',
      suite: 'Apto 101',
      city: 'São Paulo',
      zipcode: '01001-000',
    },
    phone: '11-99999-9999',
    website: 'example.com',
    company: {
      name: 'Empresa Teste',
      catchPhrase: 'Inovação e Qualidade',
      bs: 'soluções em tecnologia',
    },
    ...overrides,
  };
}

module.exports = {
  buildCreateUserPayload,
};
