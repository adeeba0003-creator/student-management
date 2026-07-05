const form=document.getElementById("studentForm");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const name=document.getElementById("name").value;
const email=document.getElementById("email").value;

await fetch("http://localhost:3000/add",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,email
})

});

loadStudents();

form.reset();

});

async function loadStudents(){

const res=await fetch("http://localhost:3000/students");

const data=await res.json();

const table=document.getElementById("studentTable");

table.innerHTML="";

data.forEach(student=>{

table.innerHTML+=`

<tr>

<td>${student.id}</td>

<td>${student.name}</td>

<td>${student.email}</td>

<td>

<button onclick="deleteStudent(${student.id})">

Delete

</button>

</td>

</tr>

`;

});

}

async function deleteStudent(id){

await fetch(`http://localhost:3000/delete/${id}`,{

method:"DELETE"

});

loadStudents();

}

loadStudents();