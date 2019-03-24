let array = [1, 2, 3, 8, 6, 4, ' ', 7, 5]

let finished_array = [1, 2, 3, 4, 5, 6, 7, 8, 'BLANK']

let blocked_array = []

const solveIt = (array, n) => {

    // Caso base, la cosa funciono o es inválido.
    // Hay que declarar que algo fracasa cuando llega al máximo de movimientos ya que si no hay un máximo
    // Una rama puede crecer infinitamente
    if (valid(array)) {
        return array
    }

    // Voy y intento hacer la recursión con los vecinos. OJO hay que hacer un algo para evitar un movimiento del estilo UP, DOWN
    // probablemente hay que llamar un algo (funcion o variable o ambas) auxiliar que diga que movimientos puedo hacer. Ejemplo en la cosa inicial solo debise poder hacer
    // UP y RIGHT. Además después cuando haga la prumera recursión (Ejemplo UP), dentro de las recursiones que esa instancia crea
    // NO puede salir down xq sería volver a tras >:(
    else {

        let resp = curriedApplyMove(getBlank(array), n)(array, "UP")

        if (valid(resp)) {

        }

    }


}

// TODO: Si el movimiento es inválido retornar lo mismo o quizá retornar un objeto que diga algo como {valid: true, newArray: []}
const swap = (array, x, y, n) => ([array[x], array[y]] = [array[y], array[x]], array)

const curriedApplyMove = (index_of_blank, n) => {
    return (array, move) => {
        switch (move) {
            case "UP":
                return swap(array, index_of_blank, getIndex(indexToColumn(index_of_blank, n), indexToRow(index_of_blank, n) - 1, n), n)
            case "DOWN":
                return swap(array, index_of_blank, getIndex(indexToColumn(index_of_blank, n), indexToRow(index_of_blank, n) + 1, n), n)
            case "LEFT":
                return swap(array, index_of_blank, getIndex(indexToColumn(index_of_blank, n) - 1, indexToRow(index_of_blank, n), n), n)
            case "RIGHT":
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

let blank = array.indexOf(' ')
const N = 3

console.log("Mostrando el blank")
console.log(blank)

console.log("BEFORE")
console.log(array)

console.log("AFTER")
console.log(curriedApplyMove(blank, N)(array, "UP"))

console.log("Mostrando lo del value")
console.log("Caso que debe dar malo")
console.log(valid(array, array.length))

console.log("Caso en que debe dar bueno")
console.log(valid(finished_array, finished_array.length))

console.log("probando probando")

array.forEach(num => {
    if(num != array.indexOf(num)+1){
        console.log(num)
    }
})


/*matrix[0].reduce((total, curr) => {
    return (total < curr) ? curr : ''
}, -1)*/