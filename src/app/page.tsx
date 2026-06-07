import { Container } from "@/components";
import Image from "next/image";

const Home = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-2 pb-8">
        <div>
          <Image
            src="/video-desktop.gif"
            alt="Animated Image"
            width={400}
            height={400}
            className="object-cover pointer-events-none select-none w-full h-full"
          />
        </div>
      </div>
    </Container>
  );
};

export default Home;
