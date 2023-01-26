const container = document.querySelector('.container');
const eraserBtn = document.querySelector('.eraser');
const rainbowBtn = document.querySelector('.rainbow');
const clearBtn = document.querySelector('.clear');
const selectColorBtn = document.querySelector('.select-color');
const rangeText = document.querySelector('.range-text');
const rangeInput = document.querySelector('.range');
const defaultBtn = document.querySelector('.default');
const btns = document.querySelectorAll('.btn');
let selectedValue = '';
rangeInput.addEventListener('change', ()=> {
    rangeText.textContent = `${rangeInput.value} x ${rangeInput.value}`;
    createSpans(rangeInput.value);
    selectedAfterClearedSquares();
})
window.addEventListener('DOMContentLoaded', ()=> {
    rangeText.textContent = `${rangeInput.value} x ${rangeInput.value}`;
    createSpans(rangeInput.value);
    implementColoring(selectColorBtn.value);
    defaultBtn.style.backgroundColor = `${selectColorBtn.value}`;
})
btns.forEach(btn=> {
    btn.addEventListener('click', (e)=> {
        let target = e.currentTarget
        addActiveBtn(target);
        if (target.classList.contains('rainbow')) {
            selectedValue = 'rainbow';
            const spans = container.querySelectorAll('.container span');
            spans.forEach(item=> {
                item.addEventListener('mouseover', (e)=> {
                    selectedColor = getColor();
                        item.style.backgroundColor = selectedColor;
                })
            }) 
        } else if (target.classList.contains('eraser')) {
            selectedValue = 'eraser'
            implementColoring('');
        }
    })
})
selectColorBtn.addEventListener('change', ()=> {
    removeActiveBtn();
    let selectedColor = selectColorBtn.value;
    implementColoring(selectedColor);
    defaultBtn.style.backgroundColor = `${selectColorBtn.value}`;
})
clearBtn.addEventListener('click', (e)=> {
    clearAllSpans();
    createSpans(rangeInput.value);
    selectedAfterClearedSquares();
})
function createSpans(rangeValue) {
    let width = container.getBoundingClientRect().width;
    let height = container.getBoundingClientRect().height;
    let totalSpans = rangeInput.value * rangeInput.value;
    clearAllSpans();
    for (i = 0; i < totalSpans; i++) {
        let elem = document.createElement('span');
        elem.style.width = `${width / rangeValue}px`;
        elem.style.height = `${height / rangeValue}px`;
        container.insertAdjacentElement('beforeend', elem);
    }
}
function selectedAfterClearedSquares() {
    if (selectedValue === 'rainbow') {
        const spans = container.querySelectorAll('.container span');
        spans.forEach(item=> {
            item.addEventListener('mouseover', (e)=> {
                let selectedColor = getColor();
                    item.style.backgroundColor = selectedColor;
            })
        }) 
    } else if (selectedValue === 'eraser') {
        implementColoring('');
    }
    else {
        implementColoring(selectColorBtn.value);
    }
}
function addActiveBtn(target) {
    removeActiveBtn();
    target.classList.add('active');
}
function removeActiveBtn() {
    btns.forEach(btn=> {
        btn.classList.remove('active');
    })
}
function getColor() {
    let colors = ['red', 'green', 'blue', 'yellow', 'purple', 'pink'];
    let rand = Math.floor(Math.random() * colors.length);
    return colors[rand];
}

function clearAllSpans() {
    const spans = container.querySelectorAll('.container span');
    spans.forEach(item => {
        item.remove();
    })
}
function implementColoring(color) {
    const spans = container.querySelectorAll('.container span');
    spans.forEach(item=> {
        item.addEventListener('mouseover', (e)=> {
                item.style.backgroundColor = color;
        })
    }) 
}