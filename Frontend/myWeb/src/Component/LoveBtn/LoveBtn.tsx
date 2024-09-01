import './LoveBtn.css';
export const LoveBtn: React.FC = () => {
    return (
        <>
            <div className="tooltip-container">
                <span className="tooltip">LOVE THIS</span>
                <span className="text">
                    <div className="borde-back">
                        <div className="iconLOVE">
                            ❤️
                        </div>
                    </div>
                </span>
            </div>
        </>
    );
};