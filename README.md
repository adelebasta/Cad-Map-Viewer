# Merging CAD data with map data in a mobile application

### Software to support maintenance works in the airfield of airports

06.02.2023

Author: Adele Bastyte

### Technical Stack

- [Typescript:](https://www.typescriptlang.org/) Programming Language
- [React Native:](https://nodejs.dev/) Cross-Platform Application Development Framework

### Installation

Install the packages used in the project:

```
npm install
```

After the packages have been successfully installed, it is necessary to add the absolute path of the DXF file to the project to be able to visualize it in the application. The DXF file (building.dxf) can be found at ./src/data/. The next step is to add the absolute path of the DXF file to the absolutePath variable, which is located in ./src/config/testData.tsx. An example of an absolute path is shown below:

```
const absolutePath = "Users/adele/tmp/building.dxf";
```

### Start locally

CadMapViewer application can be started locally:

```
expo start
```

To run the application on a simulator, either IOS or Android simulator can be selected:

```
› Press a | open Android
› Press i | open iOS simulator
```
