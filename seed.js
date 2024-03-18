const { createTables, populateTables, dropTables } = require("./sampleData.js");

(async function getStarted() {
    await dropTables();
    await createTables();
    await populateTables();
    console.log("Lets go!");
})();
