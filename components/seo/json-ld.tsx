/**
 * Emits a structured-data graph as a native `<script type="application/ld+json">`.
 *
 * The payload has to be written with `dangerouslySetInnerHTML` rather than as a
 * child: React HTML-escapes text children, which would turn the JSON into
 * `&quot;`-laden nonsense. Escaping `<` to its unicode form is what makes that
 * safe — it is the only character that could terminate the script element
 * early, and `<` is a legal escape inside a JSON string, so the document
 * cannot be broken out of no matter what the data contains.
 *
 * This is the approach Next documents for JSON-LD. `next/script` is for
 * executable JavaScript and would be the wrong tool for inert data.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
