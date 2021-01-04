import stringStripHtml from 'string-strip-html'

export const stripHtml =
    maybeHtmlString =>
      maybeHtmlString
        ? stringStripHtml(maybeHtmlString)?.result
        : maybeHtmlString
