import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ auth, newses }) {
    const { data, setData, delete: destroy, post, progress, processing, errors, reset } = useForm({
        title: '',
        news_category: '',
        correspondent: '',
        news_body: '',
        file: null
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const handleDelete = (news_id) => {
        Inertia.delete(`/dashboard/newses/${news_id}`);
    }

    const submit = (e) => {
        e.preventDefault();

        post(route('dashboard.newses.insert'));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Newses</h2>}
        >
            <Head title="Newses" />

            <div className="py-2">
                <div className="max-w-7xl">
                    <div className="p-2 sm:p-5 bg-white shadow sm:rounded-lg">
                        <div className="flex justify-center w-full">
                            <div className="w-full border">
                                <table className="table-auto w-full border-collapse border border-gray-500">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300">SL</th>
                                            <th className="border border-gray-300">Title</th>
                                            <th className="border border-gray-300">Category</th>
                                            <th className="border border-gray-300">correspondent</th>
                                            <th className="border border-gray-300">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            newses?.data?.map((news, index) => <tr key={news.id}>
                                                <td className="border border-gray-300 p-2">{index + 1}</td>
                                                <td className="border border-gray-300 p-2">{news.title}</td>
                                                <td className="border border-gray-300 p-2">{news.news_category}</td>
                                                <td className="border border-gray-300 p-2">{news.correspondent_id}</td>
                                                <td className="border border-gray-300 p-2 text-center">
                                                    <button className="btn bg-green-500 rounded-full px-3 py-1 text-white mx-1">Edit</button>
                                                    <button onClick={() => handleDelete(news.id)} className="btn bg-red-500 rounded-full px-3 py-1 text-white mx-1">Delete</button>
                                                </td>
                                            </tr>)
                                        }

                                    </tbody>
                                </table>
                            </div>
                            <div className="w-1/3">
                                <div className="w-full border p-2 bg-white">

                                    <form onSubmit={submit}>
                                        <div>
                                            <InputLabel forInput="title" value="News Title" />

                                            <TextInput
                                                name="title"
                                                value={data.title}
                                                className="mt-1 block w-full"
                                                autoComplete="title"
                                                isFocused={true}
                                                handleChange={onHandleChange}
                                                required
                                            />

                                            <InputError message={errors.title} className="mt-2" />
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel forInput="news_category" value="news category" />

                                            <TextInput
                                                type="text"
                                                name="news_category"
                                                value={data.news_category}
                                                className="mt-1 block w-full"
                                                autoComplete="news_category"
                                                handleChange={onHandleChange}
                                                required
                                            />

                                            <InputError message={errors.news_category} className="mt-2" />
                                        </div>

                                        <div className="mt-4">
                                            <label className="block font-medium text-sm text-gray-700">Image</label>

                                            <input
                                                type="file"
                                                className="w-full px-4 py-2 border"
                                                label="File"
                                                name="file"
                                                onChange={(e) =>
                                                    setData("file", e.target.files[0])
                                                }
                                            />
                                            <span className="text-red-600">
                                                {errors.file}
                                            </span>
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel forInput="news_body" value="news_body" />

                                            <TextInput
                                                rows={7}
                                                name="news_body"
                                                value={data.news_body}
                                                className="mt-1 block w-full"
                                                handleChange={onHandleChange}
                                                required
                                            />

                                            <InputError message={errors.news_body} className="mt-2" />
                                        </div>

                                        {/* <div className="mt-4">
                                            <InputLabel forInput="image_url" value="News Image" />

                                            <TextInput
                                                type="file"
                                                name="image_url"
                                                id="image_url"
                                                value={data.news_image}
                                                handleChange={onHandleChange}
                                                // onChange={e => setData('news_image', e.target.files[0])}
                                                required
                                            />
                                            {progress && (
                                                <progress value={progress.percentage} max="100">
                                                    {progress.percentage}%
                                                </progress>
                                            )}

                                        </div> */}

                                        <div className="flex items-center justify-end mt-4">


                                            <PrimaryButton className="ml-4" processing={processing}>
                                                Add News
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
