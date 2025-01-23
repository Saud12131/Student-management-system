import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const ViewStudent: React.FC = () => {
    const [student, setStudent] = useState<any>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            const studentRef = doc(db, "students", id!);
            const docSnap = await getDoc(studentRef);
            if (docSnap.exists()) {
                setStudent(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        fetchStudent();
    }, [id]);

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
            {student ? (
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">Student Details</h1>
                    <div className="mb-4">
                        <span className="font-medium text-gray-600">Name:</span>
                        <p className="text-lg text-gray-800">{student.name}</p>
                    </div>
                    <div className="mb-4">
                        <span className="font-medium text-gray-600">Class:</span>
                        <p className="text-lg text-gray-800">{student.class}</p>
                    </div>
                    <div className="mb-4">
                        <span className="font-medium text-gray-600">Section:</span>
                        <p className="text-lg text-gray-800">{student.section}</p>
                    </div>
                    <div className="mb-6">
                        <span className="font-medium text-gray-600">Roll Number:</span>
                        <p className="text-lg text-gray-800">{student.rollNumber}</p>
                    </div>
                    <button
                        onClick={() => navigate("/home")}
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                    >
                        Back to List
                    </button>
                </div>
            ) : (
                <div className="text-center text-lg text-gray-600">Loading...</div>
            )}
        </div>
    );
};

export default ViewStudent;
