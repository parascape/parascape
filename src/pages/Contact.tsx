import Navbar from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { useParams } from 'react-router-dom';

const Contact = () => {
  const { type } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-12">
        <ContactForm type={type} />
      </div>
    </div>
  );
};

export default Contact;