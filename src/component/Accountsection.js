import React from 'react';

const AccountSection = ({ title, amount, description, accountType }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount" data-account={accountType}>${amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button" data-account={accountType}>View transactions</button>
      </div>
    </section>
  );
};

export default AccountSection;
