import { ComponentPropsWithRef, ElementRef, forwardRef, ForwardRefRenderFunction } from 'react';

const Section: ForwardRefRenderFunction<ElementRef<'div'>, ComponentPropsWithRef<'div'>> = (
  { children },
  ref
) => {
  return (
    <div className='section' ref={ref}>
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
