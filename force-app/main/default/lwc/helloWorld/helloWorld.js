import FirstName from '@salesforce/schema/Contact.FirstName';
import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    mainText = 'GLobal Code Team';

    employeeList = [
        { id: '001',
            FirstName: "Giselle",
            LastName: "Partington",
            Role: "Program Coordinator",
        },
        {id: '002',
            FirstName: "Vittoria",
            LastName: "Paolino",
            Role: "Head of Operations",
        },
         { id: '003',
            FirstName: "Aisha",
            LastName: "Animashun",
            Role: "Team Lead",
        }
    ]
    get getEmployeeInfo(){
        //const employeeBand = this.emplpyeeList[0].FirstName
    }

    constructor(){
        super();
      //  Contact c = [SELEC FirstName FROM CONTACT WHERE ID = ];
    }

    connectedCallback(){

    }
    renderedCallback(){

    }
    disconnectedCallback(){

    }
}