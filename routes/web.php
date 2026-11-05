<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

Route::get('/{any}', function () {
    if (
        request()->header('x-forwarded-proto') === 'https'
        || str_contains(request()->getHost(), 'onrender.com')
        || !app()->environment('local')
    ) {
        URL::forceScheme('https');
    }

    return view('app');
})->where('any', '.*');