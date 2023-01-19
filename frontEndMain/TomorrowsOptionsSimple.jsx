import React from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { CafeteriasTomorrowCarouselHook } from './components/CafeteriasTomorrowCarouselHook';

const Tomorrow = () => {
return (
	<div>
		<div><Navbar/></div>
		
		<CafeteriasTomorrowCarouselHook today={false} />

		<div><Sidebar/></div>
	</div>
);
};

export default Tomorrow;

