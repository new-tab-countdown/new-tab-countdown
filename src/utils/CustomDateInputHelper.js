export default class CustomDateInputHelper {

    static parseDescriptionAndDate(customDateString) {
        // Expect the date format to be `mm/dd/yyyy`.
        let parsed = customDateString.replace(/[{()}]/g, '').match(/\d{2}([.\-/ ])\d{2}\1\d{4}/);
        if (parsed === null) {
            return {
                dateString: null,
                descriptionString: customDateString
            };
        } else {
            let date = parsed[0];
            let dateAndDescription = customDateString.split(date);
            let description = parsed.index === 0 ? dateAndDescription[1].trim() : dateAndDescription[0].trim();
            return {
                dateString: date,
                descriptionString: description
            };
        }
    }

    static getDateFromDateString(date) {
        let endDate = Date.parse(date);
        return (!isNaN(endDate) && endDate > 0) ? new Date(date) : null;
    }

    static getCustomDate(input) {
        let dateAndDescription = this.parseDescriptionAndDate(input);
        return {
            displayName: `until ${dateAndDescription.descriptionString} ${dateAndDescription.dateString ? "(" + dateAndDescription.dateString + ")" : ""}`.trim(),
            endDate: this.getDateFromDateString(dateAndDescription.dateString)
        };
    }

}
