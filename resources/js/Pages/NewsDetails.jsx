import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/inertia-react';

export default function NewsDetails({ auth, news, latest, image_base_url }) {

    const date = new Date(news.created_at).toLocaleString();
    // console.log(latest);

    return (
        <GuestLayout auth={auth}>
            <Head title={news.title} />
            <div className="min-h-screen flex bg-gray-100 justify-center sm:pt-5 lg:px-32 sm:px-4">
                <div className="w-8/12 bg-white p-3">

                    <h1 className="text-3xl font-bold py-2">{news.title}</h1>
                    <span>{date}</span>
                    <img src={image_base_url + news.image_url} alt="" className="w-full pt-4" />
                    <p className="py-8 text-justify">{news.news_body}</p>

                </div>
                <div className="w-4/12 lg:px-8 lg:py-2">
                    <h1 className="text-xl border-b">Latest News</h1>
                    <div className="lg:py-4">
                        {
                            latest?.data.map(news => <div key={news.id} className="border rounded-md shadow bg-white lg:my-2">
                                <Link href={`/news-details/${news.id}`}>
                                    <div className="p-2">
                                        <h1 className="hover:underline text-md py-4 font-semibold">{news.title}</h1>
                                        <span>{new Date(news.created_at).toLocaleString()}</span>
                                    </div>
                                </Link>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}
