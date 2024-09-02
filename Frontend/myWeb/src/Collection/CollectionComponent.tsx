import React from 'react';
import './CollectionComponent.css';

const CollectionComponent: React.FC = () => {
    return (
        <>
            <div className="form-container">
                <form className="form">
                    
                        
                    
                    <input className="toggle-input" id="toggle-checkbox" type="checkbox" />
                    <p className="form-title">Name Collection</p>
                    <p className="form-sub-title">
                        Lorem ipsum dolor sit amet.
                    </p>
                    <div className="login-card">
                        <div className="field-container">
                            <input placeholder="" className="input" type="email" />
                            <span className="placeholder">Collection Name</span>
                        </div>
                        <button className="btn" type="button">
                            <label className="btn-label" htmlFor="toggle-checkbox">Create</label>
                        </button>
                    </div>
                    <div className="password-card">
                        <div className="field-container">
                            <input placeholder="" className="input" type="password" />
                            <span className="placeholder">Password</span>
                        </div>
                        <button className="btn" type="button">
                            <label className="btn-label" htmlFor="toggle-checkbox">Login</label>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CollectionComponent;
