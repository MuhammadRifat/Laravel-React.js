<?php

namespace App\Http\Controllers;

use App\Models\News;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function dashboard_newses(Request $request)
    {
        $newses = News::latest()->paginate(10);
        return Inertia::render('Backend/Newses/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'newses' => $newses,
        ]);
    }

    public function insert(Request $request)
    {
        News::insert([
            'title' => $request->title,
            'news_category' => $request->news_category,
            'correspondent' => $request->correspondent,
            'news_body' => $request->news_body,
            'image_url' => 'https://cdn.educba.com/academy/wp-content/uploads/2019/09/What-is-Laravel.png',
            'image_title' => 'Test',
            'created_at' => Carbon::now(),
        ]);

        return Redirect::route('dashboard.newses');
    }

    public function delete($news_id)
    {
        News::find($news_id)->delete();

        return Redirect::route('dashboard.newses');
    }

    public function news_details($news_id)
    {
        $newses = News::latest()->paginate(6);
        $news = News::find($news_id);
        return Inertia::render('NewsDetails', [
            'news' => $news,
            'latest' => $newses
        ]);
    }
}
