import './LoveBtn.css';
export const LoveBtn: React.FC = () => {
    return (
        <>
            <div className="tooltip-container">
                <span className="tooltip">Add to collection</span>
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