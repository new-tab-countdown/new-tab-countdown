import nlp from 'compromise';

export default class CustomDateInputHelper {

    static parseCustomDateInput(customDateInput) {
        return nlp(customDateInput).dates();
    }

    // static parseDescriptionAndDate(customDateString) {
    //     // Expect the date format to be `mm/dd/yyyy`.
    //     let parsed = customDateString.replace(/[{()}]/g, '').match(/\d{2}([.\-/ ])\d{2}\1\d{4}/);
    //     if (parsed === null) {
    //         return {
    //             dateString: null,
    //             descriptionString: customDateString
    //         };
    //     } else {
    //         let date = parsed[0];
    //         let dateAndDescription = customDateString.split(date);
    //         let description = parsed.index === 0 ? dateAndDescription[1].trim() : dateAndDescription[0].trim();
    //         return {
    //             dateString: date,
    //             descriptionString: description
    //         };
    //     }
    // }

    static getCustomDate(input) {
        let parsedCustomDate = this.parseCustomDateInput(input).out('array');
        if (parsedCustomDate.length !== 1) {
            return null;
        } else {
            // Remove [st | nd | rd | th] from string when converting to date.
            let dateString = parsedCustomDate[0];
            let modifiedDateString = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');
            let date = new Date(modifiedDateString);
            if (isNaN(Date.parse(date))) {
                return null;
            } else {
                return {
                    displayName: `until ${input.replace(dateString, "").trim()} (${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`,
                    endDate: modifiedDateString
                };
            }
        }
    }

}
