import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const EditStudent: React.FC = () => {
    const [formData, setFormData] = useState<any>({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            const studentRef = doc(db, "students", id!);
            const docSnap = await getDoc(studentRef);
            if (docSnap.exists()) {
                setFormData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        fetchStudent();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const studentRef = doc(db, "students", id!);
        await updateDoc(studentRef, formData);
        alert("Student updated!");
        navigate("/home");
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold">Edit Student</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        onClick={() => navigate("/home")}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditStudent;
