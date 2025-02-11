export const ArrowUp = ({
  isActive,
  shake,
}: {
  isActive: boolean;
  shake: boolean;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 41 41"
    className="rotate-0"
  >
    <path
      fill={shake ? "red" : isActive ? "yellow" : "white"}
      fillRule="evenodd"
      d="M28.852 27.333V41h-16.7V27.333H0L20.5 0 41 27.333z"
    ></path>
  </svg>
);

export const ArrowLeft = ({
  isActive,
  shake,
}: {
  isActive: boolean;
  shake: boolean;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 41 41"
    className="-rotate-90"
  >
    <path
      fill={shake ? "red" : isActive ? "yellow" : "white"}
      fillRule="evenodd"
      d="M28.852 27.333V41h-16.7V27.333H0L20.5 0 41 27.333z"
    ></path>
  </svg>
);

export const ArrowDown = ({
  isActive,
  shake,
}: {
  isActive: boolean;
  shake: boolean;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 41 41"
    className="rotate-180"
  >
    <path
      fill={shake ? "red" : isActive ? "yellow" : "white"}
      fillRule="evenodd"
      d="M28.852 27.333V41h-16.7V27.333H0L20.5 0 41 27.333z"
    ></path>
  </svg>
);

export const ArrowRight = ({
  isActive,
  shake,
}: {
  isActive: boolean;
  shake: boolean;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 41 41"
    className="rotate-90"
  >
    <path
      fill={shake ? "red" : isActive ? "yellow" : "white"}
      fillRule="evenodd"
      d="M28.852 27.333V41h-16.7V27.333H0L20.5 0 41 27.333z"
    ></path>
  </svg>
);
