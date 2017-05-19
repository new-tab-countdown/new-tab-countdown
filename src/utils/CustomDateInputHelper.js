import nlp from 'compromise';

export default class CustomDateInputHelper {

    static parseCustomDateInput(customDateInput) {
        return nlp(customDateInput).dates();
    }

    static getCustomDate(input) {
        let parsedCustomDate = this.parseCustomDateInput(input).out('array');
        if (parsedCustomDate.length !== 1) {
            return null;
        } else {
            // Remove [st | nd | rd | th] from string when converting to date.
            let dateString = parsedCustomDate[0].normalize();
            let modifiedDateString = dateString.replace(/(\d+)(st|nd|rd|th)/, '$1');
            // If there is no year, then assume current year.
            if (modifiedDateString.split(" ").length === 2) {
                modifiedDateString = `${modifiedDateString} ${new Date().getFullYear()}`;
            }
            let date = new Date(modifiedDateString);
            if (isNaN(Date.parse(date))) {
                return null;
            } else {
                return {
                    // Display normalized description + date using mm/dd/yyyy.
                    displayName: `until ${input.replace(/,/, "").replace(dateString, "").trim()} (${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`,
                    endDate: modifiedDateString
                };
            }
        }
    }

}
