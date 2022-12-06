import ApplicationLogo from '@/Components/ApplicationLogo';
import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ auth, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <div className="min-h-screen relative bg-gray-100">
            <nav className="bg-red-900 border-b sticky">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-50" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex ">
                                <NavLink href={'/'}>
                                    Latest
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <div className="">
                                    {auth?.user ? (
                                        <Link href={route('dashboard')} className="text-sm text-gray-50 dark:text-gray-50 underline">
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href={route('login')} className="text-sm text-gray-50 dark:text-gray-50 underline">
                                                Log in
                                            </Link>

                                            <Link
                                                href={route('register')}
                                                className="ml-4 text-sm text-gray-50 dark:text-gray-50 underline"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-50 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-50 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-50">
                                {"Rifat"}
                            </div>
                            <div className="font-medium text-sm text-gray-50">{"hrifat450@gmail.com"}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="min-h-screen">
                {children}
            </main>

            <footer className="bg-red-900 lg:px-32 px-4 py-2 text-white mt-6">
                <div className="grid py-6 grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                    <div>
                        <h1 className="text-xl font-bold pb-6">About Us</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quos aut perferendis quasi eos praesentium.</p>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold pb-6">Contact Info</h1>
                        <p>

                            Address : Jatiya Kabi Kazi Nazrul Islam Unversity, Trishal, Mymensingh.<br />
                            Phone : 01772683690<br />
                            Email: hrifat450@gmail.com<br />

                        </p>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold pb-6">Newsletter</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <div className="pt-2">
                            <input type="text" className="w-full text-gray-900" placeholder="Enter your email address" />
                        </div>
                    </div>
                </div>
                <div className="py-3 border-t text-center">
                    Copyright © 2022 All rights reserved.
                </div>
            </footer>
        </div>
    );
}
