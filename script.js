function copy(txt){
    navigator.clipboard.writeText(txt).then(
        () => {
          document.getElementById("alert").style.display = "inline"
          setTimeout(() => {
            document.getElementById("alert").style.display = "none"
          }, 2000);

        },
        () => {
          alert("Clipboard copying failed")
        },
      );
}

function mask(pass){
    let str=""
    for(let i=0;i<pass.length;i++){
        str+="*"
    }
    return str
}

const deletePassword=(website)=>{
    let data=localStorage.getItem("passwords")
    let arr=JSON.parse(data)
    arrUpdated=arr.filter((e)=>{
        return e.website!=website
    })
    localStorage.setItem("passwords",JSON.stringify(arrUpdated))
    alert(`Successfully deleted ${website}'s password!`)
    showPasswords()
}

const showPasswords=()=>{
    let tb=document.querySelector("table")
    let data=localStorage.getItem("passwords")
    if(!data || JSON.parse(data).length==0 ){
        tb.innerHTML=`<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete Password</th>
        </tr>
        <tr>
        No Passwords Saved
        </tr>`
    }
    else{
        tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete Password</th>
        </tr>`

        let arr=JSON.parse(data)
        let str=""
        for(let i=0;i<arr.length;i++){
            const element=arr[i];
            str+=`<tr>
            <th>${element.website}<img class="cp" onclick="copy('${element.website}')" src=copy.png alt="Copy Button"></th>
            <th>${element.username}<img class="cp" onclick="copy('${element.username}')" src=copy.png alt="Copy Button"></th>
            <th>${mask(element.password)}<img class="cp" onclick="copy('${element.password}')" src=copy.png alt="Copy Button"></th>
            <th><img id="del" onclick="deletePassword('${element.website}')" src=del.svg></th>
            </tr>`
        }
        tb.innerHTML=tb.innerHTML+str
    }
    website.value=""
    username.value=""
    password.value=""
}

console.log("Running")
showPasswords()
document.querySelector(".btn").addEventListener("click", (e)=>{
    e.preventDefault()
    console.log("Submit clicked")
    console.log(website.value, username.value, password.value);
    let passwords=localStorage.getItem("passwords")

    if(!passwords){
        let json=[]
        json.push({website:website.value, username:username.value, password:password.value})
        alert("Password Saved")
        localStorage.setItem("passwords",JSON.stringify(json))
    }
    else{
        let json=JSON.parse(localStorage.getItem("passwords"))
        json.push({website:website.value, username:username.value, password:password.value})
        alert("Password Saved")
        localStorage.setItem("passwords",JSON.stringify(json))
    }
    showPasswords()
})
