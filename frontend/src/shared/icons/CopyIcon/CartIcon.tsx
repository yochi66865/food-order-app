export const CopyIcon = ({
  className = "",
  onClickHandler = () => {},
}: {
  className?: string;
  onClickHandler?: () => void;
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      onClick={onClickHandler}
    >
      <path
        d="M8 2.5a1.5 1.5 0 0 1 1.5 1.462V10.5A1.5 1.5 0 0 1 8.038 12H1.5A1.5 1.5 0 0 1 0 10.538V4a1.5 1.5 0 0 1 1.462-1.5H8Zm0 1H1.5a.5.5 0 0 0-.5.475V10.5a.5.5 0 0 0 .475.5H8a.5.5 0 0 0 .5-.475V4a.5.5 0 0 0-.475-.5H8ZM10.5 0A1.5 1.5 0 0 1 12 1.462V8a1.5 1.5 0 0 1-.748 1.298.5.5 0 0 1-.525-.851l.023-.014a.5.5 0 0 0 .25-.405V1.5a.5.5 0 0 0-.475-.5H4a.5.5 0 0 0-.419.227l-.014.023A.5.5 0 0 1 2.7.75 1.5 1.5 0 0 1 3.958 0H10.5Z"
        fill="#2E9CC3"
      />
    </svg>
  );
};
