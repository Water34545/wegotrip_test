import classNames from "classnames";
import classNamesBind from "classnames/bind";

export const getCx = (styles: {readonly [key: string]: string}) : typeof classNames => {
  const cx = classNamesBind.bind(styles);
  return cx;
}