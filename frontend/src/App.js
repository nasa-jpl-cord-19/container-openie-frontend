import React, {
  useState
} from 'react';
// import logo from './logo.svg';
import './App.css';


import {
  Stack,
  Button,
  ThemeProvider, 
  ColorModeProvider,
  Input,
  Text,
  Code
} from "@chakra-ui/core";


// const url = "http://httpbin.org/post"
const url = "https://openie.covid19data.space/getExtraction"


function App() {

  const [response, setResponse] = useState(null);


  async function submitData() {
    console.log("Sending following data: ", document.getElementById('covid-data').value);
    
    let response = await fetch(url, {
      method: 'POST',
      body: document.getElementById('covid-data').value
    });

    let result = await response.json();
    console.log("Received payload!", result)
    setResponse(JSON.stringify(result, null, "\t"));
  }

  const jsonData = {
    name: "Jonth",
    email: "jobtd@mail.com",
    website: "www.4codev.com"
  };

  function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  function onDownload(){
    download(JSON.stringify(JSON.parse(response)), "data.json", "text/plain");
  }

  return (
    <ThemeProvider>
      <ColorModeProvider>
        <div className="App" >
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header> */}
          <Stack spacing={8} maxWidth={"50%"} mx="auto" mt={40}>
            <Text fontSize="4xl">Data for <Code fontSize="3xl">/getExtraction</Code></Text>
            <Input id="covid-data" placeholder="Input data here" size="lg" />
            <Button variantColor="teal" onClick={() => submitData()}>Submit</Button>

            <div align="left">
              <Text mt={10} fontSize="4xl">Response</Text>
              <Button variantColor="purple" onClick={() => onDownload()}>Download</Button>
              <br />
              <Code as="pre" p={5}>
                {response}
              </Code>
            </div>
  
        </Stack>
        </div>
      </ColorModeProvider>
    </ThemeProvider>

  );
}

export default App;
