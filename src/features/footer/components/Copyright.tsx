const Copyright = () => {
  const date = new Date().getFullYear();

  return (
    <span className="text-xs">
      &copy; {date} SCRAW STUDIO. ALL RIGHTS RESERVED
    </span>
  );
};

export default Copyright;
