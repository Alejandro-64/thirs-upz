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
          src="https://cdn.shopify.com/s/files/1/0602/5117/7177/files/Small_Talk_Hype_Beast_Selects_096.jpg?v=1746808435"
          alt="Image about the team"
          width={400}
          height={400}
          className="w-full aspect-9/16"
        />

        <div className="flex flex-col gap-4">
          <Paragraph>
            Run by Nick Williams and Phil Ayers, Small Talk Studio is a seasonal
            clothing brand initially known for their elaborate custom hand-drawn
            garments. Based in the heart of the Garment District in New York
            City, the studio now balances their output between made-to-order
            custom garments, seasonal collections, and special projects.
          </Paragraph>
          <Paragraph>
            Their garments are created with a sense of elevated play and
            artistry, but designed with everyday wear in mind. Sourcing a mix of
            domestic and Japanese deadstock fabrics as well as creating custom
            milled and printed fabrics and manufacturing most everything in New
            York, everything is executed with a high degree of craftsmanship and
            attention to detail, much like the custom garments the brand was
            founded upon. Small Talk’s practice revolves around research and
            experimentation, sourcing imagery and inspiration from a broad and
            disparate range of sources and working to create new contexts for
            their garments and the visual world behind them.
          </Paragraph>
          <Paragraph>
            Small Talk has partnered with a variety of brands on special
            projects and collaborations including Carhartt WIP, Gitman Vintage,
            Kartik Research, Fullcount & Co., Nike Running, Throwing Fits,
            Perfectly Imperfect, among others.
          </Paragraph>
        </div>
      </Section>
    </Container>
  );
};

export default About;
