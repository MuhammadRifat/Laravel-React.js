<?php

namespace App\Http\Controllers;

use App\Models\News;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function dashboard_newses(Request $request)
    {
        // $newses = Auth::user()->role == 'admin' ? News::latest()->paginate(10) : News::where('correspondent_id', Auth::id())->join('users', 'users.id', '=', 'news.correspondent_id')->get(['news.id', 'title', 'news_category', 'correspondent_id', 'news_body', 'image_url', 'image_title', 'news.created_at', 'users.name']);
        $newses = Auth::user()->role == 'admin' ? News::latest()->paginate(10) : News::where('correspondent_id', Auth::id())->latest()->paginate(10);

        return Inertia::render('Backend/Newses/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'newses' => $newses,
            'image_base_url' => url('/'),
        ]);
    }

    public function insert(Request $request)
    {
        $fileName = time() . '.' . $request->file->extension();
        News::insert([
            'title' => $request->title,
            'news_category' => $request->news_category,
            'correspondent_id' => Auth::id(),
            'news_body' => $request->news_body,
            'image_url' => '/uploads' . '/' . $fileName,
            'image_title' => 'Test',
            'created_at' => Carbon::now(),
        ]);

        $request->file->move(public_path('uploads'), $fileName);

        return Redirect::route('dashboard.newses');
    }

    public function delete($news_id)
    {
        News::find($news_id)->delete();

        return Redirect::route('dashboard.newses');
    }

    public function news_details($news_id)
    {
        $newses = News::where('id', '!=', $news_id)->latest()->paginate(6);
        $news = News::find($news_id);
        return Inertia::render('NewsDetails', [
            'news' => $news,
            'latest' => $newses,
            'image_base_url' => url('/'),
        ]);
    }
}
