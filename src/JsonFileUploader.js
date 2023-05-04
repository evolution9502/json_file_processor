import React, { useState } from "react";

const JsonFileUploader = () => {
  const [fileContent, setFileContent] = useState("");
  const [result, setResult] = useState({});

  const handleFileRead = (event) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const content = fileReader.result;
      setFileContent(content);
    };
    if (event.target.files[0]) {
      fileReader.readAsText(event.target.files[0]);
    }
  };

  const swapKeyValue = () => {
    try {
      const parsedJson = JSON.parse(fileContent);
      const swappedJson = Object.entries(parsedJson).reduce(
        (acc, [key, value]) => {
          acc[value] = key;
          return acc;
        },
        {}
      );
      setResult(swappedJson);
    } catch (error) {
      alert("Invalid JSON file");
    }
  };

  const setEmptyValues = () => {
    try {
      const parsedJson = JSON.parse(fileContent);
      const emptyValuesJson = Object.keys(parsedJson).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});
      setResult(emptyValuesJson);
    } catch (error) {
      alert("Invalid JSON file");
    }
  };

  const setValuesToKeys = () => {
    try {
      const parsedJson = JSON.parse(fileContent);
      const keysAsValuesJson = Object.keys(parsedJson).reduce((acc, key) => {
        acc[key] = key;
        return acc;
      }, {});
      setResult(keysAsValuesJson);
    } catch (error) {
      alert("Invalid JSON file");
    }
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileRead} />
      <button onClick={swapKeyValue}>Swap Key-Value</button>
      <button onClick={setEmptyValues}>Set Values to Empty</button>
      <button onClick={setValuesToKeys}>Set Values to Keys</button>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

export default JsonFileUploader;
