import React from 'react'
import Prism from 'prism-react-renderer/prism';
import Highlight, {defaultProps} from 'prism-react-renderer'
import dartLang from 'refractor/lang/dart';
dartLang(Prism);

export default function CodeBlock ({children, className}) {
  const language = className.replace(/language-/, '')

  return (
    <Highlight {...defaultProps} Prism={Prism} code={children} language={language}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={className} style={{...style, padding: '20px'}}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} style={{}} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}