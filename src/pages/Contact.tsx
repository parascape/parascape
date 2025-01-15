import Navbar from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 pb-12">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;