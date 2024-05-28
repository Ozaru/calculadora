const tamanhoDaTela = 18

let valor = ""
let operacao = ""
let tela = "0"
let memoria = ""
let historico = []

function atualizar() {
    document.getElementById("tela_").value = tela
    document.getElementById("memoria_").value = memoria
    const items = historico.map(x => {
        return `<li>${x}</li>`
    }).reverse().join("")
    document.getElementById("historico_").innerHTML = items
}

function resetar() {
    valor = ""
    operacao = ""
    tela = "0"
    memoria = ""
    historico = []
    atualizar()
}

function limpar() {
    tela = valor || "0"
    valor = ""
    operacao = ""
    memoria = !historico.length ? "" : historico[historico.length - 1]
    atualizar()
}

function digitar(digito) {
    if (tela.length == tamanhoDaTela) {
        return
    }
    if (digito == "," && (tela.includes(",") || tela.length == 8)) {
        return
    }
    tela = tela == "0" && digito != "," ? `${digito}` : `${tela}${digito}`
    atualizar()
}

function operar(calculo) {
    if(!!operacao) {
        calcular()
    }
    valor = tela
    tela = "0"
    operacao = calculo
    memoria = `${valor} ${operacao}`
    atualizar()
}

function calcular() {
    const resultado = executar().toString().replace(".", ",")
    memoria = `${valor} ${operacao} ${tela} = ${resultado}`
    historico.push(memoria)
    tela = resultado
    valor = ""
    operacao = ""
    atualizar()
}

function executar() {
    const numero1 = parseFloat(valor.replace(",", "."))
    const numero2 = parseFloat(tela.replace(",", "."))
    switch (operacao) {
        case "/":
            return numero1 / numero2
        case "*":
            return numero1 * numero2
        case "-":
            return numero1 - numero2
        case "+":
            return numero1 + numero2
        default:
            throw new Error("operacao invalida")
    }
}