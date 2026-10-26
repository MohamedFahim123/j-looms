import { ContactForm } from "@/app/components/site/ContactForm";
import { SitePage } from "@/app/components/site/SitePage";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <SitePage
      title="Write to the desk."
      image="/site/notebooks.jpg"
      alt="Books stacked on a table"
    >
      <p>
        Tell us the school and what you need opened. This demo keeps the note
        on the page. It does not send email.
      </p>
      <ContactForm />
    </SitePage>
  );
}
