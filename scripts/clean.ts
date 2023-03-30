
const data = require("./metadata/slide5-v2.json")

async function main() {

    let result = cleanIt(data);
    console.log(result)
    // fs.writeFileSync('./slideX', result);
}


function cleanIt(obj) {
    let cleaned = JSON.stringify(obj, null, 2);

    return cleaned.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, function (match) {
        return match.replace(/"/g, "");
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
