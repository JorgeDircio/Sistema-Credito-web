import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { check } from 'meteor/check';
import { ResponseMessage } from '../../startup/server/utilities/ResponseMessage';
import UserService from './UserService';

new ValidatedMethod({
  name: 'user.save',
  validate(user) {
    try {
      check(user, {
        _id: Match.OneOf(String, null),
        username: String,
        emails: [{ address: String, verified: Boolean }],
        profile: {
          profile: String,
          name: String,
          path: Match.OneOf(String, null)
        }
      });
    } catch (error) {
      console.log('Error user: ', error);
      throw new Meteor.Error('403', 'La información introducida no es valida');
    }
    UserService.validateEmail(user.emails[0].address, user._id);
    UserService.validateUserName(user.username, user._id);
  },
  run(user) {
    const response = new ResponseMessage();

    //Actualizado de usuario
    if (user._id) {
      try {

        //Llamar al metodo para actualizar
        UserService.updateUser(user);

        response.create({
          status: 200,
          message: 'El usuario ha sido actualizado correctamente',
        });

        return response.getResponse();
      } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw new Meteor.Error('500', 'Ha ocurrido un error al crear el usuario', error);
      }
    } else {
      try {
        //Llamar al metodo para actualizar
        UserService.createUser(user);

        response.create({
          status: 201,
          message: 'El usuario ha sido creado correctamente',
        });
        return response.getResponse();
      } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw new Meteor.Error('500', 'Ha ocurrido un error al crear el usuario', error);
      }
    }
  }
});

new ValidatedMethod({
  name: 'user.delete',
  validate({ userId }) {
    try {
      check(userId, String);
    } catch (error) {
      console.log('Error eliminar usuario ', error);
      throw new Meteor.Error('500', 'La información introducida no es correctamente');
    }
  },
  run({ userId }) {
    try {
      const response = new ResponseMessage();
      const userExists = Meteor.users.findOne(userId);
      if (!userExists) {
        response.create({
          status: 204,
          message: 'El usuario no existe'
        });
      } else {
        UserService.deleteUser({ userId });
        response.create({
          status: 200,
          message: 'El usuario ha sido eliminado correctamente'
        });
      }
      return response.getResponse();
    } catch (error) {
      console.log('Error eliminar usuario ', error);
      throw new Meteor.Error('500', 'Ha ocurrido un error al intentar eliminar el usuario');
    }
  }
});

new ValidatedMethod({
  name: 'user.login',
  validate() {
  },
  run(user) {
    console.log('valores que vienene => ', user);
    return Meteor.users.find().fetch();
  }
});