import RFP from '../components/RFPFile'
import { XMLParser } from 'fast-xml-parser'

export function parseFile(XMLFile) {
    const options = {
        preserveOrder: false,
        alwaysCreateTextNode: false,
    }
    const parser = new XMLParser(options)
    
    let obj = parser.parse(XMLFile.replace(/\s/g, ""));
    let tempRFP = new RFP();

    if(obj.rfp == undefined) {
        return null;

    } else {
            
        tempRFP.id = obj.rfp.id["#text"];
        tempRFP.company = obj.rfp.id["\\id"].details.company;
        tempRFP.contact = obj.rfp.id["\\id"].details["person-of-contact"]
        tempRFP.email = obj.rfp.id["\\id"].details.email;
        tempRFP.short_description = obj.rfp.id["\\id"].details["short-description"];
        tempRFP.budget = obj.rfp.id["\\id"].details.budget;
        tempRFP.deadline = obj.rfp.id["\\id"].details.deadline;
        tempRFP.full_description = obj.rfp.id["\\id"]["express-interest"].description

        return tempRFP;
    }
}