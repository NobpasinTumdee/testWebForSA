import { Card } from "../Component/Card/Card"


function PreviewSubscription() {
    return (
        <>
        <div style={{display: 'flex',position: 'fixed', top: '45%', left: '35%', marginTop: '-50px', marginLeft: '-100px',gap: '30px'}}>
            <Card />
            <Card />
            <Card />
        </div>
        </>
    )
}

export default PreviewSubscription
