export default {

  validateEmail(newEmail, userId) {
    //Buscar email
    const emailExists = Accounts.findUserByEmail(newEmail);
    //Validar si viene el userId quiere decir que va actualizar el usuario y si no viene, va a crear un usuario
    if (userId) {
      const oldUser = Meteor.users.findOne(userId);
      if (oldUser.emails[0].address !== newEmail && emailExists) {
        throw new Meteor.Error(403, 'El nuevo email ya se encuentra en uso');
      }
    } else if (emailExists) {
      throw new Meteor.Error(403, 'El nuevo email ya se encuentra en uso');
    }
  },

  validateUserName(newUsername, userId) {
    //Buscar email
    const usernameExists = Accounts.findUserByUsername(newUsername);
    //Validar si viene el userId quiere decir que va actualizar el usuario y si no viene, va a crear un usuario
    if (userId) {
      const oldUser = Meteor.users.findOne(userId);
      if (oldUser.username !== newUsername && usernameExists) {
        throw new Meteor.Error(403, 'El nuevo username ya se encuentra en uso');
      }
    } else if (usernameExists) {
      throw new Meteor.Error(403, 'El nuevo username ya se encuentra en uso');
    }
  },

  createUser(user) {
    Accounts.createUser({
      username: user.username,
      email: user.emails[0].address,
      profile: user.profile,
    });
  },

  updateUser(user) {
    //Buscar el usuario en BD y traer la información
    const currentUser = Meteor.users.findOne(user._id);

    //Si el email es diferente, entonces remover el email guardado y guardar el nuevo email
    if (currentUser.emails[0].address !== user.emails[0].address) {
      Accounts.removeEmail(currentUser._id, currentUser.emails[0].address);
      Accounts.addEmail(currentUser._id, user.emails[0].address);
    }

    //Si el username es diferente, entonces sobrescribir el username
    if (currentUser.username !== user.username) {
      Accounts.setUsername(currentUser._id, user.username);
    }

    //Actualizar los demas valores
    Meteor.users.update(user._id, {
      $set: {
        profile: {
          ...user.profile
        }
      }
    });
  },

  deleteUser({ userId }) {
    Meteor.users.remove(userId);
  }
}