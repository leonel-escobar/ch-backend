
class MessageDTO {
    constructor(message) {
        this.author = message.author,
        this.date = message.date,
        this.text = message.text
        this.timestamp = message.timestamp
    }

    getAuthor() {
        return this.author
    }

    getDate() {
        return this.date
    }

    getText() {
        return this.text
    }

    getTimestamp() {
        return this.timestamp
    }
}

module.exports = MessageDTO;