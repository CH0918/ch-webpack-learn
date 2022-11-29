const path = require("path");
const fs = require("fs");

const babylon = require("babylon");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");

let ID = 0;
function createAsset(filename) {
  const content = fs.readFileSync(filename, "utf-8");

  const ast = babylon.parse(content, {
    sourceType: "module",
  });
  const dependencies = [];

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      // console.log("====", node.source.value);
      dependencies.push(node.source.value);
    },
  });
  const id = ID++;
  const { code } = transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  return {
    id,
    filename,
    dependencies,
    code,
  };
}

function createGraph(entry) {
  const mainAsset = createAsset(entry);
  // console.log(mainAsset);
  const queue = [mainAsset];
  for (const asset of queue) {
    asset.mapping = {};
    const dirname = path.dirname(asset.filename);
    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath);
      const child = createAsset(absolutePath);
      asset.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }
  // console.log(queue);
  return queue;
}

function bundle(graph) {
  let modules = "";
  graph.forEach((mod) => {
    modules += `${mod.id}: [
			function (require, module, exports) {
				${mod.code}
			},${JSON.stringify(mod.mapping)}
		],`;
  });
  const result = `(function(modules) {
  	function require(id) {
  		const [fn, mapping] = modules[id];
  		function localRequire(name) {
  			return require(mapping[name]);
  		}
  		const module = {exports: {}};
  		fn(localRequire, module, module.exports);
  		return module.exports;
  	}
  	require(0);
  })({${modules}})`;
  return result;
}

const graph = createGraph("./example/test.js");
// console.log("graph = ", graph);
const result = bundle(graph);
fs.mkdir("pro", (err) => {
  if (!err) {
    fs.writeFile("./pro/main.js", result, (err1) => {
      if (!err1) {
        console.log("打包成功");
      } else {
        console.log("err1 = ", err1);
      }
    });
  }
});
