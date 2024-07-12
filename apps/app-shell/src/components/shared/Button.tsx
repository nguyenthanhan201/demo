/* eslint-disable react/destructuring-assignment */
import { ComponentPropsWithoutRef, memo, ReactNode } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  backgroundColor?: string;
  size?: string;
  icon?: ReactNode;
  animate?: boolean;
};

const Button = (props: ButtonProps) => {
  const { children, className, type = 'button', backgroundColor, animate, ...restProps } = props;
  const bg = backgroundColor ? 'bg-' + backgroundColor : 'bg-main';

  const size = props.size ? 'btn-' + props.size : '';

  const _animate = animate ? 'btn-animate' : '';

  return (
    <button
      {...restProps}
      className={`btn ${bg} ${size} ${_animate} ${className} disabled:bg-slate-500 disabled:cursor-not-allowed`}
      onClick={props.onClick ? props.onClick : undefined}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      <span className='btn_txt'>{children}</span>
      {props.icon ? <span className='btn_icon'>{props.icon}</span> : null}
    </button>
  );
};

export default memo(Button);
