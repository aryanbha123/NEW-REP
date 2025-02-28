import { CreditCard } from '@mui/icons-material';
import { TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader2 from '../../../utilities/Loader2';

const Donations = () => {
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [donation, setDonation] = useState({
        donorId: user?.id || '',
        donationType: '',
        itemName: '',
        quantity: '',
        expiryDate: '',
        priority: 'Low'
    });

    const handleChange = (e) => {
        setDonation({ ...donation, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/user/donations/", donation);
            toast.success('Donation submitted successfully!');
            setDonation({
                donorId: user?.id || '',
                donationType: '',
                itemName: '',
                quantity: '',
                expiryDate: '',
                // priority: 'Low'
            });
        } catch (error) {
            toast.error('Failed to submit donation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form className='p-6  gap-4 mx-auto' onSubmit={handleSubmit}>
                <h1>Make a donation</h1>
                <TextField sx={{mt:2}} required label='Donor ID' fullWidth variant='standard' value={donation.donorId} disabled />

                <TextField
                    required
                    sx={{
                        mt: 2
                    }}
                    select
                    label='Donation Type'
                    name='donationType'
                    value={donation.donationType}
                    onChange={handleChange}
                    fullWidth
                    variant='standard'
                >
                    <MenuItem value='seed'>Seed</MenuItem>
                    <MenuItem value='plant'>Plant</MenuItem>
                    <MenuItem value='other'>Other</MenuItem>
                </TextField>

                <TextField
                    required
                    label='Item Name'
                    name='itemName'
                    value={donation.itemName}
                    onChange={handleChange}
                    fullWidth
                    variant='standard'
                    sx={{ mt: 2 }}
                />
                <TextField
                    required
                    label='Quantity'
                    name='quantity'
                    type='number'
                    value={donation.quantity}
                    onChange={handleChange}
                    fullWidth
                    variant='standard'
                    sx={{ mt: 2 }}
                    inputProps={{ min: 1 }}
                />
                <TextField
                    label='Expiry Date'
                    required
                    name='expiryDate'
                    type='date'
                    value={donation.expiryDate}
                    onChange={handleChange}
                    fullWidth
                    variant='standard'
                    sx={{ mt: 2 }}
                    InputLabelProps={{ shrink: true }}
                />
{/* 
                <TextField
                    select
                    label='Priority'
                    name='priority'
                    value={donation.priority}
                    onChange={handleChange}
                    fullWidth
                    variant='standard'
                    sx={{ mt: 2 }}
                >
                    <MenuItem value='Low'>Low</MenuItem>
                    <MenuItem value='Medium'>Medium</MenuItem>
                    <MenuItem value='High'>High</MenuItem>
                </TextField> */}

                <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    type='submit'
                    sx={{ mt: 4 }}
                    startIcon={loading ? <CircularProgress size={20} color='inherit' /> : <CreditCard />}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Donate Now'}
                </Button>
            </form>
            {
                loading &&
                <Loader2 />
            }
        </>
    );
};

export default Donations;
