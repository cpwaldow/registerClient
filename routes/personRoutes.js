const router = require('express').Router();

const Person = require('../models/Person');

// Create - Criação de dados
router.post('/', async (req, res) => {
  // tratar os dados do body - req.boby

  // Esperado do req.body: {name: "Carlos", salary: 5000, approved: false}
  const { name, salary, approved, isWorking, dateBirthday } = req.body;

  if (!name) {
    res.status(422).json({ error: 'O nome é obrigatório!' });
    return;
  }

  const person = {
    name,
    salary,
    approved,
    isWorking,
    dateBirthday,
  };

  // create mongoose
  try {
    // criando dados
    await Person.create(person);

    res.status(201).json({ message: 'Pessoa inserida com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Read - Leitura de dados
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// rota dinâmica

router.get('/:id', async (req, res) => {
  // extrair o dado da requisição pela url = req.params

  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ error: 'Usuário não encontrado' });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update = atualização de dados (PUT / PATCH)
// PUT - Espera que mandemos o objeto completo para fazer atualização no sistema
// PATCH - atualização parcial, campos únicos

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved, isWorking, dateBirthday } = req.body;
  const person = {
    name,
    salary,
    approved,
    isWorking,
    dateBirthday,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ error: 'Usuário não encontrado' });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete - deletar dados
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const person = await Person.findOne({ _id: id });

  if (!person) {
    res.status(422).json({ error: 'Usuário não encontrado' });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: 'Usuário removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;