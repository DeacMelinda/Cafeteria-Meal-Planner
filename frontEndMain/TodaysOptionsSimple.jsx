import React from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { CafeteriasTodayCarouselHook } from './components/CafeteriasTodayCarouselHook';

const Today = () => {
return (
	<div>
    	<div><Navbar/></div>
        
            <CafeteriasTodayCarouselHook/>

        <div><Sidebar/></div>
    </div>
    );
};

export default Today;
