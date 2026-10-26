import { SitePage, TextLink } from "@/app/components/site/SitePage";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <SitePage
      title="For the person who opens the office."
      image="/site/teacher.jpg"
      alt="A teacher with young students at a table"
    >
      <p>
        Join Looms is the desk for a school office. It keeps teachers, classes,
        children, and families in one place, so the morning is not a hunt
        through separate books.
      </p>
      <p>
        Parents are part of the record. The person who runs the day is the one
        who signs in. One office login opens the lists, the notices, and the
        requests that arrived before the bell.
      </p>
      <TextLink href="/our-vision">Read the vision</TextLink>
    </SitePage>
  );
}
