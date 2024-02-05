interface IProps {
  color?: string;
}

export const NumberIcon = ({ color = "black" }: IProps) => {
  return (
    <svg
      className="mx-auto"
      width="36"
      height="36"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        color={color}
        d="M45 16a3 3 0 013 3v16a3 3 0 01-3 3H9a3 3 0 01-3-3V19a3 3 0 013-3h36zm0 2H9a1 1 0 00-1 1v16a1 1 0 001 1h36a1 1 0 001-1V19a1 1 0 00-1-1zM35 28.444h7l-3.5 4-3.5-4zM35 26h7l-3.5-4-3.5 4z"
      />
    </svg>
  );
};

export const DateTimeIcon = ({ color = "black" }: IProps) => {
  return (
    <svg
      className="mx-auto"
      width="36"
      height="36"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M37.908 13.418h-5.004v-2.354h-1.766v2.354H21.13v-2.354h-1.766v2.354H14.36c-1.132 0-2.06.928-2.06 2.06v23.549c0 1.132.928 2.06 2.06 2.06h6.77v-1.766h-6.358a.707.707 0 01-.706-.706V15.89c0-.39.316-.707.706-.707h4.592v2.355h1.766v-2.355h10.008v2.355h1.766v-2.355h4.592c.39 0 .707.317.707.707v6.358h1.765v-6.77c0-1.133-.927-2.06-2.06-2.06z"
        clipRule="evenodd"
      ></path>
      <path
        fill={color}
        d="M35.13 37.603l1.237-1.237-3.468-3.475v-5.926h-1.754v6.654l3.984 3.984z"
      ></path>
      <path
        fill={color}
        fillRule="evenodd"
        d="M23.08 36.962a9.678 9.678 0 1017.883-7.408 9.678 9.678 0 00-17.882 7.408zm4.54-10.292a7.924 7.924 0 118.805 13.177A7.924 7.924 0 0127.62 26.67z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
export const TextInputIcon = ({ color = "black" }: IProps) => {
  return (
    <svg
      className="mx-auto"
      width="36"
      height="36"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M45 16a3 3 0 013 3v16a3 3 0 01-3 3H9a3 3 0 01-3-3V19a3 3 0 013-3h36zm0 2H9a1 1 0 00-1 1v16a1 1 0 001 1h36a1 1 0 001-1V19a1 1 0 00-1-1zm-32 4v10h-2V22h2z"
      ></path>
    </svg>
  );
};
export const TextAreaIcon = ({ color = "black" }: IProps) => {
  return (
    <svg
      className="mx-auto"
      width="36"
      height="36"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M45 13a3 3 0 013 3v22a3 3 0 01-3 3H9a3 3 0 01-3-3V16a3 3 0 013-3h36zm0 2H9a1 1 0 00-1 1v22a1 1 0 001 1h36a1 1 0 001-1V16a1 1 0 00-1-1zm-1.136 15.5l.848.849-6.363 6.363-.849-.848 6.364-6.364zm.264 3.5l.849.849-2.828 2.828-.849-.849L44.128 34zM13 19v10h-2V19h2z"
      ></path>
    </svg>
  );
};
export const CheckboxIcon = ({ color = "black" }: IProps) => {
  return (
    <svg
      className="mx-auto"
      width="36"
      height="36"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M34 18H20a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V20a2 2 0 00-2-2zm-9 14l-5-5 1.41-1.41L25 29.17l7.59-7.59L34 23l-9 9z"></path>
    </svg>
  );
};
export const ChecklistIcon = ({ color = "black" }: IProps) => {
  return (
    <svg
      className="mx-auto"
      width="36"
      height="36"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 12h-6v6h6v-6zm-6-2a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6zM18 36h-6v6h6v-6zm-6-2a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6zM18 24h-6v6h6v-6zm-6-2a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6z"
        fill="#161616"
      ></path>
      <path
        d="M23 14.5a1 1 0 011-1h19a1 1 0 011 1v1a1 1 0 01-1 1H24a1 1 0 01-1-1v-1zM23 26.5a1 1 0 011-1h19a1 1 0 011 1v1a1 1 0 01-1 1H24a1 1 0 01-1-1v-1zM23 38.5a1 1 0 011-1h19a1 1 0 011 1v1a1 1 0 01-1 1H24a1 1 0 01-1-1v-1z"
        fill="#161616"
      ></path>
    </svg>
  );
};
export const RadioIcon = ({ color = "black" }: IProps) => {
  return (
    <svg
      className="mx-auto"
      width="36"
      height="36"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M27 22c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
    </svg>
  );
};
export const SelectIcon = ({ color = "black" }: IProps) => {
  return (
    <svg
      className="mx-auto"
      width="36"
      height="36"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M45 16a3 3 0 013 3v16a3 3 0 01-3 3H9a3 3 0 01-3-3V19a3 3 0 013-3h36zm0 2H9a1 1 0 00-1 1v16a1 1 0 001 1h36a1 1 0 001-1V19a1 1 0 00-1-1zm-12 7h9l-4.5 6-4.5-6z"
      ></path>
    </svg>
  );
};
export const TagListIcon = ({ color = "black" }: IProps) => {
  return (
    <svg
      className="mx-auto"
      width="36"
      height="36"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45 16a3 3 0 013 3v16a3 3 0 01-3 3H9a3 3 0 01-3-3V19a3 3 0 013-3h36zm0 2H9a1 1 0 00-1 1v16a1 1 0 001 1h36a1 1 0 001-1V19a1 1 0 00-1-1z"
        fill="#000"
      ></path>
      <path
        d="M11 22a1 1 0 011-1h19a1 1 0 011 1v10a1 1 0 01-1 1H12a1 1 0 01-1-1V22z"
        fill="#505562"
      ></path>
    </svg>
  );
};
export const ImageIcon = ({ color = "black" }: IProps) => {
  return (
    <svg
      className="mx-auto"
      width="36"
      height="36"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 54 54`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.636 21.91A3.818 3.818 0 1127 21.908a3.818 3.818 0 017.636 0zm-2 0A1.818 1.818 0 1129 21.908a1.818 1.818 0 013.636 0z"
        fill="#000"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 13a2 2 0 00-2 2v24a2 2 0 002 2h24a2 2 0 002-2V15a2 2 0 00-2-2H15zm24 2H15v12.45l4.71-4.709a1.91 1.91 0 012.702 0l6.695 6.695 2.656-1.77a1.91 1.91 0 012.411.239L39 32.73V15zM15 39v-8.754c.06-.038.116-.083.168-.135l5.893-5.893 6.684 6.685a1.911 1.911 0 002.41.238l2.657-1.77 6.02 6.02c.052.051.108.097.168.135V39H15z"
        fill="#000"
      ></path>
    </svg>
  );
};
export const TextIcon = ({ color = "black" }: IProps) => {
  return (
    <svg
      className="mx-auto"
      width="36"
      height="36"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.58 33.77h-3l-1.18-3.08H11l-1.1 3.08H7l5.27-13.54h2.89zm-5-5.36l-1.86-5-1.83 5zM22 20.23h5.41a15.47 15.47 0 012.4.14 3.42 3.42 0 011.41.55 3.47 3.47 0 011 1.14 3 3 0 01.42 1.58 3.26 3.26 0 01-1.91 2.94 3.63 3.63 0 011.91 1.22 3.28 3.28 0 01.66 2 4 4 0 01-.43 1.8 3.63 3.63 0 01-1.09 1.4 3.89 3.89 0 01-1.83.65q-.69.07-3.3.09H22zm2.73 2.25v3.13h3.8a1.79 1.79 0 001.1-.49 1.41 1.41 0 00.41-1 1.49 1.49 0 00-.35-1 1.54 1.54 0 00-1-.48c-.27 0-1.05-.05-2.34-.05zm0 5.39v3.62h2.57a11.52 11.52 0 001.88-.09 1.65 1.65 0 001-.54 1.6 1.6 0 00.38-1.14 1.75 1.75 0 00-.29-1 1.69 1.69 0 00-.86-.62 9.28 9.28 0 00-2.41-.23zM44.35 28.79l2.65.84a5.94 5.94 0 01-2 3.29A5.74 5.74 0 0141.38 34a5.87 5.87 0 01-4.44-1.84 7.09 7.09 0 01-1.73-5A7.43 7.43 0 0137 21.87 6 6 0 0141.54 20a5.64 5.64 0 014 1.47A5.33 5.33 0 0147 24l-2.7.65a2.8 2.8 0 00-2.86-2.27A3.09 3.09 0 0039 23.42a5.31 5.31 0 00-.93 3.5 5.62 5.62 0 00.93 3.65 3 3 0 002.4 1.09 2.72 2.72 0 001.82-.66 4 4 0 001.13-2.21z"></path>
    </svg>
  );
};
export const ButtonIcon = ({ color = "black" }: IProps) => {
  return (
    <svg
      className="mx-auto"
      width="36"
      height="36"
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M45 17a3 3 0 013 3v14a3 3 0 01-3 3H9a3 3 0 01-3-3V20a3 3 0 013-3h36zm-9 8.889H18v2.222h18V25.89z"
      ></path>
    </svg>
  );
};
