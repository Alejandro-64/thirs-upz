import { Container, Heading, Paragraph, Section } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Thirs Upz",
  description:
    "Discover the story of Thirs Upz. Born in Lima, inspired by classic fashion, we craft timeless clothing with unique cultural essence.",
};

const About = () => {
  return (
    <Container>
      <Section>
        <Heading tag="h1">About</Heading>
      </Section>

      <Section>
        <img
          src="https://pueblareal.mx/wp-content/uploads/2026/02/712187-scaled.jpeg"
          alt="Image about the team"
          width={400}
          height={400}
          className="w-full aspect-9/16"
        />

        <div className="flex flex-col gap-4">
          <Paragraph>
            Led by a team of creative designers, our firm is a seasonal clothing
            brand initially recognized for its elaborate, custom-designed,
            hand-drawn garments. Based in the heart of the textile industry, the
            studio currently balances its production between bespoke haute
            couture pieces, seasonal collections, and special design projects.
          </Paragraph>
          <Paragraph>
            Our garments are created with a vision of elevated play and artistic
            expression, but always designed with everyday wear in mind. We
            supply a select combination of limited-edition domestic and imported
            fabrics, in addition to developing exclusive locally manufactured
            textiles and prints. Each piece is executed with a high level of
            craftsmanship and attention to detail, honoring the personalized
            dedication upon which the brand was founded. Our practice revolves
            around constant research and experimentation, drawing inspiration
            from a wide variety of disciplines to create new visual contexts.
          </Paragraph>
          <Paragraph>
            Throughout our history, we have established strategic alliances with
            a diverse range of global brands, fashion publications, and creative
            collectives for the development of special projects and
            limited-edition capsule collections.
          </Paragraph>
        </div>
      </Section>
    </Container>
  );
};

export default About;
