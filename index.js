//import all classes from the ./lib folder in es6 syntax

import Menus from './lib/Menus.js';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
const menu = new Menus();


let logo = 'Employee Manager';
figlet(logo, (err, data) => {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }

    runTitle(data);
    return;

});

const sleep = (ms = 1500) => new Promise(resolve => setTimeout(resolve, ms));

async function runTitle(data) {
    const animatedTitle = chalkAnimation.rainbow(data);
    await sleep();
    animatedTitle.stop();
    console.log(chalk.blue('---------------------------------'));
    menu.mainMenu()
}

