import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UserStatus = () => {
    const [users, setUsers] = useState([]);
    const [connection, setConnection] = useState(null);
    const username = sessionStorage.getItem("user")?.replace(/"/g, "").trim();

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
            console.log(`User in session is ${username}`);
            const newConnection = new HubConnectionBuilder()
                .withUrl("http://localhost:5000/chatHub")
                .withAutomaticReconnect()
                .build();

            newConnection.start()
                .then(async () => {
                    console.log("Connected to SignalR");
                    await newConnection.invoke("UserConnected", username);
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
                        await connection.invoke("UserDisconnected", username);
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

        await connection.stop();
        sessionStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <h4 className="card-title text-center text-primary">User Status</h4>
                    {username && (
                        <div className="text-center mb-3">
                            {/* <p className="fw-bold">Logged in as: <span className="text-success">{username}</span></p>
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button> */}
                        </div>
                    )}
                    <h5 className="text-success">Status of All Users</h5>
                    <ul className="list-group mt-3">
                        {users.map(user => (
                            <li key={user.username} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>{user.username}</span>
                                <span className={user.isOnline ? "badge bg-success" : "badge bg-secondary"}>
                                    {user.isOnline ? "Online 🟢" : "Offline ⚪"}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserStatus;
