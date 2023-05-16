const getCodeAsString = (code: any): string => {
  const codeString = code.toString();
  const codeWithSyntax = codeString.substring(codeString.indexOf("{"));
  const finalCode = `${codeString}`;
  console.log(finalCode);

  return finalCode;
};

export { getCodeAsString };
