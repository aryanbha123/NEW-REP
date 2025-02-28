import {Donation} from 'models-pms';
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe('sk_test_51QqCYBGbArLeXveHf2HeAuDFzDvkahXfsAopObJsFXw71xp7jf5RIhfscsmrucxzZIxBIUYwQc9R3QxrsIeoccsr00e12edFmW');
// Create a donation (with optional payment)
export const createDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);

    if (donation.donationType === "money") {
      donation.paymentStatus = "pending";
    }

    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(400).json({ message: "Error creating donation", error: error.message });
  }
};

// Get all donations


// Update donation status
export const updateDonationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    donation.status = status;
    await donation.save();
    
    res.status(200).json({ message: "Donation status updated", donation });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};

// Create Stripe Payment Intent
export const createStripePaymentIntent = async (req, res) => {
  try {
    const { amount, donationId } = req.body;

    if (!amount || !donationId) {
        console.log("err")
      return res.status(400).json({ message: "Amount and donationId are required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: "INR",
      payment_method_types: ["card"],
      metadata: { donationId },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creating payment intent", error: error.message });
  }
};

// Handle Stripe Webhook
export const handleStripeWebhook = async (req, res) => {
    try {
        const { donationId, status } = req.body;

        const donation = await Donation.findById(donationId);
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        donation.paymentStatus = status;
        await donation.save();

        res.status(200).json({ message: "Donation status updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating donation status", error: error.message });
    }
};


export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("donorId", "name email");
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error: error.message });
  }
};

// Get a single donation
export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.find({donorId:req.params.id});
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donation", error: error.message });
  }
};