interface ErrorProps {
  message: string;
}
const ErrorMessage = ({ message }: ErrorProps) => {
  return (
    <div className="flex justify-center">
      <span className="text-base text-red-500">{message}</span>
    </div>
  );
};

export default ErrorMessage;
