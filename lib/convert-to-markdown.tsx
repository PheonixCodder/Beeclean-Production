"use client";

import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const ConvertToMarkdown = memo(function MarkdownBubble({
  text,
}: {
  text: string;
}) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-xl font-bold mt-5 mb-3" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-lg font-bold mt-4 mb-2" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-base font-bold mt-3 mb-2" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className="text-sm font-bold mt-2 mb-1" {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6 className="text-xs font-bold mt-2 mb-1" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-4 leading-relaxed" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul
            className="list-disc list-inside space-y-2 mb-5 ml-4"
            {...props}
          />
        ),
        ol: ({ node, ...props }) => (
          <ol
            className="list-decimal list-inside space-y-2 mb-5 ml-4"
            {...props}
          />
        ),
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        a: ({ node, ...props }) => (
          <a
            {...props}
            className="underline text-primary"
            target="_blank"
            rel="noreferrer"
          />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-gray-300 pl-4 italic"
            {...props}
          />
        ),
        table: ({ node, ...props }) => (
          <table className="w-full border-collapse mb-4" {...props} />
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-gray-100" {...props} />
        ),
        tbody: ({ node, ...props }) => (
          <tbody className="divide-y" {...props} />
        ),
        tr: ({ node, ...props }) => <tr className="border-b" {...props} />,
        th: ({ node, ...props }) => (
          <th className="px-4 py-2 text-left font-semibold" {...props} />
        ),
        td: ({ node, ...props }) => <td className="px-4 py-2" {...props} />,
        del: ({ node, ...props }) => (
          <del className="line-through" {...props} />
        ),
        input: ({ node, ...props }) => (
          <input
            {...props}
            type="checkbox"
            className="mr-2 rounded border-gray-300 text-primary focus:ring-primary cursor-default"
            readOnly
          />
        ),
        code: (props) => {
          const { node, className, children, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return !match ? (
            <code
              className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono"
              {...rest}
            >
              {children}
            </code>
          ) : (
            <code
              className="block bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4"
              {...rest}
            >
              {children}
            </code>
          );
        },
        pre: ({ node, ...props }) => (
          <pre
            className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"
            {...props}
          />
        ),
        img: ({ node, ...props }) => (
          <img
            className="max-w-full h-auto rounded-lg my-4"
            {...props}
            alt={props.alt || ""}
          />
        ),
        hr: ({ node, ...props }) => (
          <hr className="my-6 border-gray-300" {...props} />
        ),
        br: ({ node, ...props }) => <br className="my-1" {...props} />,
      }}
    >
      {text}
    </ReactMarkdown>
  );
});

export default ConvertToMarkdown;
