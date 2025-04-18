import React, { useState, useEffect, use } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";

// ✅ Use the correct **PUBLISHABLE** key
const stripePromise = loadStripe("pk_test_51QqCYBGbArLeXveHefqfFErqYr0KZ95lYpA9TE0SBc96c4h5RRJtYCqK9EasmOA8Q9Bbg36GUhQwXC4O9AfJHVOC00i3gRoidP");

const CheckoutForm = ({ amount, donationId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setMessage("Stripe is not fully loaded. Please try again.");
            setLoading(false);
            return;
        }

        const { paymentIntent, error } = await stripe.confirmPayment({
            elements,
            redirect: "if_required", // ✅ Prevents automatic redirection
        });

        if (error) {
            setMessage(error.message);
            setLoading(false);
            return;
        }

        // ✅ Payment successful, now update status manually using webhook
        try {
            await axios.post("http://localhost:5000/user/donations/webhook", {
                donationId,
                status: "success",
                paymentIntentId: paymentIntent.id
            });
            setMessage("Payment successful!");
        } catch (err) {
            setMessage("Error updating donation status");
            console.error("Webhook error:", err);
        }

        setLoading(false);
    };


    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
            <PaymentElement />
            <button type="submit" disabled={!stripe || loading} style={{ marginTop: 20, padding: 10, width: "100%" }}>
                {loading ? "Processing..." : `Pay ₹${amount}`}
            </button>
            {message && <p style={{ color: "red", marginTop: 10 }}>{message}</p>}
        </form>
    );
};

const Payment = () => {
    const [clientSecret, setClientSecret] = useState("");
    const [amount, setAmount] = useState(10000); // Default ₹100.00
    const { user } = useSelector(s => s.auth)
    const [donationId, setDonationId] = useState('')
    const fetchPaymentIntent = async (amt) => {
        if (!amt || amt < 100) return; // Minimum ₹1.00

        try {
            // Step 1: Create a Donation
            const donationResponse = await axios.post("http://localhost:5000/user/donations", {
                donationType: "money",
                amount: amt,
                paymentStatus: "pending",
                donorId: user.id,
            });
            setDonationId(donationResponse.data._id);
            // const donationId = donationResponse.data._id; // Extract donation ID

            // Step 2: Create a Payment Intent with donationId
            const paymentResponse = await axios.post("http://localhost:5000/user/donations/create-payment-intent", {
                amount: amt,
                donationId:donationResponse.data._id/// Pass donation ID
            });

            if (paymentResponse.data.clientSecret) {
                setClientSecret(paymentResponse.data.clientSecret);
            } else {
                console.error("Error fetching clientSecret:", paymentResponse.data);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };


    useEffect(() => {
        fetchPaymentIntent(amount);
    }, [amount]);

    return (
        <div className="flex w-[480px] py-20  flex-col justify-end">
            <h2 className=" mx-8 text-start mt-5">Enter Donation Amount</h2>
            {/* Quick Suggestion Buttons */}
            <div className="mx-8 flex gap-2  flex-col-reverse" >
                <div style={{ display: "flex", gap: 10, justifyContent: "space-evenly" }}>
                    {[100, 200, 500, 10000].map((amt) => (
                        <button
                            key={amt}
                            onClick={() => setAmount(amt)}
                            style={{
                                padding: 10,
                                border: "1px solid #007bff",
                                background: amount === amt ? "#007bff" : "white",
                                color: amount === amt ? "white" : "#007bff",
                                borderRadius: 5,
                                cursor: "pointer",
                            }}
                        >
                            ₹{amt}
                        </button>
                    ))}
                </div>

                {/* Custom Amount Input */}
                <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Enter custom amount"
                    className="p-2 border"
                />
            </div>
            {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm donationId={donationId} amount={amount} />
                </Elements>
            ) : (
                <p>Loading payment options...</p>
            )}
        </div>
    );
};

export default Payment;
