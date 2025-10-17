exports.login = (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@teste.com' && password === '123456') {
    return res.json({ message: 'Login realizado com sucesso!' });
  }

  return res.status(401).json({ error: 'Credenciais inválidas.' });
};

exports.register = (req, res) => {
  const { email } = req.body;
  return res.json({ message: `Usuário ${email} registrado com sucesso!` });
};
