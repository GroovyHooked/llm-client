import ReactMarkdown from "react-markdown";

// eslint-disable-next-line react/prop-types
export const MarkDown = ({text}) => {
  return (
    <ReactMarkdown>{text}</ReactMarkdown>
  )
}
