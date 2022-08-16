import React, { SVGProps } from 'react';

export const ReactComponent = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>((props, ref) => (
  <svg
    ref={ref}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
ReactComponent.displayName = 'SvgrMock';

export default 'SvgUrl';
