import { Container, Heading, Section } from "@/components";
import OrderSummary from "@/features/checkout/OrderSummary";

const CheckoutSuccess = () => {
  return (
    <>
      <title>Order confirmed | Thirs Upz</title>

      <Container>
        <Section>
          <Heading tag="h1">Order confirmed</Heading>
        </Section>

        <OrderSummary />
      </Container>
    </>
  );
};

export default CheckoutSuccess;
