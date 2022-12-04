<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index(){
        $users = User::latest()->paginate(10);
        return Inertia::render('Backend/Users', [
            'users' => $users
        ]);
    }
}
