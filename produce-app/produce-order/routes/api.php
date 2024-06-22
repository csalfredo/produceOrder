<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Mail\ProduceOrderMail;

Route::post('/send-order', function (Request $request) {
    $order = $request->validate([
        'items' => 'required|array',
        'items.*.name' => 'required|string',
        'items.*.quantity' => 'required|integer',
        'items.*.case_cost'=> 'required|numeric',
        'items.*.total'=> 'required|numeric',
    ]);

        // Calculate the total
        $total = 0;
        foreach ($order['items'] as $item) {
            $total += $item['quantity'] * $item['case_cost'];
        }

    Mail::to('recipient@example.com')->send(new ProduceOrderMail($order,$total));

    return response()->json(['message' => 'Order sent successfully!']);
});
