export const ArrowUp = ({isActive} : {isActive: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 41 41"
    className="rotate-0"
  >
    <path
      fill={isActive ? "yellow" : "currentColor"}
      fillRule="evenodd"
      d="M28.852 27.333V41h-16.7V27.333H0L20.5 0 41 27.333z"
    ></path>
  </svg>
);

export const ArrowLeft = ({isActive} : {isActive: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 41 41"
    className="-rotate-90"
  >
    <path
      fill={isActive ? "yellow" : "currentColor"}
      fillRule="evenodd"
      d="M28.852 27.333V41h-16.7V27.333H0L20.5 0 41 27.333z"
    ></path>
  </svg>
);

export const ArrowDown = ({isActive} : {isActive: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 41 41"
    className="rotate-180"
  >
    <path
      fill={isActive ? "yellow" : "currentColor"}
      fillRule="evenodd"
      d="M28.852 27.333V41h-16.7V27.333H0L20.5 0 41 27.333z"
    ></path>
  </svg>
);

export const ArrowRight = ({isActive} : {isActive: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 41 41"
    className="rotate-90"
  >
    <path
      fill={isActive ? "yellow" : "currentColor"}
      fillRule="evenodd"
      d="M28.852 27.333V41h-16.7V27.333H0L20.5 0 41 27.333z"
    ></path>
  </svg>
);
