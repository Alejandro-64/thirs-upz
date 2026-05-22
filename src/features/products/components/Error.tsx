interface ErrorProps {
  message: string;
}
const Error = ({ message }: ErrorProps) => {
  return (
    <div className="flex justify-center">
      <span className="text-base text-red-500">{message}</span>
    </div>
  );
};

export default Error;
