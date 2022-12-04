import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome({ auth, newses }) {
    const firstNews = newses.data[0];
    return (
        <GuestLayout auth={auth}>
            <Head title="Home" />
            <div className="min-h-screen bg-gray-100 sm:items-center sm:pt-5 lg:px-32 px-4">
                <Link href={`/news-details/${firstNews.id}`}>
                    <div className="flex w-full my-2 bg-white p-2">
                        <div className="md:w-1/2">
                            <img src={firstNews.image_url} alt="" className="w-full" />
                        </div>
                        <div className="md:w-1/2 px-4 py-2">
                            <h1 className="text-3xl font-bold hover:underline">{firstNews.title}</h1>
                            <p className="py-4">{firstNews.news_body.slice(0, 300)}</p>

                            <span className="mt-8">{new Date(firstNews.created_at).toLocaleString()}</span>
                        </div>
                    </div>
                </Link>
                <div className="grid py-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
                    {
                        newses?.data.slice(1, newses?.data.length).map(news => <div key={news.id} className="border rounded-md shadow bg-white">
                            <Link href={`/news-details/${news.id}`}>
                                <img src={news.image_url} alt="" className="w-full" />
                                <div className="p-2">
                                    <h1 className="text-lg py-4 hover:underline font-semibold">{news.title}</h1>
                                    <span>{new Date(news.created_at).toLocaleString()}</span>
                                </div>
                            </Link>
                        </div>)
                    }
                </div>
            </div>
        </GuestLayout>
    );
}
