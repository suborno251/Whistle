<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class KeepAlive extends Command
{
    protected $signature = 'app:keep-alive';
    protected $description = 'Pings the app to prevent Render free tier spin-down';

    public function handle()
    {
        $url = 'https://whistle-7qsn.onrender.com/';

        try {
            $response = Http::get($url);
            $this->info('Ping success: ' . $response->status());
        } catch (\Exception $e) {
            $this->error('Ping failed: ' . $e->getMessage());
        }
    }
}