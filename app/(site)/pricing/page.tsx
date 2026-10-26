import { SitePage, TextLink } from "@/app/components/site/SitePage";
import { included } from "@/lib/site/content";
import styles from "@/app/components/site/site.module.css";

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <SitePage
      title="One desk for the school."
      image="/site/classroom.jpg"
      alt="An empty classroom with rows of desks"
    >
      <p>
        There is one Join Looms desk: the school office. The price is set with
        the school. It is not listed here, because a number we invented would
        not be a price.
      </p>
      <p>The desk includes:</p>
      <ul className={styles.list}>
        {included.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>Write with the school name and we will answer what the desk includes.</p>
      <TextLink href="/contact">Ask about your school</TextLink>
    </SitePage>
  );
}
