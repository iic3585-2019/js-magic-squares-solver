//Arreglo inicial
let array = [1, 2, 3, 4, 5, 6, 7, ' ', 8]

// Funciones para trabajar el tema de las posiciones dado que
// se convirtió una matriz a un arreglo
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

const getN = (array) => {
    return array.length**(1/2)
}

// Muestra el array como matriz
const show = (array, n) => {
    let lastRow = 0
    array.forEach((element, index) => {
        if (lastRow < indexToRow(index, n)) {
            process.stdout.write('\n')
            lastRow = indexToRow(index, n)
        }
        process.stdout.write(String(element)+" ")
    })
    process.stdout.write('\n')
}

process.stdin.resume()

console.log("Mostrando puzzle inicial")
show(array, getN(array))

console.log("Ingrese un movimiento: ")

process.stdin.on("data", function (x) {

    option = String(x).trim().toUpperCase()

    if (option === "-1") {
        process.exit()
    }

    array = curriedApplyMove(getBlank(array), 3)(array, option)

    if (valid(array)['valid']) {
        show(array, getN(array))
        console.log("Has ganado!")
        process.exit()
    }

    show(array, getN(array))

    console.log("Ingrese un movimiento: ")
})

// Cambia 2 elementos del arreglo
// En caso que el cambio sea inválido, retorna el mismo elemento
// Inspirado en: https://stackoverflow.com/questions/42258865/swap-two-array-elements-in-a-functional-way
const swap = (array, x, y, n) => ((x >= 0 && y >= 0) && (x <= n * n - 1 && y <= n * n - 1)) ? ([array[x], array[y]] = [array[y], array[x]], array) : array

// Retorna función que aplica el movimiento deseado.
// La función interior retorna el estado del array
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
            default:
                return array
        }
    }
}

// Verifica si el puzzle ya está resuelto
// Retorna un objeto indicando valid true o false, el value es opcional entre iteraciones
const valid = (array) => {
    return array.reduce((prevValue, currentValue, i) => {
        if (i < array.length - 1) {
            if (prevValue['valid'] === true) {
                return prevValue['value'] < currentValue ? { ...prevValue, value: currentValue } : { valid: false }
            }
        }
        return prevValue
    }, { value: -1, valid: true })
}

