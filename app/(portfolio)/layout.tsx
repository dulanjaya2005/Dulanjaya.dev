import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import VisitorTracker from "@/components/utils/VisitorTracker";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoadingScreen />
      <CursorSpotlight />
      <VisitorTracker />
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
