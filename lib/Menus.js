import inquirer from 'inquirer';
import Handler from './Handler.js';
const questions = import('./questions.js');
const handler = new Handler();

class Menus {

    async mainMenu() {
        // console.log( questions);
        let response = await questions;
        response = response.default;
        // console.log(2);

        await inquirer.prompt(response[3])
            .then((answer) => {

                handler.getInput(answer.option)
                    .then((data) => {
                        if(data == false) {
                            return false;
                        }
                        this.mainMenu();
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        this.mainMenu();
                    });


            })
            .catch((err) => {
                console.log("error at main menu")
                console.log(err);
            });
    }

   


}

export default Menus;