#! /usr/bin/env node
const yargs = require("yargs");
const { myExec } = require('./lib/utils');





let input = yargs.argv._
if (input[0]) {
    command(yargs.argv)
}


async function command(input) {
    try {
        console.log(input);
        let command = input._.reduce((res, current) => {
            res += ` ${current}`;
            return res
        })
        let resultCommand = await myExec(`sudo -S ${command}`)
        console.log("******************************************************");
        console.log(resultCommand);
        console.log("******************************************************");
    } catch (error) {
        console.log("EEEEEEER:", error);
    }

}