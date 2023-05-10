let plates = document.querySelector('.plates ul');
let addItems = document.querySelector('.addItems');
//  in the Page Load line 35 we CHECK if something in LOCAL STORAGE
let items = JSON.parse(localStorage.getItem('items')) || [] ;
function item(e) {
    e.preventDefault();
    let text = (this.querySelector('[type=text]')).value;
    const add = {
        text,
        done: false
    };

    items.push(add);
    addLists(items,plates);
    // we change the ARRAY to STRING by JSON
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
    
    
}

function addLists(itemsarray, platesList) {
    platesList.innerHTML = itemsarray.map((plat,i)=>{
        return `
            <li class="border-b-[1px] border-gray-400 mb-[5px]">
                <input type="checkbox" data-index="${i}" id="check${i}"  ${plat.done ? 'checked' : ''}>
                <label for="check${i}" class="font-semibold">${plat.text}</label>
            </li>        
        `

    }).join('');
}

function toggleDone(e){
    let target = e.target;
    if(!target.matches('input')) return;
    const index = target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items',JSON.stringify(items));
    // Update the visibilty
    addLists(items,plates);
}

addItems.addEventListener('submit',item);
plates.addEventListener('click',toggleDone);
addLists(items,plates);