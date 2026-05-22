import { Container, Heading, Paragraph, Section } from "@/components";
import { Email } from "@/features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Thirs Upz",
  description:
    "Get in touch with the Thirs Upz team. Contact us for customer support, order inquiries, or business collaborations from Lima and worldwide.",
};

const Contact = () => {
  return (
    <Container>
      <Section>
        <Heading tag="h1">Contact</Heading>
      </Section>

      <Section className="gap-40">
        <Paragraph>
          For all inquiries, please email thirs-upz@gmail.com
        </Paragraph>

        <Email />
      </Section>
    </Container>
  );
};

export default Contact;
