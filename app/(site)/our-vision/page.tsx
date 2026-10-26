import { SitePage, TextLink } from "@/app/components/site/SitePage";

export const metadata = { title: "Our vision" };

export default function VisionPage() {
  return (
    <SitePage
      title="A school that can see its own day."
      image="/site/yard.jpg"
      alt="Students walking together outside a school"
    >
      <p>
        The day should not depend on who remembers the notebook. A class, a
        teacher, a family note, and the afternoon event belong on the same desk
        the office already opened.
      </p>
      <p>
        Join Looms is that desk. Not a second school, and not a promise about
        what a machine will decide. The office still runs the day. The record
        stays where the day is.
      </p>
      <TextLink href="/contact">Talk about your school</TextLink>
    </SitePage>
  );
}
