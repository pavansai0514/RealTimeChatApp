# ChatApp 
This project is about chatting application where users can communicate each other over web application 

## steps to run the application 
git clone https://github.com/pavansai0514/RealTimeChatApp.git

### To execute the server

cd RealTimeChatApp/server

### install these dependencies
 <br> dotnet add package Swashbuckle.AspNetCore
 <br> dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
 <br>dotnet add package BCrypt.Net-Next
 <br>dotnet add package Microsoft.EntityFrameworkCore.SqlServer
 <br>dotnet add package Microsoft.EntityFrameworkCore.Tools
 <br>dotnet add package Microsoft.AspNetCore.SignalR

### To create table in database and update run commands:
1. dotnet ef migrations add InitialCreate 
2. dotnet ef database update

### To run type this command:
dotnet run

### To execute the client

now goto RealTimeChatApp/client 

### install these dependencies
<br>npm install axios @reduxjs/toolkit react-redux 
<br>npm install redux react-redux axios
<br>npm install redux-persist
<br>npm install react-router-dom
<br>npm install react-bootstrap bootstrap
<br>npm install react-bootstrap bootstrap
Type this command to execute 
1. npm run dev

check where the client port where application is running
1. open browser and type http://localhost:3000/ 
2. you can goto home page and then register and signup 
3. open the same link in another tab and register with another user and login 
4. type receiver name to chat on both ends 


