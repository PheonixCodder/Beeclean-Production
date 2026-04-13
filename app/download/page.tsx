import DownloadComp from "@/components/download";
import HowItWorks from "@/components/home/how-it-works";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

const Download = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden">
      <Navbar />
      <main className="flex-1 pt-20">
        <DownloadComp />
      </main>
      <Footer />
    </div>
  );
};

export default Download;
