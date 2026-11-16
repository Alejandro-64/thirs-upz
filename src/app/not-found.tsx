import { Container, Heading, Link, Section } from "@/components";

const NotFound = () => {
  return (
    <>
      <title>Page not found | Thirs Upz</title>

      <Container>
        <Section>
          <Heading tag="h1">Page not found</Heading>
        </Section>

        <section className="flex flex-col gap-4">
          <p className="text-xs">
            The page you are looking for does not exist or is no longer
            available.
          </p>
          <Link href="/shop">← Return to Shop</Link>
        </section>
      </Container>
    </>
  );
};

export default NotFound;
