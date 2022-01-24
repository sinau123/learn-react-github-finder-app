import React from "react";
import { FaSpinner } from "react-icons/fa";
import { IconBaseProps } from "react-icons/lib";

interface IIconProps extends IconBaseProps {
  className?: string;
}

const Loader: React.FC<IIconProps> = (props) => {
  return <FaSpinner {...props} className={"animate-spin " + props.className} />;
};

export default Loader;
