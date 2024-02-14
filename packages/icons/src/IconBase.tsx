import { ComponentPropsWithoutRef } from 'react';

export type IconBaseProps = ComponentPropsWithoutRef<'svg'> & {
  size?: number;
  viewBox?: string;
};

const IconBase = (props: IconBaseProps) => {
  const {
    className,
    size = 24,
    viewBox = '0 0 24 24',
    children,
    fill = 'currentColor',
    ...restProps
  } = props;

  return (
    <span className={className}>
      <svg width={size} height={size} viewBox={viewBox} fill={fill} {...restProps}>
        {children}
      </svg>
    </span>
  );
};

export default IconBase;
