Template.multi.helpers({
  players: function () {
    let room = Rooms.findOne();
    return room.users;
  }
});

Template.multi.rendered = function () {
  let room = Rooms.findOne();
  room.users = room.users || [];
  room.users.push(Meteor.user());
  Rooms.update(room._id, room);
}
