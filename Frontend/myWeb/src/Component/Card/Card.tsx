import React from 'react';
import './Card.css';

export const Card: React.FC = () => {
    return (
        <div className="card">
            <div className="first-content">
                <span>First</span>
            </div>
            <div className="second-content">
                <span>Second</span>
            </div>
        </div>
    );
};

