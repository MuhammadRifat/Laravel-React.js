<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', Auth::id())->latest()->paginate(10);
        return Inertia::render('Backend/Users', [
            'users' => $users
        ]);
    }

    public function make_correspondent($user_id)
    {
        $user = User::find($user_id);
        if ($user) {
            $user->role = 'correspondent';
            $user->save();
        }

        return Redirect::route('dashboard.users');
    }

    public function destroy($user_id)
    {
        User::find($user_id)->delete();

        return Redirect::route('dashboard.users');
    }
}
