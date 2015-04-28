Meteor.startup(() => {
  let room = Rooms.findOne();

  console.log(room);

  if (!room) {
    Rooms.insert({});
  }
})
