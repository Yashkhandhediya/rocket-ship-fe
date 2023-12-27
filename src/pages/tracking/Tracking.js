import React from "react";
import './Tracking.css'

export default function Tracking() {
    return (
        <div className="tarcking-main">
            <div className="name-header">
                <span className="name-span">Name</span>
            </div>
            <div className="info-main">
                <div className="info-container">
                    <div className="buyer-confirm-msg-container">
                        <span>You dont have access to take any action on the
                            tracking page. Click here to verify yourself as a buyer.</span>
                    </div>
                    <div className="map-container">
                        <div className="status-header">
                            <div className="status-text">Status:</div> <div className="copy-icon">Icon</div>
                            <div className="status-val">Cancellation Requested</div>
                        </div>

                        <div style={{ boxSizing: 'border-box' }}>
                            <iframe src="https://maps.google.com/maps?q=380007, India&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" style={{ boxSizing: 'border-box', width: '92%', height: '260px', borderRadius: '10px', margin: '23px 23px 0px' }}>
                            </iframe> <a href="https://yt2.org/youtube-to-mp3-ALeKk00qEW0sxByTDSpzaRvl8WxdMAeMytQ1611842368056QMMlSYKLwAsWUsAfLipqwCA2ahUKEwiikKDe5L7uAhVFCuwKHUuFBoYQ8tMDegUAQCSAQCYAQCqAQdnd3Mtd2l6" style={{ color: 'rgb(51, 122, 183)', textDecoration: 'none solid rgb(51, 122, 183)', boxSizing: 'border-box', backgroundColor: 'rgba(0, 0, 0, 0)' }}></a>
                        </div>
                    </div>
                    <div className="order-details-container"> Order Details</div>
                    <div className="ratings-container">Ratings</div>
                </div>
            </div>

        </div>
    )
}