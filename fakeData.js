const faker = require("faker")

const User = require("./models/User");
const Post = require("./models/Post");

const createFakePost = async (id) => {
  try {
      const newPost = new Post({
        userId: id,
        title: faker.lorem.sentence(),
        text: faker.lorem.paragraph(),
      });
    const data = await newPost.save();
    
  } catch (err) {
      console.log(err);
  }
};

const createFakeUsers = async () => {
    try {
        for (let i = 1; i <= 5; i++) {
            const newUser = new User({
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                password: faker.internet.password(),
                email: faker.internet.email()
            });
            const data = await newUser.save();
            const { _id } = data
            for (let j = 1; j <= 5; j++){
                 createFakePost(_id)
            }}
    
        
    } catch (err) {
      console.log(err)
    }
};
  
const createInitialData = async () => {
    try {
        await User.deleteMany({});
        await Post.deleteMany({});
        await createFakeUsers();
    } catch (err) {
        console.log(err)
    }
}

module.exports = createInitialData