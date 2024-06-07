export default class RFPPartnerFile {
    rfpId;
    company;
    firstName;
    lastName;
    email;
    companyDescription;
    allowPartner;
    requestAlternatives;

    constructor() {
        this.rfpId = "";
        this.company = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.companyDescription = "";
        this.allowPartner = false;
        this.requestAlternatives = false;
    }
}