import React from 'react'
import {MDXProvider} from '@mdx-js/react';
import CodeBlock from './CodeBlock';

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock
}

export default function WrapRootElement({element}) {
  return(
    <MDXProvider components={components}>{element}</MDXProvider>
)};