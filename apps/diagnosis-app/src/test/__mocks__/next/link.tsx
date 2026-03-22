import React from 'react';

function Link({ href, children, className, ...rest }: { href: string; children: React.ReactNode; className?: string; [key: string]: unknown }) {
  return <a href={href} className={className} {...rest}>{children}</a>;
}

export default Link;
