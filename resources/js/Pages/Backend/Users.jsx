import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Inertia } from '@inertiajs/inertia';

export default function Users({ auth, users }) {
    const { data, setData, delete: destroy, post, progress, processing, errors, reset } = useForm({
        title: '',
        news_category: '',
        correspondent: '',
        news_body: '',
        news_image: ''
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const handleDelete = (news_id) => {
        Inertia.delete(`/dashboard/users/${news_id}`);
    }

    const submit = (e) => {
        e.preventDefault();

        post(route('dashboard.users.insert'));
    };

    console.log(auth);
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
                                                    <button className="btn bg-green-500 rounded-full px-3 py-1 text-white mx-1">Make Correspondent</button>
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
