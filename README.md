# Blog API
Let’s make our small blog API.
The goal of this exercises is to get familiar with setting up an Express && Mongoose project.
Here is some step by step instructions.


- [ ] Setup a simple server with Express
- [ ] Setup a database connection with Mongoose
- [ ] Create two data models, one for Users and one for Posts
    - Users -> firstname, lastname, password, username, email
    - Posts -> user_id, title, text, date, image
- [ ] Create CRUD(Create Read Update Delete) endpoints for each of the data models. Please set up your project so you have routes and controllers in different locations.
- [ ] Write a seed script that will fill your db with 20 users and 5 posts per user.


SPOILERS
As you can see each post contains a user_id. It’s the id of the user that wrote that post. So, how will you approach the seed script to create 5 posts per user? You would need to get a hold of the ids of the fake users after you create them and pass them to the fake posts. 


## References

- https://expressjs.com/en/4x/api.html
- https://mongoosejs.com/docs/guides.html
- https://github.com/fbw-28/lc-record-store/tree/05-mongoose
- https://github.com/marak/Faker.js/
