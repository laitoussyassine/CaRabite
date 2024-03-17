import mongoose from "mongoose";

class Database {
    constructor(url,dbName) {
        this.url = url,
        this.dbName = dbName
    }
    async connectionDb() {
        try {
            await mongoose.connect(this.url, {
                dbName : this.dbName
            });
            console.log("db connected");
        } catch (error) {
            console.log(error);
        }
    }
}

export default Database;