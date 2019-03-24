let option = ''
let array = [1, 2, 3, 8, 7, 4, ' ', 7, 4]
let blank = 6
const N = 3

process.stdin.resume()

console.log("Ingrese un movimiento: ")

process.stdin.on("data", function (x) {

    option = String(x).trim().toUpperCase()
    console.log("El mov ingresado fue: " + option)

    if (option === "-1") {
        process.exit()
    }

    array = curriedApplyMove(blank, 3)(array, option)

    console.log(array)

    console.log("Ingrese un movimiento: ")
})

// Cambia 2 elementos del arreglo
// En caso que el cambio sea inválido, retorna el mismo elemento
const swap = (array, x, y, n) => ((x >= 0 && y >= 0) && (x <= n * n - 1 && y <= n * n - 1)) ? ([array[x], array[y]] = [array[y], array[x]], array) : array

const curriedApplyMove = (index_of_blank, n) => {
    return (array, move) => {
        switch (move) {
            case "DOWN":
                return swap(array, index_of_blank, getIndex(indexToColumn(index_of_blank, n), indexToRow(index_of_blank, n) - 1, n), n)
            case "UP":
                return swap(array, index_of_blank, getIndex(indexToColumn(index_of_blank, n), indexToRow(index_of_blank, n) + 1, n), n)
            case "RIGHT":
                return swap(array, index_of_blank, getIndex(indexToColumn(index_of_blank, n) - 1, indexToRow(index_of_blank, n), n), n)
            case "LEFT":
                return swap(array, index_of_blank, getIndex(indexToColumn(index_of_blank, n) + 1, indexToRow(index_of_blank, n), n), n)

        }
    }
}

const valid = (array, length) => {
    return array.reduce((prevValue, currentValue, i) => {
        if (i < length - 1) {
            if (prevValue['valid'] === true) {
                return prevValue['value'] < currentValue ? { ...prevValue, value: currentValue } : { valid: false }
            }
        }
        return prevValue
    }, { value: -1, valid: true })
}

const indexToColumn = (i, n) => {
    return i % n
}

const indexToRow = (i, n) => {
    return parseInt(i / n)
}

const getIndex = (column, row, n) => {
    return row * n + column
}

const getBlank = (array) => {
    return array.indexOf(' ')
}