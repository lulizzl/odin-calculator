function add(Array) {
    str = Array.join('')
    op = str.indexOf('+')
    return Number(str.slice(0,op)) + Number(str.slice(op+1))
}

function subtract(Array) {
    str = Array.join('')
    op = str.indexOf('-')
    if (op === 0) op = str.indexOf('-',1)
    return Number(str.slice(0,op)) - Number(str.slice(op+1))
}

function multiply(Array) {
    str = Array.join('')
    op = str.indexOf('x')
    return Number(str.slice(0,op)) * Number(str.slice(op+1))
}

function divide(Array) {
    str = Array.join('')
    op = str.indexOf('/')
    return Math.ceil((Number(str.slice(0,op)) / Number(str.slice(op+1)))*1000)/1000
}

nums = [0,1,2,3,4,5,6,7,8,9,'.']
ops = ['+','-','x','/']

function operate (Equation) {
    console.log(Equation)
    if (Equation.includes('x') || Equation.includes('/')){
        console.log('pemdas, Equation: ' + Equation)
        multIndex = Equation.indexOf('x')
        divIndex = Equation.indexOf('/')
        if (divIndex < 0 || (multIndex < divIndex && multIndex >= 0)){
            console.log('mult first')
            index = Equation.indexOf('x')
            Calc = ['x']
            for (let i = index + 1; i < Equation.length; i++) {
                if (nums.includes(Number(Equation[i]))|| Equation[i] === '.') {
                    Calc.push(Equation[i])
                }
                else break
            }
            for (let i = index - 1; i >= 0; i--) {
                if (nums.includes(Number(Equation[i]))|| Equation[i] === '.') {
                    Calc.unshift(Equation[i])
                }
                else break
            }   
            newEquation = Equation.join('').replace(Calc.join(''), multiply(Calc).toString()).split('')
            console.log(Calc)
            console.log(newEquation)
            return operate(newEquation)
        }
        else if (multIndex < 0 || (divIndex < multIndex && divIndex > 0)) {
            index = Equation.indexOf('/')
            Calc = ['/']
            for (let i = index + 1; i < Equation.length; i++) {
                if (nums.includes(Number(Equation[i])) || Equation[i] === '.') {
                    Calc.push((Equation[i]))
                }
                else break
            }
            for (let i = index - 1; i >= 0; i--) {
                if (nums.includes(Number(Equation[i])) || Equation[i] === '.') {
                Calc.unshift((Equation[i]))
                }
                else break
            }
            newEquation = Equation.join('').replace(Calc.join(''), divide(Calc).toString()).split('')
            return operate(newEquation)
        }
    }
    if (Equation.includes('+') || Equation.includes('-')){
        addIndex = Equation.indexOf('+')
        if (Equation.indexOf('-') === 0) subIndex = Equation.indexOf('-',1)
        else subIndex = Equation.indexOf('-')
        console.log(subIndex)
        if ((subIndex < 0 && addIndex > 0) || (addIndex < subIndex && addIndex >= 0)){
            index = Equation.indexOf('+')
            Calc = ['+']
            for (let i = index + 1; i < Equation.length; i++) {
                if (nums.includes(Number(Equation[i]))|| Equation[i] === '.') {
                    Calc.push(Equation[i])
                }
                else break
            }
            for (let i = index - 1; i >= 0; i--) {
                if (nums.includes(Number(Equation[i]))|| Equation[i] === '.'|| (Equation[i] === '-' && i === 0)) {
                    Calc.unshift(Equation[i])
                }
                else break
            }
            newEquation = Equation.join('').replace(Calc.join(''), add(Calc).toString()).split('')
            console.log(Calc)
            console.log(newEquation)
            return operate(newEquation)
            }
        else if (addIndex < 0 || (subIndex < addIndex && subIndex >= 0)){
            index = Equation.indexOf('-')
            console.log('- loop')
            neg = false
            if (index === 0) {
                console.log('result is negative number')
                neg = true
                index = Equation.indexOf('-',1)
                if (index < 0) return Number(Equation.join(''))
                } 
            Calc = ['-']
            for (let i = index + 1; i < Equation.length; i++) {
                if (nums.includes(Number(Equation[i]))|| Equation[i] === '.') {
                    Calc.push(Equation[i])
                }
                else break
            }
            for (let i = index - 1; i >= 0; i--) {
                if (nums.includes(Number(Equation[i]))|| Equation[i] === '.') {
                    Calc.unshift(Equation[i])
                }
                else break
            }
            if (neg) Calc.unshift('-')
            newEquation = Equation.join('').replace(Calc.join(''), subtract(Calc).toString()).split('')
            return operate(newEquation)
        }
        }
    else return Number(newEquation.join(''))
}



const container = document.querySelector('.container')

function createButton(arg) {
    var newButton = document.createElement('button')
    container.appendChild(newButton)
    newButton.textContent = arg
    if (nums.includes(arg)) newButton.classList.add('num')
    else if (ops.includes(arg)) newButton.classList.add('op')
    else if (arg === '=') newButton.setAttribute('id', '=')
    else if (arg === 'clear') newButton.setAttribute('id', 'clear')
}

Buttons = [7,8,9,'+',4,5,6,'-',1,2,3,'x',0,'clear','=','/']
var buttons = Buttons.forEach(createButton)


display = document.createElement('div')
container.appendChild(display)
display.setAttribute('id', 'display')
display.textContent = ''

var displayValue

function updateDisplay(x) {
    display.textContent = x
}

buttons = document.querySelectorAll('button')

Equation = []
displayEquation = ''

buttons.forEach(button => button.addEventListener('click', function(e) {
    if (this.textContent in nums) {
        Equation.push(this.textContent)
        updateDisplay(Equation.join(''))
    } 
    else if (ops.includes(this.textContent)) {
        Equation.push(this.textContent)
        updateDisplay(Equation.join(''))
    }
    else if (this.textContent === 'clear') {
        Equation = []
        updateDisplay(Equation.join(''))
    }
    else if (this.textContent === '=') {
        updateDisplay(Equation.join('') + '=' + operate(Equation))
    }
    e.stopPropagation()
    }
))


