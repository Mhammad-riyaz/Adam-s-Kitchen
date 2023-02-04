import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let main = document.getElementById("main")
let footer = document.querySelector("footer")
let itemsHtml =  document.querySelector(".items")
let totalPriceHtml = document.getElementById("total-price")
let totalCost = 0
let total = []
let name 
let items = [
       {
            src:"./images/pizza.jpg",
            alt:"image containing a pizza",
            name:"Piz-zzha",
            description:"rotten pepperoni, fungues",
            price:14,
            uuid:uuidv4()
        },
        {
            src:"./images/coca cola.jpg",
            alt:"image containing a coke",
            name:"koca kola",
            description:"poison water",
            price:5,
            uuid:uuidv4()
        },

        {
            src:"./images/bur-gerr.jpg",
            alt:"image containing a bur-gerr",
            name:"Bur-gerr",
            description:"chicken, smelly cheese, rotten lettuce",
            price:10,
            uuid:uuidv4()
        },

        {
            src:"./images/donot.jpg",
            alt:"image containing a donot",
            name:"Doonot",
            description:"expired chocolate, stocked sprinkles",
            price:17,
            uuid:uuidv4()
        },

        {
            src:"./images/sandwitch.jpg",
            alt:"image containing a sandwitch",
            name:"sssandwitch",
            description:"plant leaves, garbage sauce",
            price:10,
            uuid:uuidv4()
        },
        {
            src:"./images/french-fries.jpg",
            alt:"image containing a french fries",
            name:"French flies",
            description:"decayed potatoes",
            price:14,
            uuid:uuidv4()
        },
        {
            src:"./images/cake.jpg",
            alt:"image containing a cake",
            name:"Kcake",
            description:"plastic cake",
            price:24,
            uuid:uuidv4()
        },
        {
            src:"./images/fopcorn.jpg",
            alt:"image containing a popcorn",
            name:"Fupcorn",
            description:"Fermented maize",
            price:5,
            uuid:uuidv4()
        }
        
]


    function render(){
    items.forEach(function(item){
        main.innerHTML += `<section>
        <div class="food">
        <img class="img" src="${item.src}" alt="${item.alt}">
        <div class="food-des inline">
        <span  class="food-des fd1">${item.name}</span>
        <p  class="food-des fd2">${item.description}</p>
        <p  class="food-des fd3">$${item.price}</p>
        </div>
        </div>
        <link><svg class="image" data-name="${item.name}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg></link>
        <hr>
        </section>`        
    })
    }
    document.addEventListener("click",(e)=>{
        // e.preventDefault()
        if(e.target.dataset.uuid){
            if(total.length == 1){
                itemsHtml.innerHTML = " "
               footer.style.display = "none"
               total= []
                totalCost = 0
            }
            else{
                
                document.getElementsByClassName(e.target.dataset.uuid)[0].style.display = "none"
                let theUuid = e.target.dataset.uuid
                let theItem
                items.forEach(function(item){
                    if(item.uuid == theUuid){
                        theItem = item
                    }
                })
                console.log(total)
                console.log(total.length)
                total.splice(items.indexOf(theItem.price),1)
                console.log(total)
                console.log(total.length)
                totalCost -=   theItem.price
                totalPriceHtml.textContent = "$"+totalCost

            }
        }
        else if(e.target.id == "btn"){
            document.querySelector("main").classList.add("change")
            footer.classList.add("change")
            document.querySelector("form").style.display = "block"
        }
        else if(e.target.dataset.name){
            console.log(e.target.dataset.name)
            getObject(e.target.dataset.name)
        }
    })
    document.querySelector("form").addEventListener("submit",(e)=>{
        e.preventDefault()
        name = document.getElementById("name").value
        document.getElementById("name").value = ""
        document.getElementById("card-num").value = ""
        document.getElementById("cvv").value = ""
        document.querySelector("main").classList.remove("change")
        footer.classList.remove("change")
        document.querySelector("form").style.display = "none"
        itemsHtml.innerHTML = " "
        footer.style.display = "none"
        total= []
        totalCost = 0
        document.getElementById("thanks").classList.add("thanks")
        document.getElementById("thanks").style.display = "flex"
        document.getElementById("thanks-des").textContent = `Thanks, ${name}! Your order is on its way!`
        setTimeout(() => {
            document.getElementById("thanks").classList.remove("thanks")
            document.getElementById("thanks-des").textContent = ""
        }, 5000);
    })
    
    function getObject(id){
        let a = items.filter(function(item){
            return id === item.name
        })
        sumUp(a[0])
    }
    function sumUp(item){
        total.push(item.price)
        totalCost = total.reduce((a,b)=>a+b,0)
       footer.style.display = "block";
       console.log(footer)
        itemsHtml.innerHTML +=
        `
        <div class="flex ${item.uuid}">
            <div >
            <p class="p" id="item">${item.name} <link id="remove"><span  class="mini" v data-uuid="${item.uuid}">remove</span></link></p>
        </div>
            <div>
            <p class="p">$${item.price}</p>
        </div>
        </div>`
        totalPriceHtml.textContent = "$"+totalCost
    }
    render()