// components/RichTextBlocks.jsx
const RichTextBlocks = {
  // Párrafos
  paragraph: ({ children }) => (
    <p className="mb-6 text-lg leading-relaxed text-gray-700">{children}</p>
  ),

  // Headings con jerarquía tipo Medium
  heading: ({ children, level }) => {
    const styles = {
      1: "mt-12 mb-6 text-4xl font-bold text-gray-900 leading-tight",
      2: "mt-10 mb-4 text-3xl font-bold text-gray-900 leading-tight",
      3: "mt-8 mb-3 text-2xl font-semibold text-gray-900 leading-snug",
      4: "mt-6 mb-3 text-xl font-semibold text-gray-800",
      5: "mt-4 mb-2 text-lg font-semibold text-gray-800",
      6: "mt-4 mb-2 text-base font-semibold text-gray-700",
    };
    const Tag = `h${level}`;
    return <Tag className={styles[level]}>{children}</Tag>;
  },

  // Listas
  list: ({ children, format }) => {
    if (format === "ordered") {
      return (
        <ol className="pl-6 mb-6 space-y-2 text-lg leading-relaxed list-decimal text-gray-700">
          {children}
        </ol>
      );
    }
    return (
      <ul className="pl-6 mb-6 space-y-2 text-lg leading-relaxed list-disc text-gray-700">
        {children}
      </ul>
    );
  },

  "list-item": ({ children }) => <li className="pl-1">{children}</li>,

  // Citas
  quote: ({ children }) => (
    <blockquote className="pl-6 my-8 border-l-4 border-[#ed741b]">
      <div className="text-lg italic leading-relaxed text-gray-600">
        {children}
      </div>
    </blockquote>
  ),

  // Código
  code: ({ children }) => (
    <pre className="overflow-x-auto p-4 my-6 text-sm leading-relaxed text-gray-200 bg-gray-900 rounded-lg">
      <code>{children}</code>
    </pre>
  ),

  // Imágenes
  image: ({ image }) => (
    <figure className="my-8">
      <img
        src={image.url}
        alt={image.alternativeText || ""}
        className="w-full rounded-lg"
      />
      {image.caption && (
        <figcaption className="mt-2 text-sm text-center text-gray-500">
          {image.caption}
        </figcaption>
      )}
    </figure>
  ),
};

export default RichTextBlocks;
