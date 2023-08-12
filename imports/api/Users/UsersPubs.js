

new PublishEndpoint('user.list', function () {
  return Meteor.users.find();
});