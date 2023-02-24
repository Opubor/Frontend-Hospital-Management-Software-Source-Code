import React from "react";

function Td({ children, ...rest }) {
  return (
    <td className="px-4 py-2" {...rest}>
      {children}
    </td>
  );
}

export default Td;
