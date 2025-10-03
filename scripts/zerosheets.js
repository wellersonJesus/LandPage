// ------------------------------
// Simulação de banco de dados em planilha
// ------------------------------

// Exemplo de estrutura de dados: visitas, técnicos e produtores
export const visits = [
    {
      id: 1,
      tecnico: 'Gleyson Bonfim',
      veiculo: 'PYC-9644',
      tipoVisita: 'Agendada',
      data: '2025-10-03',
      status: 'Realizada',
      produtor: '23696 ANA GONCALVES REIS',
      inconformidades: [],
      planoAcao: ''
    },
    {
      id: 2,
      tecnico: 'Outro Técnico',
      veiculo: 'XYZ-1234',
      tipoVisita: 'Pendente',
      data: '2025-10-05',
      status: 'Agendada',
      produtor: '12345 JOAO SILVA',
      inconformidades: ['Falta de registro'],
      planoAcao: 'Registrar dados faltantes'
    }
  ];
  
  // Exemplo de usuários/admin
  export const users = [
    {
      id: 1,
      email: 'admin@wsgestao.com',
      password: '1234',
      role: 'admin'
    },
    {
      id: 2,
      email: 'user@wsgestao.com',
      password: 'user123',
      role: 'user'
    }
  ];
  
  // Exemplo de métodos de consulta
  export const getVisitById = (id) => visits.find(v => v.id === id);
  
  export const getVisitsByTecnico = (nome) =>
    visits.filter(v => v.tecnico.toLowerCase() === nome.toLowerCase());
  
  export const validateUser = (email, password) =>
    users.find(u => u.email === email && u.password === password);
  