function randomNumbers(cant) {
    
    const numbers = []
    
    for (let i = 0; i < cant; i++) {
        let random = Math.floor(Math.random() * (1000 - 1) + 1)

        let findNumber = numbers.find(el => el.number === random)

        if (!findNumber) {
            numbers.push({number: random, quantity: 1})
        } else {
            let quantity = findNumber.quantity
            findNumber.quantity = quantity + 1
        }
    }

    return numbers
}

process.on("message", msg => {
    const {cant} = msg

    if (!cant) {
        process.send(randomNumbers(20000))
    } else {
        process.send(randomNumbers(cant))
    }
})