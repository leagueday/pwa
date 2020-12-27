
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
        newNode[child.name] = recSub(child)
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
