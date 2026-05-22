import Link from "next/link";
import Image from "next/image";
import LogoImage from "../../public/logo.svg";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        src={LogoImage}
        alt="Logo Thirs Upz"
        width={100}
        height={80}
        className={"w-25 h-20"}
      />
    </Link>
  );
};

export default Logo;
