const { database } = require("firebase-admin");
const admin = require("firebase-admin");

const serviceAccount = require("../utils/app-coder-backend-28220-firebase-adminsdk-qmgnx-769eddba41.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseUrl: "https://app-coder-backend-28220.firebaseio.com"
});

class FirebaseContainer{
    constructor(collection) {
        this.FieldValue = admin.firestore.FieldValue;
        this.db = admin.firestore();
        this.query = this.db.collection(collection);
    }

    async save(obj) {
        try {
            obj.timestamp = Date().toLocaleString();
            let doc = this.query.doc()
            return await doc.create(obj)
        } catch (err) {
            console.log(err);
        }
    }

    async getById(id) {
        try {
            let doc = this.query.doc(id)
            let item = await doc.get()
            return item.data() 
        } catch (err) {
            console.log(err);
        }
    }

    async getAll() {
        try {
            const querySnapshop = await this.query.get()
            let docs = querySnapshop.docs;
            const res = docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                description: doc.data().description,
                code: doc.data().code,
                image: doc.data().image,
                price: doc.data().price,
                stock: doc.data().stock
            }));
            return res
        } catch (err) {
            console.log(err);
        }
    }

    async updateById(id, newData) {
        try {
            const doc = this.query.doc(id)
            await doc.update(newData)
        } catch (err) {
            console.log(err);
        }
    }

    async deleteById(id) {
        try {
            const doc = this.query.doc(id)
            await doc.delete()
        } catch (err) {
            console.log();
        }
    }
}

module.exports = FirebaseContainer;