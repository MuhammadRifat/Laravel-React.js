<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use App\Models\News;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $newses = News::latest()->simplePaginate(10);
    return Inertia::render('Welcome', [
        'newses' => $newses,
    ]);
});


Route::get('/news-details/{news_id}', [NewsController::class, 'news_details']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard/newses', [NewsController::class, 'dashboard_newses'])->name('dashboard.newses');
    Route::post('/dashboard/newses', [NewsController::class, 'insert'])->name('dashboard.newses.insert');
    Route::delete('/dashboard/newses/{news_id}', [NewsController::class, 'delete'])->name('dashboard.newses.delete');
});

require __DIR__.'/auth.php';
