import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import ProductsShelf from '@/components/ProductsShelf';
import About from '@/components/About';
import Process from '@/components/Process';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <ProductsShelf />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
