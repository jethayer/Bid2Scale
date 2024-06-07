export default class RFPScreeningFile {
    rfpId;
    company;
    fullName;
    email;
    expertise;
    subtractors;
    partnerUp;
    otherOp;
    minority;
    certified;
    referred;
    agreement;
    state;

    constructor() {
        this.rfpId = "";
        this.company = "";
        this.fullName = "";
        this.email = "";
        this.expertise = "";
        this.subtractors = false;
        this.partnerUp = false;
        this.otherOp = false;
        this.minority = false;
        this.certified = false;
        this.referred = false;
        this.agreement = false;
        this.accepted = false;
        this.state = "pending";
    }
}