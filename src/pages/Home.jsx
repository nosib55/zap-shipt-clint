import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks ';
import Services from './Services';
import HelpedTeams from './HelpedTeams';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services ></Services>
            <HelpedTeams></HelpedTeams>
        </div>
    );
};

export default Home;