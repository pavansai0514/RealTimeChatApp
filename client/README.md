# ChatApp 
This project is about chatting application where users can communicate each other over web application 

## steps to run the application 
git clone https://github.com/pavansai0514/RealTimeChatApp.git

### To execute the server

cd RealTimeChatApp/server

### To create table in database and update run commands:
1. dotnet ef migrations add InitialCreate 
2. dotnet ef database update

### To run type this command:
dotnet run

### To execute the client
now goto RealTimeChatApp/client 
Type this command to execute 
1. npm run dev

check where the client port where application is running
1. open browser and type http://localhost:3000/ 
2. you can goto home page and then register and signup 
3. open the same link in another tab and register with another user and login 
4. type receiver name to chat on both ends 


