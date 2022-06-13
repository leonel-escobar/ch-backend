const FileSystemContainer = require("../../containers/filesystemContainer");

class ProducsDaoFileSystem extends FileSystemContainer {
    constructor() {
        super("products.txt")
    }
}

module.exports = ProducsDaoFileSystem;