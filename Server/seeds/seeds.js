const db = require('../config/connection');
const { User, Profile, Message, Project, File } = require('../models');

db.once('open', async () => {
    let users = await User.insertMany(userSeed)
    const newProfile = [{
        user: null, // You can set this to a valid user ID
        projects: [], // You can set this to an array of valid project IDs
        location: 'Some Location',
        bio: 'Some Bio',
        image: 'path/to/image.jpg', // You can set this to the path of an image file
      },
      {
        user: null, // You can set this to a valid user ID
        projects: [], // You can set this to an array of valid project IDs
        location: 'Some other Location',
        bio: 'Some  other Bio',
        image: 'path/to/image.jpg', // You can set this to the path of an image file
      }];
      newProfile.forEach((el, index)=>{
        el.user = users[index]._id
      })
      let profile = await Profile.insertMany(newProfile)
    return
})



const userSeed = [
    {
        first: "taylor",
        last: "last_name_1",
        email: "paylor1@example.com",
        password: "password12222"
    },
    {
        first: "taylor",
        last: "last_name_2",
        email: "paylor2@example.com",
        password: "password233333"
    },
    
];