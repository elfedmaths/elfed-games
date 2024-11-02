const keys = document.querySelectorAll('.button')

keys.forEach(key => {
    key.addEventListener('click', (e)=>{
        e.stopPropagation();
        key.addEventListener('click', keypadClick(e))
      })
})

function keypadClick(e){
    e.target.classList.add('click')
    setTimeout(() => {
        e.target.classList.remove('click')
    }, 100)
    let key = e.target.innerHTML
    switch(key){
        case 'X':
            resetInputs()
            break
        case '✓':
            submit()
            break
        default:
            if(document.activeElement !== document.querySelector(".input") &&
                /(^[0-9]$)/.test(key)){
                    enterNum(key)
            }
            break
    }
}