import inquirer from 'inquirer';
import Handler from './Handler.js';
import Questions from './Questions.js';
const handler = new Handler();
const questions = new Questions().questions;
class Menus {

    async mainMenu() {
        // console.log( questions);
        // console.log(2);

        await inquirer.prompt(questions[3])
            .then((answer) => {

                handler.getInput(answer.option)
                    .then((data) => {
                        if(data == false) {
                            return false;
                        }
                        // console.clear();
                        this.mainMenu();
                        
                    })
                    .catch((err) => {
                        console.log(err);
                    });


            })
            .catch((err) => {
                console.log("error at main menu")
                console.log(err);
            });
    }

   


}

export default Menus;