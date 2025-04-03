import MenuBar from '../components/MenuBar';
import FooterDisclaimer from '../components/FooterDisclaimer';

import { Analytics } from '@vercel/analytics/next';
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MenuBar />
      <main className="flex-grow">
				{children}
				<Analytics/>
			</main>

      <FooterDisclaimer />
    </div>
  );
};

export default Layout;
