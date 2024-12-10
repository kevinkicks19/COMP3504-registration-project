<?php require 'vendor/autoload.php';

\Stripe\Stripe::setApiKey('your-secret-key');

try {
    $session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price_data' => [
                'currency' => 'usd',
                'product_data' => [
                    'name' => 'Registration Fee',
                ],
                'unit_amount' => $total_fee * 100, // Convert to cents
            ],
            'quantity' => 1,
        ]],
        'mode' => 'payment',
        'success_url' => 'https://your-site.com/success',
        'cancel_url' => 'https://your-site.com/cancel',
    ]);

    header('Location: ' . $session->url);
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
?>