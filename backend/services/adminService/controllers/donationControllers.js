
import { Donation } from "models-pms";
// ✅ Get all donations
export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("donorId", "name email");
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Get a specific donation by ID
export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate("donorId", "name email");
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Update donation status (approve/reject)
export const updateDonationStatus = async (req, res) => {
  const { status } = req.body;
  // if (!["approved", "rejected"].includes(status)) {
  //   return res.status(400).json({ message: "Invalid status" });
  // }

  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    donation.status = status;
    await donation.save();

    res.status(200).json({ message: `Donation ${status} successfully`, donation });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
