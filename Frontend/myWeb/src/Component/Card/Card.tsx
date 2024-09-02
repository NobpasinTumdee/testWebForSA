import React from 'react';
import './Card.css';

export const Card: React.FC = () => {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <p className="title">FLIP CARD</p>
                    <p>Hover Me</p>
                </div>
                <div className="flip-card-back">
                    <p className="title">BACK</p>
                    <p>Leave Me</p>
                </div>
            </div>
        </div>
    );
};

