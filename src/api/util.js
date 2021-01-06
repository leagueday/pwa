import * as apiConsts from './consts'

const isHttpUrl =
  (httpRegex =>
      url => httpRegex.test(url)
  )(RegExp('^https?:\/\/'))

// laminate -
// this function undoes a mechanical pattern introduced by the xml parser -
// mainly the parse result has arrays of children instead of using node objects
// naturally as key-value stores of children
export const laminate = rawXmlParseResult => {
  const getKeysString = node => {
    if (!node || typeof(node) !== 'object') return ''

    return `${
      Object.getOwnPropertyNames(node).filter(
        propName => propName !== 'toJSON' && propName !== 'parent'
      )
    }`
  }

  const omitText = obj => {
    if (obj.text) delete obj.text;
    return obj
  }

  function recSub(node) {
    if (!node) return node

    const {attributes, children, name, text, type} = node

    const newNode = {}

    if (attributes && Object.keys(attributes).length > 0) newNode.attributes = attributes

    if (type && type !== 'element') newNode.type = type

    for (let child of children) {
      if (child.name) {
        const maybeExistingNamedChild = newNode[child.name]
        const nextNamedChild = recSub(child)

        if (maybeExistingNamedChild) {
          if (Array.isArray(maybeExistingNamedChild)) {
            newNode[child.name] = [...maybeExistingNamedChild, nextNamedChild]
          } else {
            newNode[child.name] = [maybeExistingNamedChild, nextNamedChild]
          }
        } else {
          newNode[child.name] = nextNamedChild
        }
      }
      else {
        const childKeys = getKeysString(child)

        if ((childKeys === 'text,type' || childKeys === 'type,text') && child.type === 'text')
          newNode.text = child.text
      }
    }

    return getKeysString(newNode) === 'text' ? newNode.text : omitText(newNode)
  }

  return recSub(rawXmlParseResult)
}

export const proxifyHttpUrl = (url, responseKind) =>
  isHttpUrl(url)
    ? proxifyUrl(url, responseKind)
    : url

export const proxifyUrl = (url, responseKind) => {
  const params = new URLSearchParams({
    kind: responseKind,
    url,
  })

  return `/.netlify/functions/node-fetch?${params}`
}
