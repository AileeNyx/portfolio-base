import Header from '@/components/Header';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="pt-32 pb-12">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
} 