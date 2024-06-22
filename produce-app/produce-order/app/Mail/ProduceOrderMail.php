<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ProduceOrderMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    public $total;

    public function __construct($order, $total)
    {
        $this->order = $order;
        $this->total = $total;
    }

    public function build()
    {
        return $this->view('emails.produceOrder')
                    ->with(['order' => $this->order, 'total'=>$this->total]);
    }
}
