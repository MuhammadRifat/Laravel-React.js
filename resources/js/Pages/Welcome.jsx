import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome({ auth, newses }) {
    return (
        <GuestLayout auth={auth}>
            <Head title="Home" />
            <div className="min-h-screen bg-gray-100 sm:items-center sm:pt-5 lg:px-16 sm:px-2">
                <div className="grid grid-cols-4 gap-4 w-full">
                    {
                        newses?.data.map(news => <div key={news.id} className="border rounded-md shadow">
                            <Link href={`/news-details/${news.id}`}>
                                <img src={news.image_url} alt="" className="w-full" />
                                <div className="p-2">
                                    <h1 className="text-xl py-4">{news.title}</h1>
                                    <span>{news.created_at}</span>
                                </div>
                            </Link>
                        </div>)
                    }
                </div>
            </div>
        </GuestLayout>
    );
}
