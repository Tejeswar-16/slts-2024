"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../_util/initApp";
import { getRegistrationData } from "../_util/data";

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    
    useEffect(() => {
        if (!auth.currentUser) {
            router.push('/');
        } else {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user.role !== 'admin') {
                router.push('/');
            } else {
                setUser(user);
                getRegistrationData().then((_data) => {
                    // Handle Logout.
                    if (_data == null) {
                        router.push('/');
                    }
                    console.log(Object.keys(_data[0]));
                    setData(_data);
                });
            }
        }
    }, [router]);

    return user && data ? (
        <>
            <div className="rounded-lg shadow-lg p-6 bg-white">
                <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
                <p className="text-gray-700 mb-2">{user.email}</p>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full mt-6">
                    <thead>
                        <tr>
                            {data.length > 0 && Object.keys(data[0]).map((key, index) => (
                                <th key={index} className="bg-gray-200 text-left px-4 py-2">{key ?? "-"}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                {Object.values(row).map((value, index) => (
                                    <td key={index} className="border px-4 py-2">{value ?? "-"}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    ) : (
        <div className="flex h-screen items-center justify-center">Loading...</div>
    )

}