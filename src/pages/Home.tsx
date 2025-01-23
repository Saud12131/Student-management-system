import React, { useState, useEffect, useContext } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "../index.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Student {
    id?: string;
    name: string;
    class: string;
    section: string;
    rollNumber: number;
    [key: string]: any; // For additional fields
}

const Home: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [formData, setFormData] = useState<Student>({
        name: "",
        class: "",
        section: "",
        rollNumber: 0
    });

    const handleDelete = async (id: string) => {
        if (currentUser) {
            try {
                await deleteDoc(doc(db, "students", id));
                alert("Student deleted!");
            } catch (error: any) {
                console.error("Error deleting document: ", error);
            }
        }
    };

    // Fetch students from Firestore on component mount
    useEffect(() => {
        const studentsCollection = collection(db, "students");

        // Using onSnapshot for real-time updates
        const unsubscribe = onSnapshot(studentsCollection, (snapshot) => {
            const fetchedStudents = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Student[];
            setStudents(fetchedStudents);
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddStudent = async () => {
        if (currentUser) {
            try {
                const docRef = await addDoc(collection(db, "students"), formData);
                setStudents([...students, { ...formData, id: docRef.id }]);
                setFormData({
                    name: "",
                    class: "",
                    section: "",
                    rollNumber: 0,
                });
                setIsModalOpen(false);
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Logged Out!");
            navigate("/");

        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handleLogout}
                    className="w-120px bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 mt-4"
                >
                    {currentUser ? "Logout" : "Login"}  
                </button>
                <h1 className="text-2xl font-bold">Students List</h1>
                <button
                    disabled={!currentUser}
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${!currentUser ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Student
                </button>
            </div>

            <table className="table-auto w-full bg-white rounded shadow">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Class</th>
                        <th className="px-4 py-2">Section</th>
                        <th className="px-4 py-2">Roll Number</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className="border-b">
                            <td className="px-4 py-2">{student.id}</td>
                            <td className="px-4 py-2">{student.name}</td>
                            <td className="px-4 py-2">{student.class}</td>
                            <td className="px-4 py-2">{student.section}</td>
                            <td className="px-4 py-2">{student.rollNumber}</td>
                            <td className="px-4 py-2 flex space-x-2">
                                <button
                                    disabled={!currentUser}
                                    className={`text-blue-500 hover:underline ${!currentUser ? 'cursor-not-allowed opacity-50' : ''}`}
                                    onClick={() => navigate(`/view/${student.id}`)}
                                >
                                    View
                                </button>
                                <button
                                    disabled={!currentUser}
                                    className={`text-green-500 hover:underline ${!currentUser ? 'cursor-not-allowed opacity-50' : ''}`}
                                    onClick={() => navigate(`/edit/${student.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    disabled={!currentUser}
                                    className={`text-red-500 hover:underline ${!currentUser ? 'cursor-not-allowed opacity-50' : ''}`}
                                    onClick={() => handleDelete(student.id!)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[80vh] overflow-y-auto">
                            <h2 className="text-xl font-bold mb-4">Add Student</h2>
                            <form className="space-y-4">
                                {Object.keys(formData).map((key) => (
                                    <div key={key}>
                                        <label className="block text-sm font-medium mb-1 capitalize">
                                            {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
                                        </label>
                                        <input
                                            type={key === "rollNumber" ? "number" : "text"}
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded"
                                        />
                                    </div>
                                ))}
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAddStudent}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Home;
