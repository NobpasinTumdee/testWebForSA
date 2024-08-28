import React, { useState } from 'react';
import './PopUp.css';


interface FormState {
    NameMovie: string;
    Description: string;
    date: string;
}

export const PopUpAdmin: React.FC = () => {
    const [form, setForm] = useState<FormState>({
        NameMovie: '',
        Description: '',
        date: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = () => {

        console.log('Form data:', form);
    };


    return (

        <div className='PopUpAdmin'>
            <div className='textAdim'>
                Edit Info Movie
            </div>
            <div className="">
                <label htmlFor="NameMovie">Name Movie:</label>
                <input
                    type="text"
                    id="NameMovie"
                    name="NameMovie"
                    value={form.NameMovie}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="">
                <label htmlFor="Description">Description:</label>
                <textarea
                    id="Description"
                    name="Description"
                    value={form.Description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="">
                <label htmlFor="date">Release Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <button onClick={handleSubmit} className="submit-button">
                Confirm
            </button>
        </div>

    );
};

export default PopUpAdmin;
