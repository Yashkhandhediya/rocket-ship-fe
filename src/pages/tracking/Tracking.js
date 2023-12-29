import { useEffect, useState } from "react";
import './Tracking.css'
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

export default function Tracking() {
    const [shipmentData, setShipmentData] = useState();

    const fetchTrackShipmentOrder = () => {
    // Parse query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);

    // Get the value of the 'stringValue' parameter
    const stringValue = queryParams.get('data');

    // Set the received string value in the component state
        axios
            .get('http://43.252.197.60:8030/order/track?order_id='+stringValue)
            .then(async (resp) => {
                if (resp.status === 200) {
                    const data = resp?.data?.ShipmentData?.[0]?.Shipment;

                    setShipmentData(data);
                } else {
                    toast('There is some error while fetching orders.', { type: 'error' });
                }
            })
            .catch(() => {
                toast('There is some error while fetching orders.', { type: 'error' });
            });
    };

    useEffect(() => {
        fetchTrackShipmentOrder()
    }, [])

    const copyToClipboard = () => {
        // Get the current URL
        const currentURL = window.location.href;

        // Use the Clipboard API to copy the URL to the clipboard
        navigator.clipboard.writeText(currentURL)
            .then(() => {
                toast('Shipment tracking Url Copied', { type: 'success' });
                // alert('URL copied to clipboard!');
            })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error('Failed to copy:', err);
                // Handle error
                // alert('Failed to copy URL to clipboard');
            });
    }

    return (
        <div className="tarcking-main">
            <div className="name-header">
                <span className="name-span">{shipmentData && shipmentData.Consignee && shipmentData.Consignee.Name ? shipmentData.Consignee.Name : ''}</span>
            </div>
            <div className="info-main">
                <div className="info-container">
                    <div className="buyer-confirm-msg-container">
                        <span>You dont have access to take any action on the
                            tracking page. <a>Click here</a> to verify yourself as a buyer.</span>
                    </div>
                    <div className="map-container">
                        <div className="status-header">
                            <div className="status-text">Status:</div> <div className="copy-icon">
                                <span onClick={copyToClipboard} style={{ cursor: 'pointer' }}>Copy</span>
                            </div>
                            <div className="status-val">
                                {shipmentData && shipmentData.Status && shipmentData.Status.Status ? shipmentData.Status.Status : 'N.A.'}
                            </div>
                        </div>

                        <div style={{ boxSizing: 'border-box', padding: '20px 10px' }}>
                            <iframe src="https://maps.google.com/maps?q=380007, India&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" style={{ boxSizing: 'border-box', width: '100%', height: '260px', borderRadius: '10px' }}>
                            </iframe> <a href="https://yt2.org/youtube-to-mp3-ALeKk00qEW0sxByTDSpzaRvl8WxdMAeMytQ1611842368056QMMlSYKLwAsWUsAfLipqwCA2ahUKEwiikKDe5L7uAhVFCuwKHUuFBoYQ8tMDegUAQCSAQCYAQCqAQdnd3Mtd2l6" style={{ color: 'rgb(51, 122, 183)', textDecoration: 'none solid rgb(51, 122, 183)', boxSizing: 'border-box', backgroundColor: 'rgba(0, 0, 0, 0)' }}></a>
                        </div>

                        <div className="delivery-partner">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div className="font-0.8" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                                    <img style={{ width: '50px', height: '50px', borderRadius: '50%' }} src='https://images.pexels.com/photos/11422442/pexels-photo-11422442.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' />
                                    <div>{shipmentData && shipmentData.CourierName ? shipmentData.CourierName : 'N.A.'}</div>
                                </div>
                                <div className="font-0.8">
                                    <div>Tracking ID</div>
                                    <div style={{ color: 'blue' }}>{shipmentData && shipmentData.AWB ? shipmentData.AWB : 'N.A.'}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '2.5rem' }}>
                                <div>
                                    <strong>{shipmentData && shipmentData.Status && shipmentData.Status.StatusDateTime ? moment(shipmentData.Status.StatusDateTime).format('DD MMM') : ''}</strong>
                                    <div className="font-0.8">{shipmentData && shipmentData.Status && shipmentData.Status.StatusDateTime ? moment(shipmentData.Status.StatusDateTime).format('hh:mm A') : ''}</div>
                                </div>
                                <div>
                                    <div style={{ width: '10px', height: '10px', backgroundColor: 'gray', borderRadius: '50%' }}></div>
                                </div>
                                <div className="font-0.8">
                                    <div style={{ padding: '0.2rem' }}><strong>Activity: </strong>{shipmentData && shipmentData.Status && shipmentData.Status.Instructions ? shipmentData.Status.Instructions : 'N.A.'}</div>
                                    <div style={{ padding: '0.2rem' }}><strong>Location: </strong>{shipmentData && shipmentData.Status && shipmentData.Status.StatusLocation ? shipmentData.Status.StatusLocation : 'N.A.'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-details-container">
                        <div className="order-details-header">Order Details</div>
                        <div>
                            <div className="order-grid-container">
                                <div className="order-grid-item">
                                    <strong className="font-0.8">Order ID</strong>
                                </div>
                                <div className="order-grid-item font-0.8">
                                    <span>60332858138</span>
                                </div>
                            </div>
                            <div className="order-grid-container font-0.8">
                                <div className="order-grid-item">
                                    <strong className="font-0.8">Order Placed On</strong>
                                </div>
                                <div className="order-grid-item">
                                    <span>{shipmentData && shipmentData.OrderDate ? shipmentData.OrderDate : 'N.A.'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ratings-container">
                        <p style={{ whiteSpace: 'wrap' }}>
                            Based on your recent interaction with {shipmentData && shipmentData.Consignee && shipmentData.Consignee.Name ? shipmentData.Consignee.Name : ''}, how likely are you to recommend {shipmentData && shipmentData.Consignee && shipmentData.Consignee.Name ? shipmentData.Consignee.Name : ''} to friends &amp; family?
                        </p>
                        <ul className="rating-number-list" style={{ marginBottom: '0px', paddingLeft: '0px', display: 'inline-block', borderRadius: '4px', marginTop: '20px', boxSizing: 'border-box' }}>
                            <li data-rating="0" className="rating-number-link">
                                <a className="rating-number rating-poor">0</a>
                                <div style={{ display: 'none', boxSizing: 'border-box' }}>
                                    <i style={{ boxSizing: 'border-box', display: 'inline-block', fontStyle: 'normal', fontVariant: 'normal', fontKerning: 'auto', fontOpticalSizing: 'auto', fontFeatureSettings: 'normal', fontVariationSettings: 'normal', fontWeight: 400, fontStretch: '100%', lineHeight: '14px', fontFamily: 'FontAwesome', fontSize: '14px', textRendering: 'auto', WebkitFontSmoothing: 'antialiased' }}></i>
                                </div>
                            </li>
                            <li data-rating="1" className="rating-number-link">
                                <a className="rating-number  rating-poor">1</a>
                            </li>
                            <li data-rating="2" className="rating-number-link">
                                <a className="rating-number  rating-poor">2</a>
                            </li>
                            <li data-rating="3" className="rating-number-link">
                                <a className="rating-number  rating-poor">3</a>
                            </li>
                            <li data-rating="4" className="rating-number-link">
                                <a className="rating-number  rating-medium">4</a>
                            </li>
                            <li data-rating="5" className="rating-number-link">
                                <a className="rating-number  rating-medium">5</a>
                            </li>
                            <li data-rating="6" className="rating-number-link">
                                <a className="rating-number  rating-medium">6</a>
                            </li>
                            <li data-rating="7" className="rating-number-link">
                                <a className="rating-number  rating-medium">7</a>
                            </li>
                            <li data-rating="8" className="rating-number-link">
                                <a className="rating-number  rating-good">8</a>
                            </li>
                            <li data-rating="9" className="rating-number-link">
                                <a className="rating-number  rating-good">9</a>
                            </li>
                            <li data-rating="10" style={{ marginRight: '0px', display: 'inline-block', boxSizing: 'border-box' }}>
                                <a className="rating-number  rating-good">10</a>
                                <div style={{ display: 'none', boxSizing: 'border-box' }}>
                                    <i style={{ boxSizing: 'border-box', display: 'inline-block', fontStyle: 'normal', fontVariant: 'normal', fontKerning: 'auto', fontOpticalSizing: 'auto', fontFeatureSettings: 'normal', fontVariationSettings: 'normal', fontWeight: 400, fontStretch: '100%', lineHeight: '14px', fontFamily: 'FontAwesome', fontSize: '14px', textRendering: 'auto', WebkitFontSmoothing: 'antialiased' }}></i>
                                </div>
                            </li>
                        </ul>
                        <div style={{ marginBottom: '12px', marginTop: '5px', boxSizing: 'border-box' }}>
                            <a style={{ color: 'rgb(85, 85, 85)', display: 'inline-block', cursor: 'default', textDecoration: 'none solid rgb(85, 85, 85)', boxSizing: 'border-box', backgroundColor: 'rgba(0, 0, 0, 0)' }}><i style={{ display: 'block', fontSize: '26px', paddingLeft: '10px', marginBottom: '5px', boxSizing: 'border-box', fontStyle: 'normal', fontVariant: 'normal', fontKerning: 'auto', fontOpticalSizing: 'auto', fontFeatureSettings: 'normal', fontVariationSettings: 'normal', fontWeight: 400, fontStretch: '100%', lineHeight: '26px', fontFamily: 'FontAwesome', textRendering: 'auto', WebkitFontSmoothing: 'antialiased' }}></i> Not at all likely</a> <a href="javascript:void(0);" style={{ float: 'right', textAlign: 'right', color: 'rgb(85, 85, 85)', display: 'block', cursor: 'default', textDecoration: 'none solid rgb(85, 85, 85)', boxSizing: 'border-box', backgroundColor: 'rgba(0, 0, 0, 0)' }}><i style={{ paddingRight: '7px', display: 'block', fontSize: '26px', paddingLeft: '10px', marginBottom: '5px', boxSizing: 'border-box', fontStyle: 'normal', fontVariant: 'normal', fontKerning: 'auto', fontOpticalSizing: 'auto', fontFeatureSettings: 'normal', fontVariationSettings: 'normal', fontWeight: 400, fontStretch: '100%', lineHeight: '26px', fontFamily: 'FontAwesome', textRendering: 'auto', WebkitFontSmoothing: 'antialiased' }}></i>Extremely likely </a>
                        </div>
                        <form style={{ boxSizing: 'border-box' }}>
                            <label style={{ marginTop: '18px', fontWeight: 700, display: 'block', marginBottom: '7px', maxWidth: '100%', boxSizing: 'border-box' }}>Remarks</label> <input type="hidden" name="brand_id" value="0" style={{ width: '100%', height: '40px', lineHeight: '40px', padding: '0px 20px', background: 'rgb(242, 242, 242) none repeat scroll 0% 0% / auto padding-box border-box', border: '0px none rgb(164, 164, 164)', borderRadius: '10px', marginBottom: '27px', color: 'rgb(164, 164, 164)', fontFamily: 'GoogleSans', fontSize: '14px', boxSizing: 'border-box', margin: '0px 0px 27px' }} /> <input type="hidden" name="nps_score" value="" style={{ width: '100%', height: '40px', lineHeight: '40px', padding: '0px 20px', background: 'rgb(242, 242, 242) none repeat scroll 0% 0% / auto padding-box border-box', border: '0px none rgb(164, 164, 164)', borderRadius: '10px', marginBottom: '27px', color: 'rgb(164, 164, 164)', fontFamily: 'GoogleSans', fontSize: '14px', boxSizing: 'border-box', margin: '0px 0px 27px' }} /> <input style={{ color: '#333', width: '100%', height: '40px', lineHeight: '40px', padding: '0px 20px', background: 'rgb(242, 242, 242) none repeat scroll 0% 0% / auto padding-box border-box', border: '0px none rgb(51, 51, 51)', borderRadius: '10px', marginBottom: '27px', fontFamily: 'GoogleSans', fontSize: '14px', boxSizing: 'border-box', margin: '0px 0px 27px' }} type="text" name="nps_review" maxLength="250" placeholder="Please enter your remarks (Max. 250 characters)" /> <button style={{ minWidth: '170px', fontFamily: '"SFProRegular"', fontSize: '15px', height: '45px', lineHeight: '45px', fontWeight: 700, padding: '0px', color: 'rgb(255, 255, 255)', borderRadius: '5px', display: 'inline-block', marginBottom: '0px', textAlign: 'center', whiteSpace: 'nowrap', verticalAlign: 'middle', touchAction: 'manipulation', cursor: 'pointer', backgroundImage: 'none', border: '0.8px solid rgba(0, 0, 0, 0)', userSelect: 'none', boxSizing: 'border-box', appearance: 'button', textTransform: 'none', overflow: 'visible', margin: '0px', background: 'rgb(41, 96, 219) none repeat scroll 0% 0% / auto padding-box border-box' }}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}