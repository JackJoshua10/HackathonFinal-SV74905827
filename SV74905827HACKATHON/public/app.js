const handleCheckout = async () => {
    const amount = prompt('Enter the amount to charge (in cents)');

    const stripe = Stripe('your_publishable_key_here'); // Reemplaza con tu clave pública de Stripe

    const { error, token } = await stripe.createToken('card');

    if (error) {
        alert('Error creating token: ' + error.message);
        return;
    }

    const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ token, amount })
    });

    if (response.ok) {
        alert('Payment successful');
    } else {
        const data = await response.json();
        alert('Payment failed: ' + data.message);
    }
};
