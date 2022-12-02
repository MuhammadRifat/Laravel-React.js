import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/inertia-react';

export default function NewsDetails({ auth, news }) {

    return (
        <GuestLayout auth={auth}>
            <Head title="News-Details" />
            <div className="min-h-screen flex bg-gray-100 justify-center sm:pt-5 lg:px-16 sm:px-2">
                <div className="w-1/2">
                    
                        <h1 className="text-2xl text-bold py-2">{news.title}</h1>
                        <span>{news.created_at}</span>
                        <p className="py-8 text-justify">{news.news_body}</p>
                    
                </div>
                <div className="w-1/3">
                    
                    
                </div>
            </div>
        </GuestLayout>
    )
}
