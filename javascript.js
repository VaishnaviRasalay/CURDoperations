let userList = document.getElementById('userList')



async function getUsers(){
    try{
        let response=await fetch('https://jsonplaceholder.typicode.com/users',{method:'GET'})
        let data=await response.json()
        data.forEach(element => {
            let div=document.createElement('div')
            div.innerHTML=element.id+" - "+element.name+" - "+element.email
           userList.appendChild(div)
           
        });
}
catch(error){
    alert("data is not fetched correctly")
}
}
getUsers()

let form=document.getElementById('form')
form.style.display='none'
let number=document.getElementById('number')
number.style.display='none'
let updateform=document.getElementById('update')
updateform.style.display='none'
let edit=document.getElementById('edit')
edit.addEventListener('click',function(){
    number.style.display='block'
    updateform.style.display='block'
    
})



updateform.addEventListener('click',function(){
    form.style.display='block'
    let userid = document.getElementById('userid').value.trim()
    let name=document.getElementById('name').value.trim()
    let email=document.getElementById('email').value.trim()
    if(userid===''){
        alert('please enter user id')
        return
    }
    update(userid,name,email)
    clearForm()
})

async function update(userid,name,email){
    try{
    let response=await fetch (`https://jsonplaceholder.typicode.com/users/${userid}`,{method:'PATCH',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
        name:name,
        email:email
        })
        
    })
    let data=await response.json()
     for (let div of userList.children) {
    if (div.innerText.startsWith(userid + " -")) {
        div.innerHTML = `${userid} - ${data.name} - ${data.email}`
        break
    }
}

    }
catch(error){
    alert("update the values correctly")
}

}




let delbtn = document.getElementById('delete')

delbtn.addEventListener('click', function () {
    number.style.display = 'block'
    let userid = document.getElementById('userid').value

    if (userid === "") {
        alert("Please enter user id")
        return
    }

    let isConfirmed = confirm("Are you sure you want to delete?")

    if (isConfirmed) {
        delUser(userid)
        clearForm()
    }
})

async function delUser(userid) {
    try {
        let response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userid}`,
            { method: 'DELETE' }
        )

        if (response.ok) {
            alert("Deleted successfully")

            for (let div of userList.children) {
                if (div.innerText.startsWith(userid + " -")) {
                    div.remove()
                    break
                }
            }
        }
    } catch (error) {
        alert('Data not deleted')
    }
}


let add=document.getElementById('add')
add.addEventListener('click',function(){
    form.style.display='block'
    let name=document.getElementById('name').value.trim()
    let email=document.getElementById('email').value.trim()
    addUsers(name,email)
    clearForm()
})


async function addUsers(name,email){
    try{
    let response=await fetch('https://jsonplaceholder.typicode.com/users',{method:'POST',
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
            name:name,
            email:email
        })
    })
    let data=await response.json()
   let div=document.createElement('div')
   div.innerHTML=`${data.id}-${data.name}-${data.email}`
  userList.appendChild(div)

   document.getElementById('name').value=""
   document.getElementById('email').value=''
}
catch(error){
    console.log('error')
}
}

function clearForm() {
    document.getElementById('name').value = ''
    document.getElementById('email').value = ''
    document.getElementById('userid').value = ''
}
