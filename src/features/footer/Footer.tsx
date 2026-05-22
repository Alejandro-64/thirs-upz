import { Container, Link, Logo } from "@/components";
import {
  LEGAL_MENU,
  NAVIGATION_MENU,
  SOCIAL_MEDIA,
} from "@/constants/navigation";
import { Box, Copyright } from "./components";

const Footer = () => {
  return (
    <footer className="bg-surface-light pt-24 pb-8">
      <Container>
        {/* <div className="flex justify-center">
          <div className="bg-background w-full md:w-100 px-4 sm:px-0 py-4">
            <Logo size="lg" />
          </div>
        </div> */}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Box className="flex-row justify-start gap-16">
            <Box>
              {LEGAL_MENU.map((item) => (
                <Link key={item.id} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </Box>

            <Box>
              {NAVIGATION_MENU.map((item) => (
                <Link key={item.id} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </Box>

            <Box>
              {SOCIAL_MEDIA.map((item) => (
                <Link key={item.id} href={item.href} target="_blank">
                  {item.label}
                </Link>
              ))}
            </Box>
          </Box>

          <Box className="items-end">
            <Copyright />
          </Box>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
