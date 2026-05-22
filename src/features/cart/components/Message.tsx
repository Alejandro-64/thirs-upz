import { Link } from "@/components";

const Message = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-2xl">Your cart is empty</p>
      <Link href={"/shop"}>← Return to Shop</Link>
    </div>
  );
};

export default Message;
