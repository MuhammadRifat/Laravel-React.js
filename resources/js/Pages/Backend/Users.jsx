import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Users({ auth, users }) {

    const handleDelete = (user_id) => {
        Inertia.delete(`/dashboard/users/${user_id}`);
    }

    const handleMakeCorrespondent = (user_id) => {
        console.log(user_id);
        Inertia.patch(`/dashboard/users/${user_id}`);
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <Head title="Users" />

            <div className="py-2">
                <div className="max-w-7xl">
                    <div className="p-2 sm:p-5 bg-white shadow sm:rounded-lg">
                        <div className="flex justify-center w-full">
                            <div className="w-full border">
                                <table className="table-auto w-full border-collapse border border-gray-500">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300">SL</th>
                                            <th className="border border-gray-300">Name</th>
                                            <th className="border border-gray-300">Email</th>
                                            <th className="border border-gray-300">Role</th>
                                            <th className="border border-gray-300">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users?.data?.map((user, index) => <tr key={user.id}>
                                                <td className="border border-gray-300 p-2">{index + 1}</td>
                                                <td className="border border-gray-300 p-2">{user.name}</td>
                                                <td className="border border-gray-300 p-2">{user.email}</td>
                                                <td className="border border-gray-300 p-2">{user.role}</td>
                                                <td className="border border-gray-300 p-2 text-center">
                                                    <button onClick={() => handleMakeCorrespondent(user.id)} className="btn bg-green-500 rounded-full px-3 py-1 text-white mx-1">Make Correspondent</button>
                                                    <button className="btn bg-blue-500 rounded-full px-3 py-1 text-white mx-1">Edit</button>
                                                    <button onClick={() => handleDelete(user.id)} className="btn bg-red-500 rounded-full px-3 py-1 text-white mx-1">Delete</button>
                                                </td>
                                            </tr>)
                                        }

                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
