import { forwardRef, ForwardRefRenderFunction } from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const Section: ForwardRefRenderFunction<HTMLDivElement, SectionProps> = (
  { children, ...props },
  ref
) => {
  return (
    <div className='section' ref={ref} {...props}>
      {children}
    </div>
  );
};

export const SectionTitle = ({ children }: any) => {
  return <div className='section_title'>{children}</div>;
};

export const SectionBody = ({ children }: any) => {
  return <div className='section_body'>{children}</div>;
};

export default forwardRef(Section);
