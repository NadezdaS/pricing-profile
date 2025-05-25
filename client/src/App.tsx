import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PricingProfile from './pages/PricingProfilePage';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path='/pricing-profile' element={<PricingProfile />} />
			</Routes>
		</Router>
	);
}
