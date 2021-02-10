'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {

    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docent_id'
      }) //cria no banco por padrão uma coluna PessoaId
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: { status: 'confirmado' },
        as: 'aulasMatriculadas'
      })
    }
  };

  Pessoas.init({
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidora: function(dado) {
          if(dado.length < 3) throw new Error('o campo nome deve ter mais de 3 caracteres')
        }
      }
    },
    email: { 
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'dados do tipo e-mail inválido'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    defaultScope: {
      where: { ativo: true }
    },
    scopes: {
      todos: {
        where: {},
      }
    },
    modelName: 'Pessoas',
  });

  return Pessoas;
};