import MenuBar from './MenuBar';
import FooterDisclaimer from './FooterDisclaimer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MenuBar />
      <main className="flex-grow">{children}</main>
      <FooterDisclaimer />
    </div>
  );
};

export default Layout;
