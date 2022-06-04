const MongodbContainer = require("../../containers/mongodbContainer");
const userSchema = require("../../models/userSchema")

class UsersDaoMongoDB extends MongodbContainer {
    constructor() {
        super("users", userSchema)
    }

    async findByName(name) {
        try {
            return await this.collection.findOne({username: name});
        } catch (err) {
            console.log(err);
        }
    }

    async findByEmail(email) {
        try {
            return await this.collection.findOne({email: email});
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = UsersDaoMongoDB;