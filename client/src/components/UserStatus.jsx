import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";

const UserStatus = () => {
    const [users, setUsers] = useState([]);
    const [connection, setConnection] = useState(null);
    const username = sessionStorage.getItem("user")?.replace(/"/g, "").trim(); // Fetch user from sessionStorage

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();

        if (username) {
            console.log(`User  in session is ${username}`);
            const newConnection = new HubConnectionBuilder()
                .withUrl("http://localhost:5000/chatHub")
                .withAutomaticReconnect()
                .build();

            newConnection.start()
                .then(async () => {
                    console.log("Connected to SignalR");
                    await newConnection.invoke("UserConnected", username); // Ensure method name is correct
                })
                .catch(err => console.error("Connection Error:", err));

            newConnection.on("User StatusChanged", (username, isOnline) => {
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.username === username ? { ...user, isOnline } : user
                    )
                );
            });

            setConnection(newConnection);

            return () => {
                if (newConnection) {
                    newConnection.stop();
                }
            };
        }
    }, [username]);

    const handleLogout = async () => {
        if (connection) {
            console.log("Connection state before logout:", connection.state);
            try {
                if (connection.state === "Connected") {
                    if (username) {
                        await connection.invoke("UserDisconnected", username); // Ensure method name is correct
                    } else {
                        console.error("Username is not defined.");
                    }
                } else {
                    console.error("Connection is not in the 'Connected' state.");
                }
            } catch (err) {
                console.error("Disconnection Error:", err);
            }
        } else {
            console.error("No active connection to SignalR.");
        }

        await connection.stop();  // Stop the connection AFTER invoking UserDisconnected
        sessionStorage.removeItem("user");
      window.location.reload();
    };

    return (
        <div>
            <h2>User Status</h2>
            {username && (
                <>
                    <p>Logged in as: <strong>{username}</strong></p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
            <h3>All Users</h3>
            <ul>
                {users.map(user => (
                    <li key={user.username}>
                        {user.username} - {user.isOnline ? "🟢 Online" : "⚪ Offline"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserStatus;