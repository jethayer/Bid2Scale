export default class RFP {
    id;
    title;
    company;
    person_of_contact;
    email;
    short_description;
    budget;
    deadline;
    full_description;
    keywords;

    constructor() {
        this.id = "0";
        this.title = "";
        this.company = "";
        this.person_of_contact = "";
        this.email = "";
        this.short_description = "";
        this.budget = 0;
        this.deadline = "";
        this.full_description = "";
        this.keywords = [];
    }
}