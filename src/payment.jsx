import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import payment from './payment'


function Payment() {
  const [PaymentSelected, setPaymentSelected] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleOptionSelected = (option) => {
    setPaymentSelected(option);
  };

  const handlePurchase = () => {
    if (PaymentSelected !== 'premium') {
      alert('Please select the Premium option to make a purchase :D');
    } else {
      setIsPurchased(true);
    }
  };

  const handleDescriptionClick = (desc) => {
    setDescription(desc);
    navigate('/app')
  };

  const Data = [
    {
      id: '1',
      src: "https://i.pinimg.com/236x/31/c7/d8/31c7d8d658d814e4abfe6e8cbd7589cf.jpg",
      Title: 'START',
      Desc: 'FREE',
      Price:'Rs. 0',
      Continue:'-Post only 10 questions',
      LinkToStripe: false
    },
    {
      id: '2',
      src: "https://i.pinimg.com/236x/77/d9/c1/77d9c1adfabb5a6bf55dcc7ac3b24e5c.jpg",
      Title: 'EXPERT',
      Desc: 'PREMIUM' ,
      Price:'Rs. 999',
      Continue:'-Unlimited questions',
      LinkToStripe: true
    },
  ];

  return (
        <div>
            <h1 className='h1'>PRICING PLANS</h1>
      {PaymentSelected === 'premium' && !isPurchased && (
        <div>
          <Link to="https://buy.stripe.com/test_00g6oF8ZW1ff8bC8ww">
            <button onClick={handlePurchase}>
              Purchase Premium
            </button>
          </Link>
        </div>
      )}
      {isPurchased && (
        <div>
          Congratulations! You've purchased the Premium access.
          <br></br>
          <button onClick={() => navigate('/app')}>Go to Home</button>
        </div>
      )}

      <div className="imageContainer">
        {Data.map((item) => (
          <div className="imageCard" key={item.id}>
            <div className="image">
              <img src={item.src} alt="loading.." height="100%" width="100%" />
            </div>
            <div className="imageTitle">
              {item.Title}
              <div className="imageDesc">
              {item.Desc}
            </div>
            <div className='price'>
                {item.Price}
            </div>
              <div className="continue">
                {item.Continue}
                </div>
                <div>
                    {/* premium one */}
                {item.LinkToStripe ? (
                  <a href="https://buy.stripe.com/test_00g6oF8ZW1ff8bC8ww">
                    <button className='description-button'>
                      Buy Now
                    </button>
                  </a>
                ) : (
                  <button className="description-button" onClick={() => handleDescriptionClick(item.Desc)}>
                    Buy Now
                  </button>
                )}
              </div>
            </div>
            <div className="more">
                {item.More}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payment;
