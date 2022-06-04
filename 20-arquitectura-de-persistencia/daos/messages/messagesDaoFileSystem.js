const FileSystemContainer = require("../../containers/filesystemContainer");

class MessagesDaoFileSystem extends FileSystemContainer {
    constructor() {
        super("messages.txt")
    }
}

module.exports = MessagesDaoFileSystem;