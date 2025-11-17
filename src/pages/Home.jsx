import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks ';
import Services from './Services';
import HelpedTeams from './HelpedTeams';
import FeaturesList from './FeaturesList';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services ></Services>
            <HelpedTeams></HelpedTeams>
            <FeaturesList></FeaturesList>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;