const fs = require("node:fs");
const path = require("node:path");
const foldersList = [];

function outputAllFolders(folderPaths) {
  folderPaths.forEach(async (folderPath) => {
    const results = fs.readdirSync(folderPath);
    const listInnerFolders = results.filter((res) =>
      fs.lstatSync(path.resolve(folderPath, res)).isDirectory()
    );
    if (listInnerFolders.length === 0) {
      return;
    }

    const innerFolderPaths = listInnerFolders.map((folder) =>
      path.resolve(folderPath, folder)
    );

    innerFolderPaths.forEach((innerFolder) => foldersList.push(innerFolder));
    // let saida = [...foldersList, ...innerFolder];
    outputAllFolders(innerFolderPaths);
  });

  // console.log(results);
  // elenca apenas as pastas válidas
}

function main() {
  const folderPaths = [path.resolve(__dirname, "Main Folder")];

  outputAllFolders(folderPaths);
  console.log(foldersList);
}

main();

/*
folderPaths.forEach((folderPath) => {
    // para a pasta pesquisada
    const results = fs.readdirSync(folderPath);
    // elenca apenas as pastas válidas
    const listInnerFolders = results.filter((res) =>
      fs.lstatSync(path.resolve(folderPath, res)).isDirectory()
    );

    if (listInnerFolders.length === 0) {
      return;
    }

    const innerFolderPaths = listInnerFolders.map((folder) =>
      path.resolve(folderPath, folder)
    );

    innerFolderPaths.forEach((innerFolder) => foldersList.push(foldersList));
    // let saida = [...foldersList, ...innerFolder];
    const foldersList = outputAllFolders(innerFolderPaths, foldersList);

    return foldersList;
  });
*/
