import { Container, Heading, Section } from "@/components";
import { Cart } from "@/features";

const Checkout = () => {
  return (
    <Container>
      <Section>
        <Heading tag="h1">Checkout</Heading>
      </Section>

      <Cart />
    </Container>
  );
};

export default Checkout;
