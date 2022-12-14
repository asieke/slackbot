//write a function to stripe '\n' characters but only from the beginning of the string
module.exports.stripNewLines = (text) => {
  //if the first character is a new line, remove it
  if (text.charAt(0) === '\n') {
    text = text.substring(1);
  }
  //if the last character is a new line, remove it
  if (text.charAt(text.length - 1) === '\n') {
    text = text.substring(0, text.length - 1);
  }

  text = text.trim();

  // if the text begins with "ada:" then remove it
  if (text.substring(0, 4) === 'ava:') {
    text = text.substring(5);
  }

  //return the text
  return text;
};

module.exports.removeBracketText = (str) => {
  return str.replace(/<[^>]*>/g, '');
};
