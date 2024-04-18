import React, { useState } from 'react';
import HeaderCard from './HeaderCard'; // Import the HeaderCard component
import {IconButton} from '../UI Elements/Button';
import 'daisyui'; // Ensure DaisyUI is imported if it is not globally available

const AccessCard = ({ onSubmitAccess }) => {
    const [accessInstructions, setAccessInstructions] = useState('');

    const headerTextStyle = {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '24px'
    };

    const handleAccessSubmit = (e) => {
        e.preventDefault();
        onSubmitAccess(accessInstructions); // This function should be defined in the parent component or context
    };

    return (
        <HeaderCard headerText="Access" headerTextStyle={headerTextStyle}>
            <form onSubmit={handleAccessSubmit} className="flex flex-col justify-end gap-4 p-4 min-h-96">
                <textarea 
                    className="textarea textarea-bordered w-full flex-grow overflow-y-auto" 
                    placeholder="Type your access instructions here..."
                    value={accessInstructions}
                    onChange={(e) => setAccessInstructions(e.target.value)}
                />
                <IconButton
                    className="btn btn-primary"
                    type="submit"
                    text="Update"
                />
            </form>
        </HeaderCard>
    );
};

export default AccessCard;
