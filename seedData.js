const faker = require("faker");

const User = require("./models/User");
const Post = require("./models/Post");

const createInitialData = async () => {
  try {
    // delete data from db
    await User.deleteMany();
    await Post.deleteMany();

    const id = [];

    const usersPromises = new Array(20).fill(null).map(() => {
      const doc = new User({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        password: faker.internet.password(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
      });
      id.push(doc._id);
      return doc.save();
    });

      await Promise.all(usersPromises);
      
const postPromises =[]

      id.map(id => {
          const user_Id = id;
          const postPromise = new Array(5).fill(null).map(() => {
              const post = new Post({
                  user_Id,
                  title: faker.lorem.sentence(),
                  text: faker.lorem.paragraph(),
              });
              return post.save()
          })
          postPromises.push(postPromise);
      })
    await Promise.all(postPromises.flat())
  } catch (err) {
    console.log(err);
  }
};

module.exports = createInitialData;
