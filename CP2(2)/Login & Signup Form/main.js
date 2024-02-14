function validate()
{
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
if(username=="admin" && password=="admin")
{
window.open("index.html");
}
else if(username=="")
{
  alert("Please enter your Email")
}
else if(password=="")
{
  alert("Please enter your Password")
}
else
{
alert("Wrong Credentials, Login failed");
}
}