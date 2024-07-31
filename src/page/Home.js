import 'font-awesome/css/font-awesome.min.css';
import FeatureItem from '../component/Featureitem';
import Subtitle from '../component/Subtitle';

import iconChat from '../assets/icon-chat.webp';
import iconMoney from '../assets/icon-money.webp';
import iconSecurity from '../assets/icon-security.webp';

const HomePage = () => {

  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <Subtitle text="No fees." />
          <Subtitle text="No minimum deposit." />
          <Subtitle text="High interest rates." />
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <FeatureItem
          imgSrc={iconChat}
          imgAlt="Chat Icon"
          title="You are our #1 priority"
          description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
        />
        <FeatureItem
          imgSrc={iconMoney}
          imgAlt="Money Icon"
          title="More savings means higher rates"
          description="The more you save with us, the higher your interest rate will be!"
        />
        <FeatureItem
          imgSrc={iconSecurity}
          imgAlt="Security Icon"
          title="Security you can trust"
          description="We use top of the line encryption to make sure your data and money is always safe."
        />
      </section>
    </main>
  );
};

export default HomePage;
