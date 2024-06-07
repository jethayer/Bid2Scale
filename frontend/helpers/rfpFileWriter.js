class RFPFileWriter {
    // The variable that will eventually contain the output that can be saved
    output = "";
    id = "";
    details = {
        company: "",
        personOfContact: "",
        email: "",
        shortDescription: "",
        budget: "",
        deadline: ""
    };
    expressInterestSection = {
        description: ""
    };
    fullBidSection = {
        description: ""
    };
    
    constructor() {
        this.clear();
    };

    // Setters for the RFP data
    
    setId(newID) {
        this.id = newID;
        return this;
    };

    // Detail Setters

    setDetails(newDetails) {
        this.details = newDetails;
        return this;
    };

    setDetailsAttributes(company, personOfContact, email, shortDescription, budget, deadline) {
        this.details.company = company;
        this.details.personOfContact = personOfContact;
        this.details.email = email;
        this.details.shortDescription = shortDescription;
        this.details.budget = budget;
        this.deadline = deadline;
        return this;
    };

    // Express Interest Section Setters

    setExpressInterestSection(newExpressSection) {
        this.expressInterestSection = newExpressSection;
        return this;
    };

    setExpressInterestSectionAttributes(description) {
        this.expressInterestSection.description = description;
        return this;
    };

    // Full Bid Section Setters

    setFullBidSection(fullBid) {
        this.fullBidSection = fullBid;
        return this;
    };

    setFullBidSectionAttributes(description) {
        this.fullBidSection.description = description;
        return this;
    };

    clear() {
        this.output = '';
        this.id = "";
        this.details = {
            company: "",
            personOfContact: "",
            email: "",
            shortDescription: "",
            budget: "",
            deadline: ""
        };
        this.expressInterestSection = {
            description: ""
        };
        this.fullBidSection = {
            description: ""
        };
    };

    sanitizeString(val) {
        return val.replace(/[<>\"\']/g, '');
    };

    getXML() {
        this.output = "<rfp>\n";

        // Write ID
        this.output += "  <id>" + this.sanitizeString(this.id) + "</id>\n";

        // Details
        this.output += "  <details>\n";
        this.output += "    <company>" + this.sanitizeString(this.details.company) + "</company>\n";
        this.output += "    <person-of-contact>" + this.sanitizeString(this.details.personOfContact) + "</person-of-contact>\n";
        this.output += "    <email>" + this.sanitizeString(this.details.email) + "</email>\n";
        this.output += "    <short-description>" + this.sanitizeString(this.details.shortDescription) + "</short-description>\n";
        this.output += "    <budget>" + this.sanitizeString(this.details.budget) + "</budget>\n";
        this.output += "    <deadline>" + this.sanitizeString(this.details.deadline) + "</deadline>\n";
        this.output += "  </details>\n";

        // Express Interest
        this.output += "  <express-interest>\n";
        this.output += "    <description>" + this.sanitizeString(this.expressInterestSection.description) + "</description>\n";
        this.output += "  </express-interest>\n";

        // Full Bid
        this.output += "  <full-bid>\n";
        this.output += "    <description>" + this.sanitizeString(this.fullBidSection.description) + "</description>\n";
        this.output += "  </full-bid>\n";

        this.output += "</rfp>";

        return this.output;
    };
}

var rfpFileWriter = new RFPFileWriter();

export {rfpFileWriter};
